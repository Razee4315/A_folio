// Fix asset paths for GitHub Pages deployment
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('./dist');
const baseUrl = '/A_folio/';

// Read index.html
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Cannot find index.html in dist directory!');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Ensure base tag is correct
if (!html.includes('<base href="/A_folio/"')) {
  // Remove existing base tag if present
  html = html.replace(/<base[^>]*>/, '');
  // Add the correct base tag after head
  html = html.replace(/<head>/, '<head>\n    <base href="/A_folio/" />');
}

// Fix all asset URLs in HTML
html = html.replace(/src="\//g, `src="${baseUrl}`);
html = html.replace(/href="\//g, `href="${baseUrl}`);

// Write the modified index.html back
fs.writeFileSync(indexPath, html);

console.log('📝 Fixed asset paths in index.html');

// Create .nojekyll file to prevent GitHub from ignoring files that begin with an underscore
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✅ Created .nojekyll file');

console.log('✨ All asset paths have been fixed for GitHub Pages deployment');
