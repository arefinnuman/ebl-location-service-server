"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const viewer_controller_1 = require("./viewer.controller");
const viewer_validation_1 = require("./viewer.validation");
const router = express_1.default.Router();
router.get('/:id', viewer_controller_1.ViewerController.getSingleViewer);
router.patch('/:id', (0, validateRequest_1.default)(viewer_validation_1.ViewerValidation.updateViewer), viewer_controller_1.ViewerController.updateViewer);
router.delete('/:id', viewer_controller_1.ViewerController.deleteViewer);
router.get('/', viewer_controller_1.ViewerController.getAllViewers);
exports.ViewerRoutes = router;
