import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DepartmentRoutes } from '../modules/department/department.routes';
import { EBl365Routes } from '../modules/ebl365/ebl365.routes';
import { EblAgentRoutes } from '../modules/eblAgent/eblAgent.routes';
import { EblBranchRoutes } from '../modules/eblBranch/eblBranch.routes';
import { EblSubBranchRoutes } from '../modules/eblSubBranch/eblSubBranch.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { ViewerRoutes } from '../modules/viewer/viewer.routes';

const routes = express.Router();
const moduleRoutes = [
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
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/viewers',
    route: ViewerRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
