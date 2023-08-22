"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblBranchController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationField_1 = require("../../../constants/paginationField");
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interface/pick"));
const eblBranch_constant_1 = require("./eblBranch.constant");
const eblBranch_service_1 = require("./eblBranch.service");
const createBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchData = req.body;
    const result = yield eblBranch_service_1.EblBranchService.createBranch(branchData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Branch created successfully !',
        data: result,
    });
}));
const getAllBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, eblBranch_constant_1.branchFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationField_1.paginationFields);
    const result = yield eblBranch_service_1.EblBranchService.getAllBranch(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Branches retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield eblBranch_service_1.EblBranchService.getSingleBranch(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'branch retrieved successfully !',
        data: result,
    });
}));
const updateBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield eblBranch_service_1.EblBranchService.updateBranch(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'branch updated successfully !',
        data: result,
    });
}));
const deleteBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield eblBranch_service_1.EblBranchService.deleteBranch(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'branch deleted successfully !',
        data: result,
    });
}));
exports.EblBranchController = {
    createBranch,
    getAllBranch,
    getSingleBranch,
    updateBranch,
    deleteBranch,
};
