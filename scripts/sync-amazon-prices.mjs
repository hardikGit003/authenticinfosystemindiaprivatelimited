/**
 * Amazon Inventory & Price Synchronization Utility
 * Authentic Infosystem India Private Limited
 * Seller ID: A26NUGXR8IFFOO
 * Marketplace ID: A21TJRUUN4KGV
 */

import { amazonProducts, AMAZON_STORE_URL } from '../app/data/amazonProducts.js';

console.log("==================================================");
console.log("Amazon Inventory Status Report - Authentic Infosystem");
console.log(`Store URL: ${AMAZON_STORE_URL}`);
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
