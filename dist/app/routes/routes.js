"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const department_routes_1 = require("../modules/department/department.routes");
const ebl365_routes_1 = require("../modules/ebl365/ebl365.routes");
const eblAgent_routes_1 = require("../modules/eblAgent/eblAgent.routes");
const eblBranch_routes_1 = require("../modules/eblBranch/eblBranch.routes");
const eblSubBranch_routes_1 = require("../modules/eblSubBranch/eblSubBranch.routes");
const user_routes_1 = require("../modules/user/user.routes");
const viewer_routes_1 = require("../modules/viewer/viewer.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/ebl-branches',
        route: eblBranch_routes_1.EblBranchRoutes,
    },
    {
        path: '/ebl-sub-branches',
        route: eblSubBranch_routes_1.EblSubBranchRoutes,
    },
    {
        path: '/ebl-agents',
        route: eblAgent_routes_1.EblAgentRoutes,
    },
    {
        path: '/ebl-365',
        route: ebl365_routes_1.EBl365Routes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/viewers',
        route: viewer_routes_1.ViewerRoutes,
    },
    {
        path: '/departments',
        route: department_routes_1.DepartmentRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
