const fs = require('fs');
const path = require('path');

const replacements = {
  '#00D4FF': '#1B5E20', // Primary Forest Green
  '#0099CC': '#81C784', // Secondary Sage Green
  '#00B5A8': '#00796B', // Accent Earthy Teal
  '#0A0A0F': '#FFFDF5', // Background Pale Cream
  '#0D1117': '#FFFFFF', // Card/Surface Pure White
  '#111827': '#FAF6ED', // Muted Soft off-white
  '#BAE6FD': '#3E2723', // Text Primary Deep Charcoal
  '#64748B': '#5D4037', // Text Secondary Warm Brown
  'text-white': 'text-[#3E2723]', // Convert white text to dark text for light theme
  // 'border-[#00D4FF]/10' will naturally become 'border-[#1B5E20]/10' which is fine
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [oldColor, newColor] of Object.entries(replacements)) {
      // Case-insensitive replacement for hex codes, case-sensitive for 'text-white'
      if (oldColor.startsWith('#')) {
        content = content.replace(new RegExp(oldColor, 'gi'), newColor);
      } else {
        content = content.replace(new RegExp(oldColor, 'g'), newColor);
      }
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
