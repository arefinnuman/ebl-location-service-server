"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblAgentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const eblAgent_controller_1 = require("./eblAgent.controller");
const router = express_1.default.Router();
router.get('/', eblAgent_controller_1.EblAgentController.getAllAgent);
router.get('/:id', eblAgent_controller_1.EblAgentController.getSingleAgent);
router.patch('/:id', eblAgent_controller_1.EblAgentController.updateAgent);
router.delete('/:id', eblAgent_controller_1.EblAgentController.deleteAgent);
exports.EblAgentRoutes = router;
