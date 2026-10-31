"use client";

import {
  BookOpen,
  Calendar,
  CalendarDays,
  ChevronDown,
  GraduationCap,
  Mail,
  FileText,
  Phone,
  UserRound,
} from "lucide-react";
import { content } from "@/app/data";
import type { FormFieldName } from "@/app/lib/validation";

const fieldIcons = {
  fullName: UserRound,
  email: Mail,
  phone: Phone,
  birthDate: CalendarDays,
  course: GraduationCap,
  department: BookOpen,
  message: FileText,
};

interface FormFieldProps {
  name: FormFieldName;
  id: string;
  value: string;
  error?: string;
  disabled: boolean;
  optional?: boolean;
  hideLabel?: boolean;
  onChange: (name: FormFieldName, value: string) => void;
  onBlur: (name: FormFieldName) => void;
}

export function FormField({
  name,
  id,
  value,
  error,
  disabled,
  optional = false,
  hideLabel = false,
  onChange,
  onBlur,
}: FormFieldProps) {
  const ui = content.ui.forms;
  const field = ui.fields[name];
  const Icon = fieldIcons[name];
  const required = field.required && !optional;
  const options =
    name === "course"
      ? content.collections.courses.map((course) => ({
          value: course.id,
          label: course.title,
        }))
      : name === "department"
        ? content.collections.departments.map((department) => ({
            value: department.id,
            label: department.label,
          }))
        : [];
  const isPhone = name === "phone";

  const handleKeyDown = (
    event: React.KeyboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (isPhone) {
      if (
        event.key === "Backspace" ||
        event.key === "Tab" ||
        event.key === "Enter" ||
        event.key === "Escape" ||
        event.key === "Delete" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "Home" ||
        event.key === "End" ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }
      if (!/^\d$/.test(event.key)) {
        event.preventDefault();
      }
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    if (isPhone) {
      event.preventDefault();
      const text = event.clipboardData.getData("text");
      const digits = text.replace(/\D/g, "");
      if (digits) {
        const newValue = ((value || "") + digits).slice(0, 15);
        onChange(name, newValue);
      }
    }
  };

  const attributes = {
    id,
    name,
    value,
    disabled,
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      let val = event.target.value;
      if (isPhone) {
        val = val.replace(/\D/g, "").slice(0, 15);
      }
      onChange(name, val);
    },
    onKeyDown: isPhone ? handleKeyDown : undefined,
    onPaste: isPhone ? handlePaste : undefined,
    onBlur: () => onBlur(name),
  };

  return (
    <div
      className={`form-field ${name === "message" || (name === "phone" && hideLabel) || (name === "course" && hideLabel) ? "form-field--wide" : ""}`}
    >
      <label
        className={hideLabel ? "visually-hidden" : "form-label !text-[13px] sm:!text-sm"}
        htmlFor={id}
      >
        {field.label}
        {required ? (
          <span className="text-red-500 font-bold ml-0.5" aria-label={ui.requiredLabel}>
            {" "}*
          </span>
        ) : (
          <span className="text-slate-400 font-normal text-xs ml-1">
            {ui.optionalLabel.startsWith("(") ? ui.optionalLabel : `(${ui.optionalLabel})`}
          </span>
        )}
      </label>
      <div
        className={`form-input-wrap ${field.type === "textarea" ? "form-input-wrap--textarea" : ""}`}
      >
        <Icon className="form-input-icon" size={18} aria-hidden="true" />
        {field.type === "select" ? (
          <div className="relative">
            <select
              {...attributes}
              className="form-input appearance-none pr-9 cursor-pointer !text-sm"
            >
              <option value="" disabled>
                {field.placeholder}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7589a5] pointer-events-none"
              size={16}
              aria-hidden="true"
            />
          </div>
        ) : field.type === "textarea" ? (
          <textarea
            {...attributes}
            className="form-input resize-y !text-sm"
            placeholder={field.placeholder}
            rows={3}
            maxLength={3000}
          />
        ) : name === "birthDate" ? (
          <div className="relative">
            <input
              {...attributes}
              className="form-input pr-9 !text-sm"
              type="date"
              placeholder={field.placeholder}
              autoComplete="bday"
              min="1900-01-01"
            />
            <Calendar
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7589a5] pointer-events-none"
              size={16}
              aria-hidden="true"
            />
          </div>
        ) : (
          <input
            {...attributes}
            className="form-input !text-sm"
            type={isPhone ? "tel" : field.type}
            inputMode={isPhone ? "numeric" : undefined}
            pattern={isPhone ? "[0-9]*" : undefined}
            placeholder={field.placeholder}
            autoComplete={
              name === "fullName"
                ? "name"
                : name === "email"
                  ? "email"
                  : name === "phone"
                    ? "tel"
                    : undefined
            }
            maxLength={
              name === "fullName"
                ? 100
                : name === "email"
                  ? 254
                  : name === "phone"
                    ? 15
                    : undefined
            }
          />
        )}
      </div>
      {error && (
        <p className="form-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
