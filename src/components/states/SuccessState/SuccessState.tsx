import './SuccessState.css';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export interface SuccessStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SuccessState({
  title = 'Action Completed Successfully',
  description = 'Your changes have been saved and applied.',
  actionLabel,
  onAction,
  className = '',
}: SuccessStateProps) {
  return (
    <div className={`success-state-container ${className}`} role="status">
      <div className="success-state-icon-wrapper">
        <CheckCircle2 size={36} />
      </div>
      <h3 className="success-state-title">{title}</h3>
      <p className="success-state-description">{description}</p>
      {actionLabel && (
        <button
          type="button"
          className="success-state-btn"
          onClick={onAction}
          aria-label={actionLabel}
        >
          {actionLabel}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

export default SuccessState;
