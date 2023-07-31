"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblNetworkRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const eblNetwork_controller_1 = require("./eblNetwork.controller");
const eblNetwork_validation_1 = require("./eblNetwork.validation");
const router = express_1.default.Router();
router.post('/create-branch', (0, validateRequest_1.default)(eblNetwork_validation_1.EblNetworkValidation.createBranchZodSchema), eblNetwork_controller_1.EblNetworkController.createBranch);
router.post('/create-sub-branch', (0, validateRequest_1.default)(eblNetwork_validation_1.EblNetworkValidation.createSubBranchZodSchema), eblNetwork_controller_1.EblNetworkController.createSubBranch);
router.post('/create-agent', (0, validateRequest_1.default)(eblNetwork_validation_1.EblNetworkValidation.createAgentZodSchema), eblNetwork_controller_1.EblNetworkController.createAgent);
router.post('/create-365', (0, validateRequest_1.default)(eblNetwork_validation_1.EblNetworkValidation.create365ZodSchema), eblNetwork_controller_1.EblNetworkController.create365);
router.get('/', eblNetwork_controller_1.EblNetworkController.getAllNetworks);
exports.EblNetworkRoutes = router;
