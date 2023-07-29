import express from 'express';
import { EBl365Routes } from '../modules/ebl365/ebl365.routes';
import { EblAgentRoutes } from '../modules/eblAgent/eblAgent.routes';
import { EblBranchRoutes } from '../modules/eblBranch/eblBranch.routes';
import { EblNetworkRoutes } from '../modules/eblNetwork/eblNetwork.routes';
import { EblSubBranchRoutes } from '../modules/eblSubBranch/eblSubBranch.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/ebl-networks',
    route: EblNetworkRoutes,
  },
  {
    path: '/ebl-branches',
    route: EblBranchRoutes,
  },
  {
    path: '/ebl-sub-branches',
    route: EblSubBranchRoutes,
  },
  {
    path: '/ebl-agents',
    route: EblAgentRoutes,
  },
  {
    path: '/ebl-365',
    route: EBl365Routes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
