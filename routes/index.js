const express = require("express");
const router = express.Router();
const path = require('path');

router.get("/", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get("/dokumentasi-osis", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'dokumentasi.html'));
});

router.get("/dokumentasi-osis/kcmcri0", async (req, res, next) => {
  res.redirect(
    "https://drive.google.com/drive/folders/1u6lwzjWNISfFQ2c7ZeSTABA7VXqH96JX?usp=drive_link"
  );
});

router.get("/ngl", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'ngl.html'));
});

router.get("/juara-video-terbaik", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'juara-video-terbaik.html'));
});

router.get("/loaderio-c7ed40825cffbbdac794d2aec21790fc.txt", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'loaderio-c7ed40825cffbbdac794d2aec21790fc.txt'));
});

router.get("/loaderio-c7ed40825cffbbdac794d2aec21790fc.html", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'loaderio-c7ed40825cffbbdac794d2aec21790fc.txt'));
});

router.get("/loaderio-c7ed40825cffbbdac794d2aec21790fc", async (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'loaderio-c7ed40825cffbbdac794d2aec21790fc.txt'));
});

module.exports = router;
