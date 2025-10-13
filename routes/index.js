const express = require("express");
const router = express.Router();
const path = require('path');

router.get("/", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get("/dokumentasi-osis", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'dokumentasi.html'));
});

router.get("/ngl", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'ngl.html'));
});

router.get("/juara-video-terbaik", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'juara-video-terbaik.html'));
});

module.exports = router;
