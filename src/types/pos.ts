/**
 * WinngOs Restaurant Operating System - POS Terminal Data Contracts
 * Derived strictly from Panel 1 Functional Implementation Specification
 */

export type TableStatus = 'available' | 'occupied' | 'billed';

export interface FloorTable {
  tableId: string;
  tableNumber: string;
  floorZone: string;
  seatingCapacity: number;
  status: TableStatus;
  activeOrderId: string | null;
  sessionStartTime: string | null;
  guestCount: number;
}

export type OrderMode = 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY';
export type DeliveryPartner = 'DIRECT' | 'ZOMATO' | 'SWIGGY';

export type PrepStation = 'KITCHEN' | 'BAR';
export type SpiceLevel = 'MILD' | 'MEDIUM' | 'EXTRA';

export interface ItemVariant {
  variantId: string;
  variantName: string;
  priceDelta: number;
}

export interface ItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  itemId: string;
  name: string;
  shortCode: string;
  categoryId: string;
  basePrice: number;
  taxRate: number; // e.g. 5 for 5% GST
  isVeg: boolean;
  isAvailable: boolean; // 86-toggle
  prepStation: PrepStation;
  variants?: ItemVariant[];
  addOns?: ItemAddOn[];
}

export interface MenuCategory {
  categoryId: string;
  categoryName: string;
}

export type CartItemStatus = 'STAGED' | 'SENT_TO_KITCHEN';

export interface CartItem {
  lineId: string;
  itemId: string;
  name: string;
  basePrice: number;
  quantity: number;
  selectedVariant?: ItemVariant;
  selectedAddOns: ItemAddOn[];
  spiceLevel?: SpiceLevel;
  cookingInstructions?: string; // Max 100 characters
  prepStation: PrepStation;
  lineTotal: number;
  status: CartItemStatus;
}

export type DiscountType = 'PERCENT' | 'FLAT';

export interface DiscountState {
  type: DiscountType;
  value: number;
  reason: 'Staff' | 'Promo' | 'Owner' | 'None';
  managerPin?: string;
}

export interface FinancialCalculation {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  cgst: number; // 2.5%
  sgst: number; // 2.5%
  totalTax: number;
  grandTotal: number; // Cash rounded Math.round()
}

export type TenderMethod = 'UPI' | 'CASH' | 'CARD' | 'SPLIT';
export type PaymentStatus = 'PENDING' | 'SUCCESS';
export type CardType = 'VISA' | 'MASTERCARD' | 'RUPAY';

export interface SplitEntry {
  method: 'UPI' | 'CASH' | 'CARD';
  amount: number;
}

export interface SettlementState {
  tenderMethod: TenderMethod;
  payableAmount: number;
  cashTendered: number;
  changeDue: number;
  upiTransactionRef: string;
  upiUri: string;
  cardAuthCode: string;
  cardType: CardType;
  splits: SplitEntry[];
  paymentStatus: PaymentStatus;
}

export type CustomerTier = 'NEW' | 'REGULAR' | 'VIP';

export interface CustomerCRM {
  phone: string;
  name: string;
  visitCount: number;
  tier: CustomerTier;
  pointsBalance: number;
  favoriteItems: string[];
}

export type OrderStatus = 'NEW_SESSION' | 'KOT_FIRED' | 'BILL_PRINTED' | 'SETTLED';

export interface OrderSession {
  orderId: string;
  tableId: string | null;
  tableNumber: string | null;
  orderMode: OrderMode;
  deliveryPartner: DeliveryPartner;
  tokenNumber: number;
  items: CartItem[];
  status: OrderStatus;
  customer: CustomerCRM | null;
  redeemedPoints: number;
  discount: DiscountState;
  sendWhatsAppEBill: boolean;
}
