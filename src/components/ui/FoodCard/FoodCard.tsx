import { useState } from 'react';
import './FoodCard.css';
import { Heart, Plus, Minus } from 'lucide-react';
import defaultFoodPlate from '../../../assets/food-plate.jpg';

export interface FoodCardProps {
  id?: string;
  title?: string;
  subtitle?: string;
  price?: string | number;
  imageUrl?: string;
  imageAlt?: string;
  isFavorite?: boolean;
  quantity?: number;
  initialQuantity?: number;
  onFavoriteToggle?: (isFav: boolean) => void;
  onAdd?: () => void;
  onRemove?: () => void;
  onQuantityChange?: (quantity: number) => void;
  className?: string;
}

export function FoodCard({
  title = 'Citrus Glazed Salmon',
  subtitle = 'Orange Purée & Greens',
  price = '$24.5',
  imageUrl = defaultFoodPlate,
  imageAlt = 'Gourmet Citrus Glazed Salmon Plate',
  isFavorite: initialFavorite = false,
  quantity: propQuantity,
  initialQuantity = 0,
  onFavoriteToggle,
  onAdd,
  onRemove,
  onQuantityChange,
  className = '',
}: FoodCardProps) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [uncontrolledQuantity, setUncontrolledQuantity] = useState(initialQuantity);

  const isControlled = propQuantity !== undefined;
  const currentQuantity = isControlled ? propQuantity : uncontrolledQuantity;

  const handleFavoriteClick = () => {
    const nextState = !favorite;
    setFavorite(nextState);
    onFavoriteToggle?.(nextState);
  };

  const updateQuantity = (nextQuantity: number) => {
    const safeQty = Math.max(0, nextQuantity);
    if (!isControlled) {
      setUncontrolledQuantity(safeQty);
    }
    onQuantityChange?.(safeQty);

    if (safeQty > currentQuantity) {
      onAdd?.();
    } else if (safeQty < currentQuantity) {
      onRemove?.();
    }
  };

  const handleInitialAdd = () => {
    updateQuantity(1);
  };

  const handleIncrement = () => {
    updateQuantity(currentQuantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(currentQuantity - 1);
  };

  const formattedPrice = typeof price === 'number' ? `$${price.toFixed(1)}` : price;

  return (
    <article className={`food-card ${className}`}>
      {/* Top Favorite Heart Button */}
      <button
        type="button"
        className={`food-card-heart-btn ${favorite ? 'is-active' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={14}
          className="food-card-heart-icon"
          fill={favorite ? 'currentColor' : 'currentColor'}
        />
      </button>

      {/* Centered Food Plate Image */}
      <div className="food-card-image-wrapper">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="food-card-image"
          loading="lazy"
        />
      </div>

      {/* Card Content: Title & Subtitle */}
      <div className="food-card-content">
        <h3 className="food-card-title">{title}</h3>
        <p className="food-card-subtitle">{subtitle}</p>
      </div>

      {/* Bottom Docked Action Bar: Price & Plus/Stepper Controller */}
      <div className="food-card-action-bar">
        <span className="food-card-price">{formattedPrice}</span>

        {currentQuantity === 0 ? (
          <button
            type="button"
            className="food-card-add-btn"
            onClick={handleInitialAdd}
            aria-label={`Add ${title} to order`}
          >
            <Plus size={16} className="add-icon" />
          </button>
        ) : (
          <div
            className="food-card-stepper"
            role="group"
            aria-label={`Quantity selector for ${title}`}
          >
            <button
              type="button"
              className="food-card-stepper-btn decrement"
              onClick={handleDecrement}
              aria-label={`Decrease quantity of ${title}`}
            >
              <Minus size={13} className="stepper-icon" />
            </button>
            <span
              className="food-card-stepper-count"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentQuantity}
            </span>
            <button
              type="button"
              className="food-card-stepper-btn increment"
              onClick={handleIncrement}
              aria-label={`Increase quantity of ${title}`}
            >
              <Plus size={13} className="stepper-icon" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default FoodCard;
