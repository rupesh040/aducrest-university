import { content } from "../data";
import type { FormFieldName, FormValues } from "../data/types";
export type { FormFieldName, FormValues } from "../data/types";

export type SubmissionKind = "contact" | "admission";
export type FormErrors = Partial<Record<FormFieldName, string>>;

export const EMPTY_FORM: FormValues = {
  fullName: "", email: "", phone: "", birthDate: "", course: "", department: "", message: "",
};

const CONTACT_FIELDS: FormFieldName[] = ["fullName", "email", "phone", "course", "message"];
const ADMISSION_FIELDS: FormFieldName[] = ["fullName", "email", "phone", "birthDate", "course", "department", "message"];
export const MAX_BODY_BYTES = 16_384;

export function submissionFields(kind: SubmissionKind): FormFieldName[] {
  return kind === "contact" ? CONTACT_FIELDS : ADMISSION_FIELDS;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function siteDate(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: content.ui.forms.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((value) => value.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

/** Shared by controlled forms and API routes so both sides enforce the same rules. */
export function validateSubmission(input: unknown, kind: SubmissionKind, now = new Date()): {
  values: FormValues; errors: FormErrors; valid: boolean; payloadValid: boolean;
} {
  const messages = content.ui.forms.validation;
  const values: FormValues = { ...EMPTY_FORM };
  const errors: FormErrors = {};
  const allowed = submissionFields(kind);
  const payloadValid = isRecord(input)
    && Object.keys(input).every((key) => allowed.includes(key as FormFieldName))
    && Object.values(input).every((value) => typeof value === "string");
  if (!payloadValid || !isRecord(input)) return { values, errors, valid: false, payloadValid: false };

  for (const field of allowed) values[field] = typeof input[field] === "string" ? input[field].trim() : "";
  values.fullName = values.fullName.replace(/\s+/g, " ");
  const required = allowed.filter((field) => kind === "contact" || field !== "message");
  for (const field of required) if (!values[field]) errors[field] = messages.required;

  if (values.fullName && (values.fullName.length < 2 || values.fullName.length > 100
    || !/\p{L}/u.test(values.fullName) || /[\u0000-\u001f\u007f<>]/.test(values.fullName))) {
    errors.fullName = messages.name;
  }
  if (values.email && (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))) {
    errors.email = messages.email;
  }
  const digits = values.phone.replace(/\D/g, "");
  if (values.phone && (!/^\+?[\d ()-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15 || values.phone.length > 30)) {
    errors.phone = messages.phone;
  }
  if (values.course && !content.collections.courses.some((course) => course.id === values.course)) errors.course = messages.course;
  if (kind === "admission") {
    if (values.department && !content.collections.departments.some((department) => department.id === values.department)) {
      errors.department = messages.department;
    }
    if (values.birthDate) {
      const date = new Date(`${values.birthDate}T00:00:00.000Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthDate) || Number.isNaN(date.getTime())
        || date.toISOString().slice(0, 10) !== values.birthDate || date.getUTCFullYear() < 1900) {
        errors.birthDate = messages.birthDate;
      } else if (values.birthDate > siteDate(now)) {
        errors.birthDate = messages.birthDateFuture;
      }
    }
  }
  if (values.message.length > 3000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(values.message)) errors.message = messages.message;
  return { values, errors, valid: Object.keys(errors).length === 0, payloadValid: true };
}

export function fieldsPayload(values: FormValues, kind: SubmissionKind): Partial<FormValues> {
  return Object.fromEntries(submissionFields(kind).map((field) => [field, values[field]]));
}

export type SubmissionResponse = {
  ok: boolean;
  status: "validated" | "delivered" | "invalid" | "error";
  message: string;
  errors?: FormErrors;
};
