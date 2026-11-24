import './ErrorState.css';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`error-state-container ${className}`} role="alert">
      <div className="error-state-icon-wrapper">
        <AlertTriangle size={36} />
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-description">{description}</p>
      {onRetry && (
        <button
          type="button"
          className="error-state-retry-btn"
          onClick={onRetry}
          aria-label="Retry loading data"
        >
          <RefreshCw size={15} />
          Retry Request
        </button>
      )}
    </div>
  );
}

export default ErrorState;
