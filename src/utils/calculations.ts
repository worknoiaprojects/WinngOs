import { CartItem, DiscountState, FinancialCalculation } from '../types/pos';

/**
 * Deterministic Financial Calculations for WinngOs POS
 * Adheres strictly to Section 2 of Specification Blueprint
 */

export function calculateFinancials(
  items: CartItem[],
  discount: DiscountState,
  redeemedPoints: number = 0
): FinancialCalculation {
  // Empty cart enforces Subtotal = 0.00
  if (items.length === 0) {
    return {
      subtotal: 0,
      discountAmount: 0,
      taxableAmount: 0,
      cgst: 0,
      sgst: 0,
      totalTax: 0,
      grandTotal: 0,
    };
  }

  // 1. Cart Subtotal = Sum of all active item line totals
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

  // 2. Discount Calculation (cannot exceed subtotal)
  let baseDiscount = 0;
  if (discount.type === 'PERCENT') {
    baseDiscount = (subtotal * discount.value) / 100;
  } else {
    baseDiscount = discount.value;
  }

  // Add loyalty points redemption (1 Point = 1.00 INR, capped at max 20% of subtotal)
  const maxLoyaltyDiscount = subtotal * 0.2;
  const effectivePointsDiscount = Math.min(redeemedPoints, maxLoyaltyDiscount);

  const totalDiscount = Math.min(subtotal, Math.round((baseDiscount + effectivePointsDiscount) * 100) / 100);

  // 3. Tax Engine (GST India: 2.5% CGST + 2.5% SGST on post-discount taxable amount)
  const taxableAmount = Math.max(0, subtotal - totalDiscount);
  const cgst = Math.round(taxableAmount * 0.025 * 100) / 100;
  const sgst = Math.round(taxableAmount * 0.025 * 100) / 100;
  const totalTax = cgst + sgst;

  // 4. Commercial cash rounding to nearest integer rupee
  const grandTotal = Math.round(taxableAmount + totalTax);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: totalDiscount,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    cgst,
    sgst,
    totalTax,
    grandTotal,
  };
}

export function validatePhone(phone: string): boolean {
  return /^[6-9][0-9]{9}$/.test(phone.trim());
}
