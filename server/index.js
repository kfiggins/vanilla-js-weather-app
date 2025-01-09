const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, "../client", req.url === "/" ? "index.html" : req.url);

  // If the resolved path is a directory, append 'index.html'
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }
  console.log(filePath);
  const ext = path.extname(filePath);
  let contentType = "text/html";

  // Set content type based on file extension
  switch (ext) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = 7777;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
