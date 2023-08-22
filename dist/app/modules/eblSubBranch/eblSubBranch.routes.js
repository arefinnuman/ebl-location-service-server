"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblSubBranchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const eblSubBranch_controller_1 = require("./eblSubBranch.controller");
const router = express_1.default.Router();
router.post('/', eblSubBranch_controller_1.EblSubBranchController.createSubBranch);
router.get('/', eblSubBranch_controller_1.EblSubBranchController.getAllSubBranch);
router.get('/:id', eblSubBranch_controller_1.EblSubBranchController.getSingleSubBranch);
router.patch('/:id', eblSubBranch_controller_1.EblSubBranchController.updateSubBranch);
router.delete('/:id', eblSubBranch_controller_1.EblSubBranchController.deleteSubBranch);
exports.EblSubBranchRoutes = router;
