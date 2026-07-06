'use strict';

const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const path     = require('path');

const { corsOrigin, nodeEnv } = require('./envConfigs');
const { ROUTES }    = require('./constants/routes');
const apiRouter     = require('./routes/api');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

/* ─── CORS ────────────────────────────────────────────────── */
const allowedOrigins = corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o) => o.trim());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

/* ─── Body parsers ────────────────────────────────────────── */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ─── Logging ─────────────────────────────────────────────── */
if (nodeEnv !== 'production') app.use(morgan('dev'));

/* ─── Static files (Block 4) ──────────────────────────────── */
app.use(express.static(path.join(__dirname, 'public')));

/* ─── Routes ──────────────────────────────────────────────── */
app.get('/', (_req, res) =>
  res.json({
    service: 'flora-backend',
    message: 'Flora REST API is running',
    docs:    `${ROUTES.API_BASE}${ROUTES.DOCS}`,
    endpoints: [
      `GET  ${ROUTES.API_BASE}${ROUTES.BOUQUETS}`,
      `GET  ${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id`,
      `POST ${ROUTES.API_BASE}${ROUTES.BOUQUETS}`,
      `PUT  ${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id`,
      `DELETE ${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id`,
      `PATCH ${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id/favorite`,
      `PATCH ${ROUTES.API_BASE}${ROUTES.BOUQUETS}/:id/photo`,
    ],
  }),
);

app.use(ROUTES.API_BASE, apiRouter);

/* ─── Fallbacks ───────────────────────────────────────────── */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
