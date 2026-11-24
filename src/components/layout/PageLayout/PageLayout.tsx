import type { ReactNode } from 'react';
import './PageLayout.css';

export interface PageLayoutProps {
  leftColumn: ReactNode;
  centerColumn: ReactNode;
  rightColumn: ReactNode;
  className?: string;
}

export function PageLayout({
  leftColumn,
  centerColumn,
  rightColumn,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`page-grid-1-2-1 ${className}`}>
      {/* Column 1 (Width: 1) */}
      <aside className="grid-col col-left" aria-label="Left Column">
        {leftColumn}
      </aside>

      {/* Column 2 (Width: 2) */}
      <main className="grid-col col-center" aria-label="Center Column">
        {centerColumn}
      </main>

      {/* Column 3 (Width: 1) */}
      <aside className="grid-col col-right" aria-label="Right Column">
        {rightColumn}
      </aside>
    </div>
  );
}

export default PageLayout;
