import { useState, useEffect } from 'react';
import './App.css';
import TopNav, { type AppRoute } from './components/layout/TopNav/TopNav';
import PageLayout from './components/layout/PageLayout/PageLayout';
import ComponentPreviewPage from './pages/preview/ComponentPreviewPage';
import FoodCard from './components/ui/FoodCard/FoodCard';
import Dropdown, { type DropdownOption } from './components/ui/Dropdown/Dropdown';
import Modal from './components/ui/Modal/Modal';
import { TableSessionManager } from './components/layout/TableSessionManager/TableSessionManager';
import { INITIAL_TABLES } from './mock/posData';
import { FloorTable, OrderMode, DeliveryPartner } from './types/pos';
import dishSalmon from './assets/dish-salmon.jpg';
import dishRisotto from './assets/dish-risotto.jpg';
import dishGourmet from './assets/dish-gourmet.jpg';
import dishSalad from './assets/dish-salad.jpg';
import { Search, X } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  category: 'Seafood' | 'Risotto' | 'Pasta' | 'Bowls' | 'Specials';
  imageUrl: string;
  imageAlt: string;
  isFavorite?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'salmon',
    title: 'Citrus Glazed Salmon',
    subtitle: 'Orange Purée & Greens',
    price: '$24.5',
    category: 'Seafood',
    imageUrl: dishSalmon,
    imageAlt: 'Citrus Glazed Salmon with orange puree',
  },
  {
    id: 'risotto',
    title: 'Honey Carrot Risotto',
    subtitle: 'Roasted Citrus & Herb',
    price: '$19.0',
    category: 'Risotto',
    imageUrl: dishRisotto,
    imageAlt: 'Creamy saffron and honey carrot risotto',
    isFavorite: true,
  },
  {
    id: 'scallops',
    title: 'Saffron Seared Scallops',
    subtitle: 'Orange Blossom Glaze',
    price: '$28.0',
    category: 'Seafood',
    imageUrl: dishGourmet,
    imageAlt: 'Gourmet dish with orange blossom glaze',
  },
  {
    id: 'harvest-bowl',
    title: 'Citrus Harvest Bowl',
    subtitle: 'Avocado & Microgreens',
    price: '$16.5',
    category: 'Bowls',
    imageUrl: dishSalad,
    imageAlt: 'Citrus harvest bowl with avocado and microgreens',
  },
  {
    id: 'pomodoro',
    title: 'Truffle Pomodoro',
    subtitle: 'Italian Kitchen Special',
    price: '$22.0',
    category: 'Pasta',
    imageUrl: dishGourmet,
    imageAlt: 'Truffle Pomodoro Pasta',
  },
  {
    id: 'bisque',
    title: 'Roasted Pepper Bisque',
    subtitle: 'Warm Herb Croutons',
    price: '$14.0',
    category: 'Risotto',
    imageUrl: dishRisotto,
    imageAlt: 'Roasted pepper bisque',
  },
  {
    id: 'duck',
    title: 'Honey Orange Duck',
    subtitle: 'Citrus Sweet Glaze',
    price: '$26.5',
    category: 'Specials',
    imageUrl: dishSalmon,
    imageAlt: 'Honey orange duck breast',
    isFavorite: true,
  },
  {
    id: 'quinoa',
    title: 'Garden Citrus Quinoa',
    subtitle: 'Organic Superfood Salad',
    price: '$17.5',
    category: 'Bowls',
    imageUrl: dishSalad,
    imageAlt: 'Garden citrus quinoa salad',
  },
];

const STANDARD_CATEGORIES = ['All', 'Seafood', 'Risotto', 'Pasta', 'Bowls'] as const;

const SPECIAL_OPTIONS: DropdownOption[] = [
  { id: 'all-specials', label: 'All Specials', badge: 'Popular' },
  { id: 'chef-tasting', label: "Chef's Tasting", badge: 'Chef' },
  { id: 'seasonal-citrus', label: 'Seasonal Citrus' },
  { id: 'todays-catch', label: "Today's Fresh Catch" },
];

