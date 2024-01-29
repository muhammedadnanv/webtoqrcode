const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Handle requests

  // Extract the URL path
  const urlPath = req.url === '/' ? '/index.html' : req.url;

  // Map the URL path to the file system
  const filePath = path.join(__dirname, 'public', urlPath);

  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file is not found, return a 404 response
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      // Set the appropriate content type based on the file extension
      const contentType = getContentType(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    default:
      return 'text/plain';
  }
};

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
