'use strict';
const express   = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../../swagger.json');
const { ROUTES } = require('../../constants/routes');
const bouquetsRouter = require('./bouquets.router');
const healthRouter   = require('./health.router');

const apiRouter = express.Router();
apiRouter.use(ROUTES.HEALTH,   healthRouter);
apiRouter.use(ROUTES.BOUQUETS, bouquetsRouter);
apiRouter.use(ROUTES.DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = apiRouter;
