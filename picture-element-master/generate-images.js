const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Image specifications
const images = [
  // Background contain/cover demos
  { name: 'bg-small.jpg', width: 600, height: 400, color: '#4A90E2', label: 'SMALL\n600×400' },
  { name: 'bg-medium.jpg', width: 800, height: 600, color: '#50C878', label: 'MEDIUM\n800×600' },
  { name: 'bg-large.jpg', width: 1200, height: 800, color: '#E94B3C', label: 'LARGE\n1200×800' },
  
  // Image-set demos (resolution switching)
  { name: 'pattern-1x.jpg', width: 400, height: 400, color: '#9B59B6', label: '1x\n400×400' },
  { name: 'pattern-2x.jpg', width: 800, height: 800, color: '#9B59B6', label: '2x\n800×800' },
  { name: 'pattern-3x.jpg', width: 1200, height: 1200, color: '#9B59B6', label: '3x\n1200×1200' }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Generate each image
images.forEach(spec => {
  const canvas = createCanvas(spec.width, spec.height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = spec.color;
  ctx.fillRect(0, 0, spec.width, spec.height);
  
  // Add diagonal pattern for visual interest
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  for (let i = -spec.height; i < spec.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + spec.height, spec.height);
    ctx.stroke();
  }
  
  // Add text label
  const fontSize = Math.min(spec.width, spec.height) / 8;
  ctx.fillStyle = 'white';
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add semi-transparent background for text
  const lines = spec.label.split('\n');
  const lineHeight = fontSize * 1.2;
  const totalHeight = lines.length * lineHeight;
  const startY = (spec.height - totalHeight) / 2 + fontSize / 2;
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, startY - fontSize * 0.6, spec.width, totalHeight + fontSize * 0.4);
  
  // Draw text
  ctx.fillStyle = 'white';
  lines.forEach((line, index) => {
    ctx.fillText(line, spec.width / 2, startY + index * lineHeight);
  });
  
  // Save as JPEG
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  const filePath = path.join(imagesDir, spec.name);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Generated ${spec.name}`);
});

console.log('\nAll placeholder images generated successfully!');
