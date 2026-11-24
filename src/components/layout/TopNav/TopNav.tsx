import type { ReactNode } from 'react';
import './TopNav.css';
import { LayoutGrid, Layers } from 'lucide-react';

export type AppRoute = 'layout' | 'preview';

export interface TopNavProps {
  activeRoute?: AppRoute;
  onRouteChange?: (route: AppRoute) => void;
  brand?: ReactNode;
  navItems?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function TopNav({
  activeRoute = 'layout',
  onRouteChange,
  brand,
  navItems,
  actions,
  className = '',
}: TopNavProps) {
  return (
    <header className={`top-nav-wrapper ${className}`}>
      <nav className="top-nav-bar" aria-label="Main Navigation">
        {/* Brand / Logo Section */}
        <div className="top-nav-brand">
          {brand || (
            <div className="default-brand">
              <span className="brand-dot" aria-hidden="true"></span>
              <span className="brand-text">WinngOs</span>
            </div>
          )}
        </div>

        {/* Navigation Items (Center: Route Switcher) */}
        <div className="top-nav-center">
          {navItems || (
            <div className="default-nav-links" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeRoute === 'layout'}
                className={`nav-link ${activeRoute === 'layout' ? 'active' : ''}`}
                onClick={() => onRouteChange?.('layout')}
              >
                <LayoutGrid size={13} />
                <span>1:2:1 Layout</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeRoute === 'preview'}
                className={`nav-link ${activeRoute === 'preview' ? 'active' : ''}`}
                onClick={() => onRouteChange?.('preview')}
              >
                <Layers size={13} />
                <span>Components Preview</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Controls (Right: Active Route Tag) */}
        <div className="top-nav-actions">
          {actions || (
            <div className="default-status-pill">
              <span className="status-indicator" aria-hidden="true"></span>
              <span>{activeRoute === 'preview' ? 'Preview Route Active' : 'Base Layout Active'}</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
