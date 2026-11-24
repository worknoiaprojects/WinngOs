import { useId, type InputHTMLAttributes } from 'react';
import './Input.css';

export type InputState = 'default' | 'error' | 'success' | 'disabled';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
  helperText?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  state = 'default',
  errorMessage,
  helperText,
  disabled = false,
  id: customId,
  className = '',
  ...restProps
}: InputProps) {
  const autoId = useId();
  const inputId = customId || autoId;
  const messageId = `${inputId}-msg`;
  const isDisabled = disabled || state === 'disabled';
  const hasError = state === 'error' || Boolean(errorMessage);
  const isSuccess = state === 'success';

  return (
    <div className={`input-field-group ${hasError ? 'state-error' : ''} ${isSuccess ? 'state-success' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={inputId}
          className="custom-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          aria-invalid={hasError}
          aria-describedby={errorMessage || helperText ? messageId : undefined}
          {...restProps}
        />
      </div>
      {errorMessage && (
        <span id={messageId} className="input-message error-msg" role="alert">
          {errorMessage}
        </span>
      )}
      {!errorMessage && helperText && (
        <span id={messageId} className="input-message helper-msg">
          {helperText}
        </span>
      )}
    </div>
  );
}

export default Input;
