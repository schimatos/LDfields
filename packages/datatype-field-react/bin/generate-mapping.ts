import * as fs from 'fs';
import path from 'path';
import mapping from './datatype-mapping.json';

const xsd = 'http://www.w3.org/2001/XMLSchema#';
const basePath = path.join(__dirname, '..', 'src', 'data');

// Clean up existing file if present
try {
  fs.rmSync(basePath, { recursive: true });
// eslint-disable-next-line no-empty
} catch (e) {}

fs.mkdirSync(basePath);

const supports: Record<string, boolean> = {};
const fullMap: Record<string, string> = {};

for (const key in mapping) {
  if (typeof key === 'string') {
    supports[xsd + key] = true;
    fullMap[xsd + key] = (mapping as { [key: string]: string })[key];
  }
}

fs.writeFileSync(path.join(basePath, 'datatype-mapping.json'), JSON.stringify(fullMap, null, 2));
fs.writeFileSync(path.join(basePath, 'supports-mapping.json'), JSON.stringify(supports, null, 2));
