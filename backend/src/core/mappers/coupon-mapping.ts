import { CouponCode } from '../enums/coupon-code.enum';

export class CouponMapping {
  private static readonly couponMap: Record<CouponCode, string> = {
    [CouponCode.SUMMERFREE]: process.env.COUPON_SUMMERFREE || '',
    [CouponCode.FREEMONTH]: process.env.COUPON_FREEMONTH || '',
    [CouponCode.FIFTYOFF]: process.env.COUPON_FIFTYOFF || '',
  };

  static getCouponId(couponCode: CouponCode): string {
    return this.couponMap[couponCode];
  }

  static isValidCouponCode(couponName: string): couponName is CouponCode {
    return Object.values(CouponCode).includes(couponName as CouponCode);
  }
}
