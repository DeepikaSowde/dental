const fs = require('fs');
const path = require('path');

const replacements = {
  '#00F5FF': '#81C784',
  '0,212,255': '27,94,32',
  '0, 212, 255': '27, 94, 32',
  '0,153,204': '129,199,132',
  '0, 153, 204': '129, 199, 132',
  '0,181,168': '0,121,107',
  '0, 181, 168': '0, 121, 107',
  '%2300D4FF': '%231B5E20',
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    for (const [oldColor, newColor] of Object.entries(replacements)) {
      content = content.replace(new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), newColor);
    }
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
