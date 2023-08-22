"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const department_controller_1 = require("./department.controller");
const department_validation_1 = require("./department.validation");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.default)(department_validation_1.DepartmentValidation.createDepartmentZodSchema), department_controller_1.DepartmentController.createDepartment);
router.get('/:id', department_controller_1.DepartmentController.getSingleDepartment);
router.patch('/:id', (0, validateRequest_1.default)(department_validation_1.DepartmentValidation.updateDepartmentZodSchema), department_controller_1.DepartmentController.updateDepartment);
router.delete('/:id', department_controller_1.DepartmentController.deleteDepartment);
router.get('/', department_controller_1.DepartmentController.getAllDepartment);
exports.DepartmentRoutes = router;
