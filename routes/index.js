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
    "https://osisgridaku.framer.ai/docs/0/jalan-sehat-(baru-di-update)"
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

router.get("/get-it/pesantrenramadan/formulir-pengumpulan", (req, res) => {
  res.redirect("https://docs.google.com/forms/d/e/1FAIpQLScMil50ABok3Myx_EUO3QH76x6mxo-8w9s39f7nFVsOOqniYw/viewform?usp=header");
});

module.exports = router;
