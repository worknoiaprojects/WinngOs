import { useState } from 'react';
import './ComponentPreviewPage.css';
import Button from '../../components/ui/Button/Button';
import SpecularButton from '../../components/ui/SpecularButton/SpecularButton';
import Input from '../../components/ui/Input/Input';
import Badge from '../../components/ui/Badge/Badge';
import Modal from '../../components/ui/Modal/Modal';
import EmptyState from '../../components/states/EmptyState/EmptyState';
import { LoadingState, Spinner } from '../../components/states/LoadingState/LoadingState';
import ErrorState from '../../components/states/ErrorState/ErrorState';
import SuccessState from '../../components/states/SuccessState/SuccessState';
import FoodCard from '../../components/ui/FoodCard/FoodCard';
import Dropdown from '../../components/ui/Dropdown/Dropdown';
import dishSalmon from '../../assets/dish-salmon.jpg';
import dishRisotto from '../../assets/dish-risotto.jpg';
import dishGourmet from '../../assets/dish-gourmet.jpg';
import dishSalad from '../../assets/dish-salad.jpg';
import { Plus, ExternalLink, Sparkles } from 'lucide-react';

export function ComponentPreviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="preview-page-container">
      {/* Header Banner */}
      <header className="preview-header-banner">
        <div className="preview-badge-row">
          <span className="preview-badge">UI Library / Preview Route</span>
        </div>
        <h1 className="preview-main-title">Component States & UI Directory</h1>
        <p className="preview-subtitle">
          Pure custom CSS components styled with <strong>DM Sans</strong> and <strong>Orange</strong> theme tokens.
          Every component exposes its default, hover, loading, disabled, error, and empty states.
        </p>
      </header>

      {/* FOOD CARD SECTION */}
      <section className="preview-section" aria-labelledby="foodcard-heading">
        <div className="section-header">
          <h2 id="foodcard-heading">Food Plate Card Component (Reference Design)</h2>
          <span className="section-note">
            Squircle card with top favorite button, food plate center, and bottom pill action dock
          </span>
        </div>

        <div className="foodcard-showcase-row">
          <FoodCard
            title="Citrus Glazed Salmon"
            subtitle="Ready to Add (Qty: 0)"
            price="$24.5"
            imageUrl={dishSalmon}
            imageAlt="Citrus Glazed Salmon plate"
            initialQuantity={0}
          />
          <FoodCard
            title="Honey Carrot Risotto"
            subtitle="Added to Order (Qty: 1)"
            price="$19.0"
            imageUrl={dishRisotto}
            imageAlt="Honey carrot risotto dish"
            isFavorite={true}
            initialQuantity={1}
          />
          <FoodCard
            title="Saffron Seared Scallops"
            subtitle="Multi-item (Qty: 3)"
            price="$28.0"
            imageUrl={dishGourmet}
            imageAlt="Saffron seared culinary plate"
            initialQuantity={3}
          />
          <FoodCard
            title="Citrus Harvest Bowl"
            subtitle="Superfood Salad (Qty: 2)"
            price="$16.5"
            imageUrl={dishSalad}
            imageAlt="Citrus harvest superfood salad"
            initialQuantity={2}
          />
        </div>
      </section>

      {/* NEW: SPECULAR BUTTON (React Bits) SECTION */}
      <section className="preview-section" aria-labelledby="specular-heading">
        <div className="section-header">
          <div className="specular-title-row">
            <Sparkles size={18} className="specular-sparkle-icon" />
            <h2 id="specular-heading">React Bits — SpecularButton (@react-bits/SpecularButton-JS-CSS)</h2>
          </div>
          <span className="section-note">
            Glass button featuring shader-driven specular rim light that catches edges and glides toward the cursor.
          </span>
        </div>

        <div className="specular-showcase-container">
          <div className="specular-card">
            <span className="specular-tag">Default Specular Rim (Glass Dark)</span>
            <SpecularButton size="md" radius={18}>
              Glass Specular
            </SpecularButton>
          </div>

          <div className="specular-card">
            <span className="specular-tag">Orange Tinted Specular</span>
            <SpecularButton
              size="md"
              radius={18}
              tint="#f97316"
              tintOpacity={0.16}
              lineColor="#f97316"
              baseColor="#7c2d12"
              textColor="#ffffff"
            >
              Orange Specular
            </SpecularButton>
          </div>

          <div className="specular-card">
            <span className="specular-tag">Auto-Animate Specular Rim Light</span>
            <SpecularButton
              size="md"
              radius={18}
              autoAnimate={true}
              speed={2.5}
              glow={1.2}
              textColor="#ffffff"
            >
              Rotating Specular
            </SpecularButton>
          </div>

          <div className="specular-card">
            <span className="specular-tag">Large High-Glow Variant</span>
            <SpecularButton
              size="lg"
              radius={24}
              intensity={1.4}
              glow={1.5}
              textColor="#ffffff"
            >
              Explore Menu
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* 1. BUTTONS SECTION */}
      <section className="preview-section" aria-labelledby="buttons-heading">
        <div className="section-header">
          <h2 id="buttons-heading">1. Standard Tactile Buttons (Center-to-Sides Wave)</h2>
          <span className="section-note">Includes Primary (Orange), Secondary, Outline, Danger, Warning & Center Wave Touch feedback</span>
        </div>

        <div className="preview-cards-grid">
          <div className="component-card">
            <span className="state-tag">Default Primary</span>
            <Button variant="primary">Primary Button</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">With Icon</span>
            <Button variant="primary" icon={Plus}>Add Item</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Loading Spinner</span>
            <Button variant="primary" state="loading">Saving Record...</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Disabled State</span>
            <Button variant="primary" state="disabled">Disabled Button</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Secondary / Neutral</span>
            <Button variant="secondary">Cancel / Secondary</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Outline Variant</span>
            <Button variant="outline">Outline Action</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Danger State</span>
            <Button variant="danger">Delete / Destructive</Button>
          </div>

          <div className="component-card">
            <span className="state-tag">Warning State</span>
            <Button variant="warning">Warning Notice</Button>
          </div>
        </div>
      </section>

      {/* 2. INPUTS SECTION */}
      <section className="preview-section" aria-labelledby="inputs-heading">
        <div className="section-header">
          <h2 id="inputs-heading">2. Form Inputs & Field States</h2>
          <span className="section-note">Accessible with linked labels, helper messages, and inline error states</span>
        </div>

        <div className="preview-cards-grid">
          <div className="component-card">
            <span className="state-tag">Default Input</span>
            <Input
              label="Guest / Table Name"
              placeholder="e.g., Table 4 or John Doe"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              helperText="Optional reference identifier"
            />
          </div>

          <div className="component-card">
            <span className="state-tag">Error State</span>
            <Input
              label="Customer Phone"
              value="9871"
              onChange={() => {}}
              state="error"
              errorMessage="Must be a valid 10-digit mobile number."
            />
          </div>

          <div className="component-card">
            <span className="state-tag">Success State</span>
            <Input
              label="Coupon / Voucher Code"
              value="SAVE20"
              onChange={() => {}}
              state="success"
              helperText="20% discount applied successfully!"
            />
          </div>

          <div className="component-card">
            <span className="state-tag">Disabled State</span>
            <Input
              label="System Shift Token"
              value="#TK-90214"
              onChange={() => {}}
              state="disabled"
              helperText="Generated automatically by register"
            />
          </div>
        </div>
      </section>

      {/* 3. BADGES SECTION */}
      <section className="preview-section" aria-labelledby="badges-heading">
        <div className="section-header">
          <h2 id="badges-heading">3. Badges & Status Indicators</h2>
          <span className="section-note">Status pills for tags, order states, and categories</span>
        </div>

        <div className="badges-showcase-row">
          <Badge variant="primary" size="md">Primary Orange</Badge>
          <Badge variant="success" size="md">Active / Available</Badge>
          <Badge variant="warning" size="md">Pending / Occupied</Badge>
          <Badge variant="danger" size="md">Billed / Error</Badge>
          <Badge variant="info" size="md">Bar Station</Badge>
          <Badge variant="neutral" size="md">Neutral Tag</Badge>
        </div>

        <div className="component-card" style={{ maxWidth: '320px', marginTop: 'var(--space-2)' }}>
          <span className="state-tag">Interactive Circular Dropdown Pill</span>
          <Dropdown
            label="Specials Dropdown"
            options={[
              { id: '1', label: "Chef's Tasting", badge: 'Chef' },
              { id: '2', label: 'Seasonal Citrus', badge: 'New' },
              { id: '3', label: "Today's Fresh Catch" },
            ]}
            onSelect={() => {}}
          />
        </div>
      </section>

      {/* 4. MODAL DIALOG PREVIEW */}
      <section className="preview-section" aria-labelledby="modal-heading">
        <div className="section-header">
          <h2 id="modal-heading">4. Accessible Modal Dialog</h2>
          <span className="section-note">With backdrop blur, Escape key listener, and keyboard accessibility</span>
        </div>

        <div className="component-card modal-trigger-card">
          <p>Test the dialog overlay, focus traps, and keyboard listeners:</p>
          <Button
            variant="primary"
            icon={ExternalLink}
            onClick={() => setIsModalOpen(true)}
          >
            Launch Interactive Modal
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Interactive Modal Dialog"
          width="480px"
        >
          <div className="modal-preview-body">
            <p>
              This modal dialog is decoupled and styled using pure custom CSS.
              It adheres to accessibility guidelines with <code>aria-modal="true"</code>,
              an <code>Escape</code> key event listener, and background overlay dismiss.
            </p>
            <div className="modal-preview-actions">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm Action
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* 5. DEDICATED FEEDBACK STATES (Empty, Loading, Error, Success) */}
      <section className="preview-section" aria-labelledby="feedback-heading">
        <div className="section-header">
          <h2 id="feedback-heading">5. Feedback & Section States</h2>
          <span className="section-note">Standard empty, loading/skeleton, error, and success views</span>
        </div>

        <div className="feedback-states-grid">
          {/* Empty State */}
          <div className="feedback-col">
            <span className="state-tag">Empty State</span>
            <EmptyState
              icon="inbox"
              title="No Items Found"
              description="There are currently zero records in this collection."
              actionLabel="Create First Record"
            />
          </div>

          {/* Loading Skeleton & Spinners */}
          <div className="feedback-col">
            <span className="state-tag">Loading / Skeleton State</span>
            <div className="spinner-preview-row">
              <Spinner size="sm" label="Small" />
              <Spinner size="md" label="Medium" />
              <Spinner size="lg" label="Large" />
            </div>
            <LoadingState type="card" />
          </div>

          {/* Error State */}
          <div className="feedback-col">
            <span className="state-tag">Error State</span>
            <ErrorState
              title="Failed to Load Data"
              description="Could not complete request. A retry button is available below."
              onRetry={() => alert('Retrying request...')}
            />
          </div>

          {/* Success State */}
          <div className="feedback-col">
            <span className="state-tag">Success State</span>
            <SuccessState
              title="Transaction Verified"
              description="Your order was recorded and saved successfully."
              actionLabel="View Details"
              onAction={() => alert('Viewing details')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComponentPreviewPage;
