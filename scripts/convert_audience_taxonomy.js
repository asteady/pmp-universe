// Node.js script to convert Google Visualization API response to JSON array for app
const fs = require('fs');
const input = fs.readFileSync('../Downloads/audiencetaxonomyjson.txt', 'utf8');

// Extract the JSON object from the JS wrapper
function extractTableJson(str) {
  const match = str.match(/setResponse\((.*)\);?$/s);
  if (!match) throw new Error('Could not find setResponse wrapper');
  return JSON.parse(match[1]);
}

const raw = extractTableJson(input);
const rows = raw.table.rows;

// Find the column indices for Segment ID, Segment Name, Definition
const header = rows[0].c.map(cell => cell?.v || '');
const idIdx = header.indexOf('Segment ID');
const nameIdx = header.indexOf('Segment Name');
const descIdx = header.indexOf('Definition');

const taxonomy = rows.slice(1)
  .map(row => {
    const cells = row.c;
    return {
      id: cells[idIdx]?.v || '',
      name: cells[nameIdx]?.v || '',
      description: cells[descIdx]?.v || ''
    };
  })
  .filter(entry => entry.id && entry.name && entry.description);

fs.writeFileSync('data/audienceTaxonomy.json', JSON.stringify(taxonomy, null, 2));
console.log(`Wrote ${taxonomy.length} taxonomy entries to data/audienceTaxonomy.json`); 