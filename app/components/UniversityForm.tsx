"use client";

import { ArrowRight, CheckCircle2, Info, LoaderCircle } from "lucide-react";
import { content } from "@/app/data";
import type { FormSectionConfig } from "@/app/data/types";
import type { SubmissionKind } from "@/app/lib/validation";
import { FormField } from "./FormField";
import { useUniversityForm } from "./useUniversityForm";

export function UniversityForm({
  data,
  kind,
  initialCourse,
}: {
  data: FormSectionConfig;
  kind: SubmissionKind;
  initialCourse?: string;
}) {
  const form = useUniversityForm(kind, initialCourse);
  const contact = kind === "contact";
  const FormHeading = contact ? "h3" : "h2";

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-sm min-w-0 ${
        contact
          ? "bg-gradient-to-br from-[#06447d] to-[#052c49] text-white p-6 sm:p-7.5 md:p-8"
          : "bg-white border border-[#e1eaf1]"
      }`}
    >
      {!contact && (
        <div className="bg-[#0b2447] px-6 py-6 sm:px-8 sm:py-7 text-white">
          <FormHeading
            id={`${form.id}-heading`}
            className="font-heading font-bold text-2xl sm:text-3xl md:text-[30px] leading-tight mb-2 text-white"
          >
            {data.title} <span className="text-[#e5a93b]">{data.highlight}</span>
          </FormHeading>
          <p className="text-sm sm:text-[15px] leading-relaxed m-0 text-white/90">
            {data.description}
          </p>
        </div>
      )}

      <div className={contact ? "" : "p-6 sm:p-8"}>
        {contact && (
          <div className="mb-6">
            <span
              className="block w-10 h-[3px] bg-gold mb-3.5"
              aria-hidden="true"
            />
            <FormHeading
              id={`${form.id}-heading`}
              className="font-heading font-bold text-2xl md:text-[28px] leading-tight mb-2 text-inherit"
            >
              {data.title} <span className="text-gold">{data.highlight}</span>
            </FormHeading>
            <p className="text-xs sm:text-sm leading-relaxed m-0 text-inherit opacity-90">
              {data.description}
            </p>
          </div>
        )}

        <form
          onSubmit={form.submit}
          noValidate
          aria-busy={form.submitting}
          aria-labelledby={`${form.id}-heading`}
          className="min-w-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.fields.map((name) => (
              <FormField
                key={name}
                id={`${form.id}-${name}`}
                name={name}
                value={form.values[name]}
                error={form.errors[name]}
                disabled={form.submitting}
                optional={!contact && name === "message"}
                hideLabel={contact}
                onChange={form.change}
                onBlur={form.blur}
              />
            ))}
          </div>

          {!contact ? (
            <button
              className="w-full mt-6 min-h-[50px] rounded-lg bg-[#d99b26] hover:bg-[#c88d1d] text-[#0a2540] font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
              disabled={form.submitting}
            >
              <span>
                {form.submitting
                  ? content.ui.forms.status.submitting
                  : data.submitLabel}
              </span>
              <span className="w-6 h-6 rounded-full bg-[#0a2540] text-white flex items-center justify-center shrink-0">
                {form.submitting ? (
                  <LoaderCircle
                    className="animate-spin"
                    size={14}
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight size={14} aria-hidden="true" />
                )}
              </span>
            </button>
          ) : (
            <button
              className="primary-button w-full mt-5 justify-center min-h-[46px] text-sm"
              type="submit"
              disabled={form.submitting}
            >
              {form.submitting
                ? content.ui.forms.status.submitting
                : data.submitLabel}
              {form.submitting ? (
                <LoaderCircle
                  className="animate-spin"
                  size={19}
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight size={20} aria-hidden="true" />
              )}
            </button>
          )}

          {contact && content.ui.forms.notice ? (
            <p className="text-[11px] leading-relaxed mt-3.5 flex items-start gap-1.5 text-[#d3e3f5]">
              <Info size={15} aria-hidden="true" className="shrink-0 mt-0.5" />
              {content.ui.forms.notice}
            </p>
          ) : null}

          {form.feedback && (
            <div
              className={`p-3.5 mt-4 rounded-lg text-xs sm:text-[13px] leading-relaxed flex items-start gap-2 ${
                form.feedback.ok
                  ? "bg-[#e7f4ec] text-[#14552c] border border-[#b6dfc4]"
                  : "bg-[#fff0ee] text-[#a12c1c] border border-[#f4bdb5]"
              }`}
              role="status"
              aria-live="polite"
            >
              {form.feedback.ok ? (
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              ) : (
                <Info size={18} className="shrink-0 mt-0.5" />
              )}
              <span>{form.feedback.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
