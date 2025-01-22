const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Specific routes for individual HTML pages
app.get("/writer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "writer.html"));
});

app.get("/reader", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reader.html"));
});

// Catch-all route for other requests (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
