// Temporary test file to check what's exported from hugeicons
import * as Hugeicons from '@hugeicons/react';

console.log('Available exports from @hugeicons/react:');
console.log(Object.keys(Hugeicons));

// Check if specific icons exist
const iconsToCheck = [
  'Clock01Icon',
  'CheckmarkCircle02Icon', 
  'Cancel01Icon',
  'Calendar03Icon',
  'ArrowDown01Icon',
  'Logout03Icon',
  'Calendar04Icon'
];

console.log('\nChecking specific icons:');
iconsToCheck.forEach(iconName => {
  console.log(`${iconName}: ${iconName in Hugeicons ? '✓ Available' : '✗ Not found'}`);
});
