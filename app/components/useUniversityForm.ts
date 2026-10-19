"use client";

import { useId, useState, type FormEvent } from "react";
import { content } from "@/app/data";
import {
  EMPTY_FORM,
  fieldsPayload,
  submissionFields,
  validateSubmission,
  type FormErrors,
  type FormFieldName,
  type FormValues,
  type SubmissionKind,
  type SubmissionResponse,
} from "@/app/lib/validation";

export function useUniversityForm(
  kind: SubmissionKind,
  initialCourse?: string,
) {
  const id = useId();
  function blankValues(): FormValues {
    return {
      ...EMPTY_FORM,
      course:
        initialCourse &&
        content.collections.courses.some(
          (course) => course.id === initialCourse,
        )
          ? initialCourse
          : "",
    };
  }
  const [values, setValues] = useState<FormValues>(blankValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmissionResponse | null>(null);

  function change(name: FormFieldName, value: string) {
    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 15) : value;
    setValues((previous) => ({ ...previous, [name]: nextValue }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setFeedback(null);
  }
  function blur(name: FormFieldName) {
    const result = validateSubmission(fieldsPayload(values, kind), kind);
    setErrors((previous) => ({ ...previous, [name]: result.errors[name] }));
  }
  function focusFirstError(form: HTMLFormElement, fieldErrors: FormErrors) {
    const first = submissionFields(kind).find((field) => fieldErrors[field]);
    const element = first ? form.elements.namedItem(first) : null;
    if (element instanceof HTMLElement)
      requestAnimationFrame(() => element.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const result = validateSubmission(fieldsPayload(values, kind), kind);
    setErrors(result.errors);
    setFeedback(null);
    if (!result.valid) {
      setFeedback({
        ok: false,
        status: "invalid",
        message: content.ui.forms.status.invalid,
      });
      focusFirstError(form, result.errors);
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeedback({
        ok: true,
        status: "validated",
        message:
          kind === "contact"
            ? content.ui.forms.status.contactValidated
            : content.ui.forms.status.applicationValidated,
      });
      setValues(blankValues());
    } catch {
      setFeedback({
        ok: false,
        status: "error",
        message: content.ui.forms.status.error,
      });
    } finally {
      setSubmitting(false);
    }
  }
  return { id, values, errors, feedback, submitting, change, blur, submit };
}
