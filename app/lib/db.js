import fs from 'fs';
import path from 'path';
import { products as initialProducts } from '../data/products';

const DB_FILE = path.join(process.cwd(), 'app', 'data', 'db.json');

export function getProducts() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading db.json, falling back to initial data:', err);
  }

  // Save initial products to db.json if not present
  saveProducts(initialProducts);
  return initialProducts;
}

export function saveProducts(productsList) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(productsList, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err);
    return false;
  }
}
