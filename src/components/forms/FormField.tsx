"use client";

import { BookOpen, CalendarDays, GraduationCap, Mail, MessageSquare, Phone, UserRound } from "lucide-react";
import { content } from "@/lib/content";
import type { FormFieldName } from "@/lib/validation";

const fieldIcons = { fullName: UserRound, email: Mail, phone: Phone, birthDate: CalendarDays, course: GraduationCap, department: BookOpen, message: MessageSquare };
interface FormFieldProps {
  name: FormFieldName; id: string; value: string; error?: string; disabled: boolean;
  optional?: boolean; hideLabel?: boolean;
  onChange: (name: FormFieldName, value: string) => void;
  onBlur: (name: FormFieldName) => void;
}

export function FormField({ name, id, value, error, disabled, optional = false, hideLabel = false, onChange, onBlur }: FormFieldProps) {
  const ui = content.ui.forms;
  const field = ui.fields[name];
  const Icon = fieldIcons[name];
  const required = field.required && !optional;
  const options = name === "course"
    ? content.collections.courses.map((course) => ({ value: course.id, label: course.title }))
    : name === "department" ? content.collections.departments.map((department) => ({ value: department.id, label: department.label })) : [];
  const attributes = {
    id, name, value, disabled, required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onChange(name, event.target.value),
    onBlur: () => onBlur(name),
  };
  return (
    <div className={`form-field ${name === "message" || name === "phone" && hideLabel || name === "course" && hideLabel ? "form-field--wide" : ""}`}>
      <label className={hideLabel ? "visually-hidden" : "form-label"} htmlFor={id}>
        {field.label}{required ? <span className="form-required" aria-label={ui.requiredLabel}> *</span> : <span className="form-optional"> {ui.optionalLabel}</span>}
      </label>
      <div className={`form-input-wrap ${field.type === "textarea" ? "form-input-wrap--textarea" : ""}`}>
        <Icon className="form-input-icon" size={18} aria-hidden="true" />
        {field.type === "select" ? (
          <select {...attributes} className="form-input">
            <option value="" disabled>{field.placeholder}</option>
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        ) : field.type === "textarea" ? (
          <textarea {...attributes} className="form-input" placeholder={field.placeholder} rows={4} maxLength={3000} />
        ) : (
          <input {...attributes} className="form-input" type={field.type} placeholder={field.placeholder}
            autoComplete={name === "fullName" ? "name" : name === "email" ? "email" : name === "phone" ? "tel" : name === "birthDate" ? "bday" : undefined}
            maxLength={name === "fullName" ? 100 : name === "email" ? 254 : name === "phone" ? 30 : undefined}
            min={name === "birthDate" ? "1900-01-01" : undefined} />
        )}
      </div>
      {error && <p className="form-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
