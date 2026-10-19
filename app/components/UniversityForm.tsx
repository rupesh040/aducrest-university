"use client";

import { ArrowRight, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import { content } from "@/app/data";
import type { FormSectionConfig } from "@/app/data/types";
import type { SubmissionKind } from "@/app/lib/validation";
import { FormField } from "./FormField";
import { useUniversityForm } from "./useUniversityForm";

export function UniversityForm({ data, kind, initialCourse }: { data: FormSectionConfig; kind: SubmissionKind; initialCourse?: string }) {
  const form = useUniversityForm(kind, initialCourse);
  const contact = kind === "contact";
  const FormHeading = contact ? "h3" : "h2";
  return (
    <div className={`university-form ${contact ? "contact-form" : "admission-form"}`}>
      <div className="university-form-heading">
        <span className="form-heading-rule" aria-hidden="true" />
        <FormHeading id={`${form.id}-heading`}>{data.title} <span>{data.highlight}</span></FormHeading>
        <p>{data.description}</p>
      </div>
      <form onSubmit={form.submit} noValidate aria-busy={form.submitting} aria-labelledby={`${form.id}-heading`} className="university-form-body">
        <div className="form-grid">
          {data.fields.map((name) => <FormField key={name} id={`${form.id}-${name}`} name={name}
            value={form.values[name]} error={form.errors[name]} disabled={form.submitting}
            optional={!contact && name === "message"} hideLabel={contact} onChange={form.change} onBlur={form.blur} />)}
        </div>
        <button className="primary-button form-submit" type="submit" disabled={form.submitting}>
          {form.submitting ? content.ui.forms.status.submitting : data.submitLabel}
          {form.submitting ? <LoaderCircle className="form-spinner" size={19} aria-hidden="true" /> : <ArrowRight size={20} aria-hidden="true" />}
        </button>
        <p className="form-notice"><Info size={15} aria-hidden="true" />{content.ui.forms.notice}</p>
        {form.feedback && <div className={`form-feedback ${form.feedback.ok ? "form-feedback--success" : "form-feedback--error"}`}
          role={form.feedback.ok ? "status" : "alert"} tabIndex={-1}>
          {form.feedback.ok && <CheckCircle2 size={19} aria-hidden="true" />}<span>{form.feedback.message}</span>
        </div>}
      </form>
    </div>
  );
}
