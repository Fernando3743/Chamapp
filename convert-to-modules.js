const fs = require('fs');
const path = require('path');

// List of dashboard CSS files to convert
const cssFiles = [
  'analytics',
  'appointments',
  'calendar',
  'customer-details',
  'customers',
  'products',
  'settings',
  'staff',
  'transactions'
];

// Function to convert kebab-case to camelCase
function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Process each CSS file
cssFiles.forEach(fileName => {
  const cssPath = `src/app/styles/${fileName}.css`;
  const modulePath = `src/app/styles/${fileName}.module.css`;
  
  try {
    // Read the CSS file
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Convert class selectors to camelCase
    const convertedContent = cssContent.replace(/\.([a-zA-Z0-9-]+)/g, (match, className) => {
      // Skip pseudo-classes and special cases
      if (className.includes(':')) return match;
      
      // Convert kebab-case to camelCase
      const camelCaseClass = kebabToCamel(className);
      return '.' + camelCaseClass;
    });
    
    // Write to module file
    fs.writeFileSync(modulePath, convertedContent);
    console.log(`✅ Converted ${fileName}.css to ${fileName}.module.css`);
    
    // Delete original file
    fs.unlinkSync(cssPath);
    console.log(`   Removed original ${fileName}.css`);
    
  } catch (error) {
    console.error(`❌ Error converting ${fileName}.css:`, error.message);
  }
});

console.log('\n📋 Next steps:');
console.log('1. Update component imports to use CSS modules');
console.log('2. Update all className references to use styles object');
console.log('3. Look for common patterns to extract');