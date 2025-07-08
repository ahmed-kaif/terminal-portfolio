const fs = require('fs');
const path = require('path');

// Ensure netlify functions directory exists
const functionsDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

console.log('✓ Netlify functions directory ready');
console.log('✓ Build complete - ready for Netlify deployment');