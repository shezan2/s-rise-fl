const fs = require('fs');
let code = fs.readFileSync('src/lib/data/players.ts', 'utf8');

// Replace interface fields
code = code.replace(/  shots: number;\n/g, '');
code = code.replace(/  keyPasses: number;\n/g, '');
code = code.replace(/  seasonRating: number;\n/g, '');

// Replace object properties
code = code.replace(/    "shots": \d+,\n/g, '');
code = code.replace(/    "keyPasses": \d+,\n/g, '');
// Note: seasonRating is the last element, so it might not have a comma, but we'll use regex to catch it
code = code.replace(/    "seasonRating": [0-9.]+(,\n)?/g, '');

// Cleanup any trailing commas if seasonRating was removed and left a trailing comma on the previous line
code = code.replace(/,\n  \}/g, '\n  }');

fs.writeFileSync('src/lib/data/players.ts', code);
console.log('Stats removed from players.ts');
