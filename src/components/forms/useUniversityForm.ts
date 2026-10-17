"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { content } from "@/lib/content";
import { EMPTY_FORM, fieldsPayload, submissionFields, validateSubmission, type FormErrors, type FormFieldName, type FormValues, type SubmissionKind, type SubmissionResponse } from "@/lib/validation";

export function useUniversityForm(kind: SubmissionKind, initialCourse?: string) {
  const id = useId();
  function blankValues(): FormValues {
    return { ...EMPTY_FORM, course: initialCourse && content.collections.courses.some((course) => course.id === initialCourse) ? initialCourse : "" };
  }
  const [values, setValues] = useState<FormValues>(blankValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubmissionResponse | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  useEffect(() => () => activeRequest.current?.abort(), []);

  function change(name: FormFieldName, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
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
    if (element instanceof HTMLElement) requestAnimationFrame(() => element.focus());
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || activeRequest.current) return;
    const form = event.currentTarget;
    const result = validateSubmission(fieldsPayload(values, kind), kind);
    setErrors(result.errors);
    setFeedback(null);
    if (!result.valid) {
      setFeedback({ ok: false, status: "invalid", message: content.ui.forms.status.invalid });
      focusFirstError(form, result.errors);
      return;
    }
    setSubmitting(true);
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      const response = await fetch(`/api/${kind}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldsPayload(result.values, kind)), signal: controller.signal,
      });
      const body: unknown = await response.json();
      if (!body || typeof body !== "object" || !("message" in body) || typeof body.message !== "string" || !("status" in body)) throw new Error("Invalid response");
      const status = body as SubmissionResponse;
      setFeedback(status);
      if (status.errors) { setErrors(status.errors); focusFirstError(form, status.errors); }
      if (response.ok && status.ok && status.status === "delivered") setValues(blankValues());
    } catch {
      if (!controller.signal.aborted) setFeedback({ ok: false, status: "error", message: content.ui.forms.status.network });
    } finally {
      if (!controller.signal.aborted) setSubmitting(false);
      activeRequest.current = null;
    }
  }
  return { id, values, errors, feedback, submitting, change, blur, submit };
}
