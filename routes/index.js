const express = require('express');
const router = express.Router();

// Inicio
router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 200,
    message: 'TOC API v1.0'
  })
});

module.exports = router;
