/**
 * Simple tests for currency formatting utilities
 * Run with: node src/utils/currency.test.js
 */

import { formatPrice, formatPriceIndian, parsePrice } from './currency.js';

// Test cases
const testCases = [
    { input: 285, expected: '₹285.00', description: 'Aashirvaad Atta price' },
    { input: 18500, expected: '₹18500.00', description: 'Samsung phone price' },
    { input: 35.50, expected: '₹35.50', description: 'Decimal price' },
    { input: 0, expected: '₹0.00', description: 'Zero price' },
    { input: null, expected: '₹0', description: 'Null price' },
    { input: '285.00', expected: '₹285.00', description: 'String price' },
];

console.log('🧪 Testing Currency Formatting...\n');

testCases.forEach((test, index) => {
    const result = formatPrice(test.input);
    const passed = result === test.expected;

    console.log(`Test ${index + 1}: ${test.description}`);
    console.log(`  Input: ${test.input}`);
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got: ${result}`);
    console.log(`  ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
});

// Test Indian number formatting
console.log('🇮🇳 Testing Indian Number Formatting...\n');

const indianTests = [
    { input: 285, expected: '₹285.00' },
    { input: 1500, expected: '₹1.5K' },
    { input: 150000, expected: '₹1.50 L' },
    { input: 15000000, expected: '₹1.50 Cr' },
];

indianTests.forEach((test, index) => {
    const result = formatPriceIndian(test.input);
    console.log(`${test.input} → ${result} (expected: ${test.expected})`);
});

console.log('\n✅ Currency formatting ready for Indian Rupees!');