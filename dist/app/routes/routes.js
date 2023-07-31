"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ebl365_routes_1 = require("../modules/ebl365/ebl365.routes");
const eblAgent_routes_1 = require("../modules/eblAgent/eblAgent.routes");
const eblBranch_routes_1 = require("../modules/eblBranch/eblBranch.routes");
const eblNetwork_routes_1 = require("../modules/eblNetwork/eblNetwork.routes");
const eblSubBranch_routes_1 = require("../modules/eblSubBranch/eblSubBranch.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/ebl-networks',
        route: eblNetwork_routes_1.EblNetworkRoutes,
    },
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
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
