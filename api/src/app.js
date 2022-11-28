import 'dotenv/config';
import { json, static as staticPath, urlencoded } from 'express';
import cors from 'cors';
import ejs from 'ejs';
import { app, startServer } from './config';
import { errorHandler, notFound } from './middleware';
import {
  CarRoutes,
  UsersRoutes,
  AdminRoutes,
  ColorRoutes,
  DetailsRoutes,
} from './routes';
import path from 'path';

export const init = () => {
  //global middlewares
  app.set('views', path.join(__dirname, '../views'));

  app.engine('ejs', ejs.renderFile);
  app.set('view engine', 'ejs');

  app.use(cors({ origin: '*' }));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.get('/page', (req, res) => {
    res.render('index');
  });

  //routes
  app.use('/api/car', CarRoutes);
  app.use('/api/auth', UsersRoutes);
  app.use('/api/admin', AdminRoutes);
  app.use('/api/color', ColorRoutes);
  app.use('/api/details', DetailsRoutes);
  app.get('/', (req, res) => {
    console.log('health check');
    res.json({
      healthCheck: 'system is ready',
    });
  });

  // 404
  app.use(notFound);

  // Error handler
  app.use(errorHandler);

  //init db with server
  startServer();
};

//initialize server
init();
