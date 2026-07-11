'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { corsOrigin, nodeEnv } = require('./envConfigs');
const { ROUTES } = require('./constants/routes');
const apiRouter = require('./routes/api');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

/* ─── Global middleware ───────────────────────────────────── */

// CORS — allow the GitHub Pages / localhost frontend to call this API.
const allowedOrigins =
  corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Parse JSON & url-encoded bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging (skip noise in test/production if desired).
if (nodeEnv !== 'production') {
  app.use(morgan('dev'));
}

/* ─── Routes ──────────────────────────────────────────────── */

// Friendly root so hitting "/" in a browser isn't a 404.
app.get('/', (req, res) => {
  res.json({
    service: 'flora-backend',
    message: 'Flora REST API is running',
    endpoints: [
      `${ROUTES.API_BASE}${ROUTES.HEALTH}`,
      `${ROUTES.API_BASE}${ROUTES.BOUQUETS}`,
      `${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id`,
      `${ROUTES.API_BASE}${ROUTES.CATEGORIES}`,
    ],
  });
});

app.use(ROUTES.API_BASE, apiRouter);

/* ─── Fallbacks ───────────────────────────────────────────── */

app.use(notFound); // 404 for unmatched routes
app.use(errorHandler); // central error handler (LAST)

module.exports = app;
