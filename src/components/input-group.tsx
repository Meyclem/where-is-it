import React from "react";

type InputGroupProps = {
  id: string;
  initialValue: string;
  label: string;
  type?: "text" | "email" | "password" | "text-area" | "date";
  rows?: number;
  placeholder?: string;
  required?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;
};

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  onChange,
  type = "text",
  placeholder = "",
  className,
  required = false,
  rows = 3,
  initialValue,
}) => {
  return (
    <div className={`input-group${className ? " " + className : ""}`}>
      <label htmlFor={id} className="app-label">
        {label}
        {required && <span className="text-xs text-gray-400"> (required)</span>}
      </label>
      {type !== "text-area" ? (
        <input
          type={type}
          className="app-input"
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          value={initialValue}
          required={required}
        />
      ) : (
        <textarea
          name={id}
          id={id}
          rows={rows}
          className="app-input"
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
