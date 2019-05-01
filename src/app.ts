import express from 'express';

import {setupRoutes} from './components/root.routes';
import {configure, initErrorHandler, serverInit} from './core';

const app = express();
configure(app);
initErrorHandler(app);
serverInit(app);
setupRoutes(app);

export default app;
