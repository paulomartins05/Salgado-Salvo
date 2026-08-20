import React , { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface inputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  rightElement?: ReactNode; 
  required?: boolean;
  error?: string;
}

const InputForm = forwardRef<HTMLInputElement, inputFormProps>(
  ({ label, required = false, icon, rightElement, className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm text-gray-700 font-medium">
            {label} {required && <span className="text-[#D9774A]">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              {icon}
            </span>
          )}

          <input
            required={required}
            className={`w-full py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#D9774A] focus:border-[#D9774A] outline-none transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]
              ${icon ? "pl-10" : "px-3"} 
              ${rightElement ? "pr-10" : "pr-3"}
              ${className || ""}
            `}
            {...props} 
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-2 flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>
      </div>
    )
  }
)

InputForm.displayName = "InputForm";

export default InputForm;