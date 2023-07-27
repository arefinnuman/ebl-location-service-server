import express from 'express';
import { EblNetworkRoutes } from '../modules/eblNetwork/eblNetwork.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/ebl-networks',
    route: EblNetworkRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
