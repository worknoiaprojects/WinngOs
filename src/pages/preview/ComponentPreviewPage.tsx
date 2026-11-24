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
import {
  Plus,
  Minus,
  Sparkles,
  CreditCard,
  Banknote,
  QrCode,
  AlertTriangle,
  Utensils,
  Receipt,
} from 'lucide-react';

export function ComponentPreviewPage() {
  const [inputValue, setInputValue] = useState('');

  // Base Modal showcase states
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Customizer state
  const [customPortion, setCustomPortion] = useState<'standard' | 'large'>('standard');
  const [extraGlaze, setExtraGlaze] = useState(true);
  const [extraAsparagus, setExtraAsparagus] = useState(false);
  const [extraTruffle, setExtraTruffle] = useState(false);
  const [cookingNote, setCookingNote] = useState('');
  const [customQty, setCustomQty] = useState(1);

  // Checkout modal state
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'qr'>('card');

  // Calculations
  const baseItemPrice = 24.5;
  const portionExtra = customPortion === 'large' ? 6.0 : 0;
  const addonTotal = (extraGlaze ? 2.0 : 0) + (extraAsparagus ? 4.5 : 0) + (extraTruffle ? 7.0 : 0);
  const totalItemPrice = ((baseItemPrice + portionExtra + addonTotal) * customQty).toFixed(2);

  const subtotal = 58.0;
  const tax = +(subtotal * 0.08).toFixed(2);
  const tipAmount = +((subtotal * tipPercent) / 100).toFixed(2);
  const grandTotal = (subtotal + tax + tipAmount).toFixed(2);

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

      {/* 4. BASE POPUP MODAL COMPONENT (Mandatory for POS) */}
      <section className="preview-section" aria-labelledby="modal-heading">
        <div className="section-header">
          <h2 id="modal-heading">4. Base Popup Modal Component (POS Base Dialogs)</h2>
          <span className="section-note">
            Accessible dialog with backdrop blur, smooth pop-in animations, customizable header/body/footer, and Escape key dismissal
          </span>
        </div>

        <div className="modal-trigger-grid">
          {/* Modal Trigger 1: Item Customization */}
          <div className="component-card">
            <span className="state-tag">POS Order Flow Modal</span>
            <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              Dish Customizer Popup
            </h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Configure portions, add-ons, notes, and live pricing for restaurant dishes.
            </p>
            <Button
              variant="primary"
              icon={Utensils}
              onClick={() => setIsCustomizerOpen(true)}
            >
              Open Dish Customizer
            </Button>
          </div>

          {/* Modal Trigger 2: Checkout & Payment */}
          <div className="component-card">
            <span className="state-tag">POS Checkout Flow</span>
            <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              Order Checkout & Bill
            </h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Table payment summary with tax calculation, tip selector, and payment method options.
            </p>
            <Button
              variant="primary"
              icon={Receipt}
              onClick={() => setIsCheckoutOpen(true)}
            >
              Open Payment Modal
            </Button>
          </div>

          {/* Modal Trigger 3: Alert / Action Confirmation */}
          <div className="component-card">
            <span className="state-tag">Action Confirmation</span>
            <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.95rem' }}>
              Void Order Confirmation
            </h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Compact confirmation modal with destructive or warning states.
            </p>
            <Button
              variant="outline"
              icon={AlertTriangle}
              onClick={() => setIsConfirmOpen(true)}
            >
              Open Alert Modal
            </Button>
          </div>
        </div>

        {/* MODAL 1: POS ITEM CUSTOMIZER */}
        <Modal
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          title="Customize Order Item"
          subtitle="Select portions, chef extras, and special kitchen instructions"
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsCustomizerOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert(`Added to order! Total: $${totalItemPrice}`);
                  setIsCustomizerOpen(false);
                }}
              >
                Add to Order • ${totalItemPrice}
              </Button>
            </>
          }
        >
          <div className="customizer-modal-body">
            {/* Dish Hero Card */}
            <div className="modal-dish-preview-card">
              <img
                src={dishSalmon}
                alt="Citrus Glazed Salmon"
                className="modal-dish-thumb"
              />
              <div className="modal-dish-info">
                <span className="modal-dish-title">Citrus Glazed Salmon</span>
                <span className="modal-dish-desc">Orange Purée, Charred Citrus & Microgreens</span>
                <span className="modal-dish-base-price">Base Price: ${baseItemPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Portion Selection */}
            <div className="modal-form-section">
              <label className="modal-section-label">Portion Size</label>
              <div className="portion-pills-row">
                <button
                  type="button"
                  className={`portion-select-pill ${customPortion === 'standard' ? 'is-selected' : ''}`}
                  onClick={() => setCustomPortion('standard')}
                >
                  Standard Portion
                </button>
                <button
                  type="button"
                  className={`portion-select-pill ${customPortion === 'large' ? 'is-selected' : ''}`}
                  onClick={() => setCustomPortion('large')}
                >
                  Large Portion (+ $6.00)
                </button>
              </div>
            </div>

            {/* Add-on Extras */}
            <div className="modal-form-section">
              <label className="modal-section-label">Chef Extras & Add-ons</label>
              <div className="modal-addons-list">
                <label className="modal-addon-checkbox-row">
                  <input
                    type="checkbox"
                    checked={extraGlaze}
                    onChange={(e) => setExtraGlaze(e.target.checked)}
                    className="modal-checkbox"
                  />
                  <span className="addon-label">Extra Honey Orange Glaze</span>
                  <span className="addon-price">+ $2.00</span>
                </label>
                <label className="modal-addon-checkbox-row">
                  <input
                    type="checkbox"
                    checked={extraAsparagus}
                    onChange={(e) => setExtraAsparagus(e.target.checked)}
                    className="modal-checkbox"
                  />
                  <span className="addon-label">Pan-Roasted Asparagus</span>
                  <span className="addon-price">+ $4.50</span>
                </label>
                <label className="modal-addon-checkbox-row">
                  <input
                    type="checkbox"
                    checked={extraTruffle}
                    onChange={(e) => setExtraTruffle(e.target.checked)}
                    className="modal-checkbox"
                  />
                  <span className="addon-label">Shaved Black Truffle</span>
                  <span className="addon-price">+ $7.00</span>
                </label>
              </div>
            </div>

            {/* Kitchen Instructions */}
            <div className="modal-form-section">
              <label htmlFor="modal-kitchen-note" className="modal-section-label">
                Special Kitchen Instructions
              </label>
              <input
                id="modal-kitchen-note"
                type="text"
                placeholder="e.g. Extra crispy skin, dressing on the side..."
                value={cookingNote}
                onChange={(e) => setCookingNote(e.target.value)}
                className="modal-kitchen-input"
              />
            </div>

            {/* Quantity Selector */}
            <div className="modal-form-section modal-quantity-row">
              <label className="modal-section-label" style={{ margin: 0 }}>
                Quantity
              </label>
              <div className="modal-stepper-control">
                <button
                  type="button"
                  className="modal-stepper-btn"
                  onClick={() => setCustomQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="modal-stepper-value">{customQty}</span>
                <button
                  type="button"
                  className="modal-stepper-btn"
                  onClick={() => setCustomQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* MODAL 2: POS CHECKOUT & PAYMENT */}
        <Modal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          title="Order Payment & Checkout"
          subtitle="Table 04 • 2 Guests • Server: Alex M."
          size="md"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsCheckoutOpen(false)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert(`Payment of $${grandTotal} processed successfully!`);
                  setIsCheckoutOpen(false);
                }}
              >
                Complete Payment (${grandTotal})
              </Button>
            </>
          }
        >
          <div className="checkout-modal-body">
            {/* Bill Summary Table */}
            <div className="checkout-summary-card">
              <div className="checkout-line-row">
                <span>Subtotal (3 items)</span>
                <span className="checkout-line-val">${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-line-row">
                <span>Sales Tax (8%)</span>
                <span className="checkout-line-val">${tax.toFixed(2)}</span>
              </div>
              <div className="checkout-line-row">
                <span>Tip Amount ({tipPercent}%)</span>
                <span className="checkout-line-val">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="checkout-line-row checkout-total-row">
                <span>Grand Total</span>
                <span className="checkout-total-val">${grandTotal}</span>
              </div>
            </div>

            {/* Tip Percentage Selection */}
            <div className="modal-form-section">
              <label className="modal-section-label">Tip Selection</label>
              <div className="portion-pills-row">
                {[10, 15, 20, 25].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    className={`portion-select-pill ${tipPercent === tip ? 'is-selected' : ''}`}
                    onClick={() => setTipPercent(tip)}
                  >
                    {tip}% (${((subtotal * tip) / 100).toFixed(2)})
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="modal-form-section">
              <label className="modal-section-label">Payment Method</label>
              <div className="payment-methods-grid">
                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === 'card' ? 'is-active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={20} className="pay-icon" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === 'cash' ? 'is-active' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <Banknote size={20} className="pay-icon" />
                  <span>Cash</span>
                </button>
                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === 'qr' ? 'is-active' : ''}`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <QrCode size={20} className="pay-icon" />
                  <span>Digital / QR</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>

        {/* MODAL 3: VOID / ALERT CONFIRMATION */}
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Void Order #1048?"
          subtitle="Destructive action confirmation"
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  alert('Order #1048 has been voided.');
                  setIsConfirmOpen(false);
                }}
              >
                Void Order
              </Button>
            </>
          }
        >
          <div className="confirm-modal-body">
            <div className="confirm-warning-icon-wrapper">
              <AlertTriangle size={32} className="confirm-warning-icon" />
            </div>
            <p className="confirm-modal-text">
              Are you sure you want to void order <strong>#1048</strong>?
              All prepared items will be removed from Table 4 and sent to the kitchen cancellation feed.
            </p>
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
