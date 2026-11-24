import { useState, useRef, useEffect, type ReactNode } from 'react';
import './Dropdown.css';
import { ChevronDown } from 'lucide-react';

export interface DropdownOption {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedId?: string;
  onSelect: (option: DropdownOption) => void;
  isActive?: boolean;
  className?: string;
}

export function Dropdown({
  label,
  options,
  selectedId,
  onSelect,
  isActive = false,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`custom-dropdown-container ${className}`}
    >
      <button
        type="button"
        className={`circular-filter-pill dropdown-trigger-pill ${
          isActive || isOpen ? 'is-active' : ''
        }`}
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          size={13}
          className={`dropdown-chevron-icon ${isOpen ? 'is-open' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="dropdown-menu-card"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="dropdown-menu-list">
            {options.map((opt) => {
              const isOptionSelected = opt.id === selectedId;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitem"
                  className={`dropdown-menu-item ${
                    isOptionSelected ? 'is-selected' : ''
                  }`}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.icon && (
                    <span className="dropdown-item-icon">{opt.icon}</span>
                  )}
                  <span className="dropdown-item-label">{opt.label}</span>
                  {opt.badge && (
                    <span className="dropdown-item-badge">{opt.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
