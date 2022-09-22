import clsx from "clsx";
import { FormikContextType } from "formik";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export interface InputProps {
  id?: string;

  name?: string;
  value?: string;

  type?: "text" | "password";

  defaultValue?: string;

  placeholder?: string;

  className?: string;

  inputClassName?: string;

  errorClassName?: string;

  width?: number | string;

  disableAutoComplete?: boolean;

  isMultiLanguage?: boolean;
  disabled?: boolean;
  /**
   * Default: ''
   * @description using if you want to suggest a sample example
   */
  subLabel?: string;

  /**
   * Default: ''
   * @description using if you want to describe unit of input
   */
  labelAfterInput?: string;
  status?: undefined | "inValid" | "valid" | "warn";
  /**
   * Default: undefined
   */
  defaultStatus?: undefined | "valid" | "inValid" | "warn";

  /**
   * Default: true
   */
  hasShadow?: boolean;

  /**
   * Default: true
   */
  hasShowError?: boolean;

  /**
   * Default: false
   */
  hasSearchIcon?: boolean;

  /**
   * Default: false
   */
  readOnly?: boolean;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;

  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;

  fmOnChange?: (e?: any) => void;

  fmOnBlur?: (e?: any) => void;

  formik?: FormikContextType<any>;
}

export function Input({
  id,
  formik,
  type = "text",
  value = "",
  defaultValue = "",
  className = "",
  inputClassName = "",
  name,
  disabled = false,
  placeholder = "",
  subLabel = "",
  labelAfterInput = "",
  width,
  disableAutoComplete = true,
  status,
  defaultStatus = undefined,
  hasShadow = true,
  hasShowError = true,
  hasSearchIcon = false,
  readOnly = false,
  errorClassName = "",
  onChange = () => {},
  onBlur,
  fmOnChange,
  fmOnBlur,
  onFocus,
}: InputProps) {
  const [txValue, setTxValue] = useState(value || defaultValue);
  const [_status, changeStatus] = useState(status || defaultStatus);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);

      fmOnChange && fmOnChange(e);

      setTxValue(e.currentTarget.value);

      setTimeout(() => {
        if (formik) formik.setFieldTouched(name!, true);
      });
    },
    [fmOnChange, formik, name, onChange]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);

      fmOnBlur && fmOnBlur(e);
    },
    [fmOnBlur, onBlur]
  );

  useEffect(() => {
    setTxValue(value || defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    changeStatus(status || defaultStatus);
  }, [defaultStatus, status]);

  const isError = _status === "inValid" || _status === "warn";

  return (
    <>
      <div
        className={`box-border max-w-[400px] w-full h-[36px] leading-[36px] text-[#666] ${className}`}
        style={{ width }}
      >
        <input
          id={id}
          className={clsx(
            `w-full px-2 align-baseline border border-solid border-[#dadada] rounded ${inputClassName}`,
            {
              "bg-[#dadada]": disabled,
              "border border-solid border-[#FF0000] !bg-[#fce4ec]": isError,
              "shadow-[inset_0_2px_8px_0_rgb(0,0,0,10%)]": hasShadow,
              relative: hasSearchIcon,
            }
          )}
          type={type}
          value={txValue || ""}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={disableAutoComplete ? "off" : "on"}
          onFocus={onFocus}
          readOnly={readOnly}
        />

        {hasSearchIcon && (
          <div className="absolute top-4 left-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                className="fill-[#ccc]"
                d="M15,12.87,11.66,9.54a6,6,0,1,0-2.12,2.12L12.87,15A1.5,1.5,0,0,0,15,12.87ZM2,6.5A4.5,4.5,0,1,1,6.5,11,4.5,4.5,0,0,1,2,6.5Z"
              />
            </svg>
          </div>
        )}

        {labelAfterInput && (
          <div className="ml-2 text-[#666]">{labelAfterInput}</div>
        )}
      </div>

      {isError && hasShowError && (
        <div className="flex items-center mt-1">
          <div className={`text-[#c2185b] font-medium ${errorClassName}`}>
            {formik && formik.getFieldMeta(name!).error
              ? formik.getFieldMeta(name!).error
              : null}
          </div>
        </div>
      )}

      {subLabel && (
        <div className="text-xs text-[#9e9e9e] mt-2">{subLabel}</div>
      )}
    </>
  );
}
