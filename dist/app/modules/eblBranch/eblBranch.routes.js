"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblBranchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const eblBranch_controller_1 = require("./eblBranch.controller");
const router = express_1.default.Router();
router.post('/', eblBranch_controller_1.EblBranchController.createBranch);
router.get('/', eblBranch_controller_1.EblBranchController.getAllBranch);
router.get('/:id', eblBranch_controller_1.EblBranchController.getSingleBranch);
router.patch('/:id', eblBranch_controller_1.EblBranchController.updateBranch);
router.delete('/:id', eblBranch_controller_1.EblBranchController.deleteBranch);
exports.EblBranchRoutes = router;
