const mammoth = require('mammoth');
const path = process.argv[2];
if (!path) {
  console.error('Usage: node convert-docx.js <path-to-docx>');
  process.exit(1);
}

mammoth.extractRawText({ path })
  .then(result => {
    console.log(result.value);
  })
  .catch(err => {
    console.error('Error converting docx:', err);
    process.exit(2);
  });
