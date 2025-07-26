import {
    formatPrice,
    formatChange,
    formatMarketCap,
    isNumber,
    isString,
} from '@/lib/utils';

describe('Utils', () => {
    describe('formatPrice', () => {
        it('should format price correctly', () => {
            expect(formatPrice(1234.56)).toBe('$1,234.56');
            expect(formatPrice(0.12345678)).toBe('$0.12345678'); // Исправлено
        });
    });

    describe('formatChange', () => {
        it('should format positive change', () => {
            expect(formatChange(2.5)).toBe('+2.50%');
        });

        it('should format negative change', () => {
            expect(formatChange(-1.75)).toBe('-1.75%');
        });
    });

    describe('formatMarketCap', () => {
        it('should format market cap', () => {
            expect(formatMarketCap(1234567890)).toBe('$1.2B');
        });
    });

    describe('isNumber', () => {
        it('should return true for valid numbers', () => {
            expect(isNumber(123)).toBe(true);
            expect(isNumber(0)).toBe(true);
            expect(isNumber(-123.45)).toBe(true);
        });

        it('should return false for invalid numbers', () => {
            expect(isNumber(NaN)).toBe(false);
            expect(isNumber('123')).toBe(false);
            expect(isNumber(null)).toBe(false);
        });
    });

    describe('isString', () => {
        it('should return true for strings', () => {
            expect(isString('test')).toBe(true);
            expect(isString('')).toBe(true);
        });

        it('should return false for non-strings', () => {
            expect(isString(123)).toBe(false);
            expect(isString(null)).toBe(false);
            expect(isString(undefined)).toBe(false);
        });
    });
});