export function App() {
  const getInitialRoute = (): AppRoute => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#preview' || path.endsWith('/preview')) {
        return 'preview';
      }
    }
    return 'layout';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSpecial, setSelectedSpecial] = useState<string | null>(null);
  const [selectedSpecialId, setSelectedSpecialId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Table & Session State (Cashier POS Subsystem 1 & 2)
  const [tables, setTables] = useState<FloorTable[]>(INITIAL_TABLES);
  const [selectedTableId, setSelectedTableId] = useState<string | null>('tbl-1');
  const [orderMode, setOrderMode] = useState<OrderMode>('DINE_IN');
  const [deliveryPartner, setDeliveryPartner] = useState<DeliveryPartner>('DIRECT');
  const [takeawayTokenNumber, setTakeawayTokenNumber] = useState<number>(105);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferTargetId, setTransferTargetId] = useState<string>('tbl-2');

  const handleTransferTable = () => {
    if (!selectedTableId || !transferTargetId || selectedTableId === transferTargetId) return;
    setTables((prev) => {
      const source = prev.find((t) => t.tableId === selectedTableId);
      if (!source) return prev;
      return prev.map((t) => {
        if (t.tableId === selectedTableId) {
          return {
            ...t,
            status: 'available',
            activeOrderId: null,
            sessionStartTime: null,
            guestCount: 0,
          };
        }
        if (t.tableId === transferTargetId) {
          return {
            ...t,
            status: 'occupied',
            activeOrderId: source.activeOrderId || 'ord-transfer',
            sessionStartTime: source.sessionStartTime || '15:30',
            guestCount: source.guestCount || 2,
          };
        }
        return t;
      });
    });
    setSelectedTableId(transferTargetId);
    setIsTransferModalOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#preview') {
        setCurrentRoute('preview');
      } else if (hash === '#layout' || hash === '') {
        setCurrentRoute('layout');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleRouteChange = (route: AppRoute) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.location.hash = route === 'preview' ? 'preview' : 'layout';
    }
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSpecial(null);
    setSelectedSpecialId(undefined);
    setSearchQuery('');
  };

  return (
    <div className="app-shell">
      {/* Top Nav with Circular / Pill-shaped Corners & Route Switcher */}
      <TopNav
        activeRoute={currentRoute}
        onRouteChange={handleRouteChange}
      />

      {/* Main Content: 1:2:1 Layout OR Components Preview Route */}
      {currentRoute === 'preview' ? (
        <main className="route-main-content">
          <ComponentPreviewPage />
        </main>
      ) : (
        <PageLayout
          leftColumn={
            <TableSessionManager
              tables={tables}
              selectedTableId={selectedTableId}
              onSelectTable={(table) => setSelectedTableId(table.tableId)}
              orderMode={orderMode}
              onOrderModeChange={setOrderMode}
              deliveryPartner={deliveryPartner}
              onDeliveryPartnerChange={setDeliveryPartner}
              takeawayTokenNumber={takeawayTokenNumber}
              onNewTakeawayToken={() => setTakeawayTokenNumber((prev) => prev + 1)}
              onOpenTransferModal={() => {
                const otherTable = tables.find(
                  (t) => t.tableId !== selectedTableId && t.status === 'available'
                );
                if (otherTable) setTransferTargetId(otherTable.tableId);
                setIsTransferModalOpen(true);
              }}
            />
          }
          centerColumn={
            <div className="center-work-section">
              {/* Section Header with Search Bar & Circular Filter Pills */}
              <div className="section-title-bar">
                <div className="title-bar-heading">
                  <h2 className="section-title">Menu Catalog</h2>
                  <span className="section-caption">Explore dishes & food cards</span>
                </div>

                <div className="catalog-toolbar">
                  {/* Circular Pill Search Bar */}
                  <div className="catalog-search-wrapper">
                    <Search size={15} className="catalog-search-icon" aria-hidden="true" />
                    <input
                      type="text"
                      className="catalog-search-input"
                      placeholder="Search menu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search dishes and menu items"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="catalog-search-clear-btn"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search input"
                      >
                        <X size={11} strokeWidth={2.5} />
                      </button>
                    )}
                  </div>

                  {/* Circular Filter Pills */}
                  <div
                    className="catalog-filter-pills"
                    role="tablist"
                    aria-label="Filter menu items by category"
                  >
                    {STANDARD_CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`circular-filter-pill ${isActive ? 'is-active' : ''}`}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedSpecial(null);
                            setSelectedSpecialId(undefined);
                          }}
                        >
                          {cat}
                        </button>
                      );
                    })}

                    {/* Specials Pill with Dropdown Menu */}
                    <Dropdown
                      label={
                        selectedSpecial && selectedCategory === 'Specials'
                          ? selectedSpecial
                          : 'Specials'
                      }
                      options={SPECIAL_OPTIONS}
                      selectedId={selectedSpecialId}
                      isActive={selectedCategory === 'Specials'}
                      onSelect={(opt) => {
                        setSelectedCategory('Specials');
                        setSelectedSpecial(opt.label);
                        setSelectedSpecialId(opt.id);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Food Cards Grid: Exactly 4 cards per row */}
              {filteredItems.length > 0 ? (
                <div className="food-cards-grid">
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      title={item.title}
                      subtitle={item.subtitle}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      imageAlt={item.imageAlt}
                      isFavorite={item.isFavorite}
                      onAdd={() => setCartCount((c) => c + 1)}
                      onRemove={() => setCartCount((c) => Math.max(0, c - 1))}
                    />
                  ))}
                </div>
              ) : (
                <div className="catalog-empty-results">
                  <h4>No matching dishes found</h4>
                  <p>
                    No items match &quot;{searchQuery}&quot;{' '}
                    {selectedCategory !== 'All' ? `in category "${selectedCategory}"` : ''}.
                  </p>
                  <button
                    type="button"
                    className="catalog-reset-filter-btn"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          }
          rightColumn={
            <div className="layout-placeholder-card col-3-card">
              <div className="card-tag">Column 3 (1x)</div>
              <h3>Right Panel</h3>
              <p>Order Cart Summary ({cartCount} added)</p>
            </div>
          }
        />
      )}

      {/* Table Transfer Modal Dialog */}
      {isTransferModalOpen && (
        <Modal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          title="Transfer Table Session"
          size="sm"
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', width: '100%' }}>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setIsTransferModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-primary-btn"
                onClick={handleTransferTable}
              >
                Confirm Transfer
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
              Transfer active order and guest session from{' '}
              <strong style={{ color: '#f97316' }}>
                {tables.find((t) => t.tableId === selectedTableId)?.tableNumber || 'Selected Table'}
              </strong>{' '}
              to a destination table.
            </p>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1e293b' }}>
              Destination Table
              <select
                value={transferTargetId}
                onChange={(e) => setTransferTargetId(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                {tables
                  .filter((t) => t.tableId !== selectedTableId)
                  .map((t) => (
                    <option key={t.tableId} value={t.tableId}>
                      {t.tableNumber} ({t.floorZone}) - {t.seatingCapacity} Seats [{t.status}]
                    </option>
                  ))}
              </select>
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
