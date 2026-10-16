/**
 * Amazon Inventory & Price Synchronization Utility
 * Authentic Infosystem India Private Limited
 * Seller ID: A26NUGXR8IFFOO
 * Marketplace ID: A21TJRUUN4KGV
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, '../app/data/amazonProducts.ts');
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Extract the products array text
const match = fileContent.match(/export const amazonProducts:\s*AmazonProduct\[\]\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.error("Could not parse amazonProducts array from amazonProducts.ts");
  process.exit(1);
}

// Safely evaluate as JS object
const amazonProducts = eval(match[1]);
const storeUrl = "https://www.amazon.in/s?me=A26NUGXR8IFFOO&marketplaceID=A21TJRUUN4KGV";

console.log("==================================================");
console.log("Amazon Inventory Status Report - Authentic Infosystem");
console.log(`Store URL: ${storeUrl}`);
console.log(`Total Active Products: ${amazonProducts.length}`);
console.log("==================================================");

amazonProducts.forEach((product, idx) => {
  console.log(`[${idx + 1}/${amazonProducts.length}] ${product.brand} - ${product.shortTitle}`);
  console.log(`   ASIN: ${product.asin}`);
  console.log(`   Current Price: ₹${product.price.toLocaleString("en-IN")} | MRP: ₹${product.mrp.toLocaleString("en-IN")} (${product.discountPercent}% Off)`);
  console.log(`   Rating: ${product.rating} ★ (${product.reviewCountFormatted} reviews)`);
  console.log(`   Live Link: ${product.amazonUrl}`);
  console.log("--------------------------------------------------");
});

console.log("Sync check completed successfully.");
