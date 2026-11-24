import { useState, useRef, type PointerEvent, type ComponentType, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'warning';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'loading' | 'disabled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  icon?: ComponentType<{ size?: number; className?: string }>;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  state = 'default',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  onPointerDown,
  ...restProps
}: ButtonProps) {
  const [isWaving, setIsWaving] = useState(false);
  const waveTimerRef = useRef<number | null>(null);

  const isLoading = state === 'loading';
  const isDisabled = disabled || state === 'disabled' || isLoading;

  const handlePointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      // Re-trigger wave animation smoothly on each press
      setIsWaving(false);
      requestAnimationFrame(() => {
        setIsWaving(true);
      });

      if (waveTimerRef.current !== null) {
        window.clearTimeout(waveTimerRef.current);
      }
      waveTimerRef.current = window.setTimeout(() => {
        setIsWaving(false);
      }, 450);
    }
    onPointerDown?.(e);
  };

  return (
    <button
      className={`btn btn-${variant} btn-${size} ${isLoading ? 'is-loading' : ''} ${isWaving ? 'is-waving' : ''} ${className}`}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      onPointerDown={handlePointerDown}
      {...restProps}
    >
      {/* Soft center-to-sides wave light overlay */}
      <span className="btn-wave-glow" aria-hidden="true" />
      {isLoading && <Loader2 size={16} className="btn-spinner" />}
      {!isLoading && Icon && iconPosition === 'left' && <Icon size={16} className="btn-icon" />}
      {children && <span className="btn-content">{children}</span>}
      {!isLoading && Icon && iconPosition === 'right' && <Icon size={16} className="btn-icon" />}
    </button>
  );
}

export default Button;
