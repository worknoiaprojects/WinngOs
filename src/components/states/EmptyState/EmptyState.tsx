import './EmptyState.css';
import { Inbox, Search, ShoppingBag, Plus } from 'lucide-react';

export type EmptyStateIconType = 'inbox' | 'search' | 'orders';

export interface EmptyStateProps {
  icon?: EmptyStateIconType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = 'inbox',
  title = 'No items found',
  description = 'There are no records to display at this moment.',
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <Search size={40} className="empty-state-icon" />;
      case 'orders':
        return <ShoppingBag size={40} className="empty-state-icon" />;
      default:
        return <Inbox size={40} className="empty-state-icon" />;
    }
  };

  return (
    <div className={`empty-state-container ${className}`}>
      <div className="empty-state-icon-wrapper">
        {renderIcon()}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && (
        <button
          type="button"
          className="empty-state-btn"
          onClick={onAction}
          aria-label={actionLabel}
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
