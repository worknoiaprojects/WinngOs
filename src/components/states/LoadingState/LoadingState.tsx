import './LoadingState.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label = 'Loading...', className = '' }: SpinnerProps) {
  return (
    <div className={`spinner-wrapper spinner-${size} ${className}`} role="status">
      <div className="spinner-circle"></div>
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}

export interface SkeletonLineProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonLine({ width = '100%', height = '16px', className = '' }: SkeletonLineProps) {
  return (
    <div
      className={`skeleton-base skeleton-line ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    ></div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-base skeleton-avatar"></div>
      <div className="skeleton-content">
        <SkeletonLine width="60%" height="18px" />
        <SkeletonLine width="90%" height="14px" />
        <SkeletonLine width="40%" height="14px" />
      </div>
    </div>
  );
}

export interface LoadingStateProps {
  type?: 'card' | 'spinner';
  className?: string;
}

export function LoadingState({ type = 'card', className = '' }: LoadingStateProps) {
  if (type === 'spinner') {
    return (
      <div className={`loading-state-container ${className}`}>
        <Spinner size="lg" label="Fetching data..." />
      </div>
    );
  }

  return (
    <div className={`loading-state-container ${className}`}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default LoadingState;
