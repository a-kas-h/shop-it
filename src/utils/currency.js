/**
 * Currency formatting utilities
 */

// Get currency symbol from environment variables
const getCurrencySymbol = () => {
    // Check if we're in a Vite environment (browser)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.VITE_CURRENCY_SYMBOL || '₹';
    }
    // Fallback for Node.js or other environments
    return '₹';
};

const getCurrency = () => {
    // Check if we're in a Vite environment (browser)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.VITE_CURRENCY || 'INR';
    }
    // Fallback for Node.js or other environments
    return 'INR';
};

/**
 * Format price with configured currency
 * @param {number|string} price - The price to format
 * @param {boolean} showDecimals - Whether to show decimal places (default: true)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, showDecimals = true) => {
    const currencySymbol = getCurrencySymbol();

    if (!price || isNaN(price)) return `${currencySymbol}0`;

    const numPrice = parseFloat(price);

    if (showDecimals) {
        return `${currencySymbol}${numPrice.toFixed(2)}`;
    } else {
        return `${currencySymbol}${Math.round(numPrice)}`;
    }
};

/**
 * Format price with Indian number system (lakhs, crores)
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price string with Indian number system
 */
export const formatPriceIndian = (price) => {
    const currencySymbol = getCurrencySymbol();

    if (!price || isNaN(price)) return `${currencySymbol}0`;

    const numPrice = parseFloat(price);

    if (numPrice >= 10000000) { // 1 crore
        return `${currencySymbol}${(numPrice / 10000000).toFixed(2)} Cr`;
    } else if (numPrice >= 100000) { // 1 lakh
        return `${currencySymbol}${(numPrice / 100000).toFixed(2)} L`;
    } else if (numPrice >= 1000) { // 1 thousand
        return `${currencySymbol}${(numPrice / 1000).toFixed(1)}K`;
    } else {
        return `${currencySymbol}${numPrice.toFixed(2)}`;
    }
};

/**
 * Parse price from string and return number
 * @param {string} priceString - Price string (with or without currency symbol)
 * @returns {number} Parsed price as number
 */
export const parsePrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    if (!priceString) return 0;

    // Remove currency symbols and parse
    const cleaned = priceString.toString().replace(/[₹$,]/g, '');
    return parseFloat(cleaned) || 0;
};

/**
 * Get current currency configuration
 * @returns {object} Currency configuration
 */
export const getCurrencyConfig = () => {
    return {
        symbol: getCurrencySymbol(),
        code: getCurrency()
    };
};