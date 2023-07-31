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
exports.Ebl365Controller = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interface/pick"));
const paginationField_1 = require("../../constants/paginationField");
const ebl365_constant_1 = require("./ebl365.constant ");
const ebl365_service_1 = require("./ebl365.service");
const getAllEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ebl365_constant_1.ebl365FilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationField_1.paginationFields);
    const result = yield ebl365_service_1.Ebl365Service.getAllEbl365(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'EBl365 booths retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ebl365_service_1.Ebl365Service.getSingleEbl365(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Ebl365 booth retrieved successfully !',
        data: result,
    });
}));
const updateEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield ebl365_service_1.Ebl365Service.updateEbl365(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Ebl365 booth updated successfully !',
        data: result,
    });
}));
const deleteEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield ebl365_service_1.Ebl365Service.deleteEbl365(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Ebl365 booth deleted successfully !',
        data: result,
    });
}));
exports.Ebl365Controller = {
    getAllEbl365,
    getSingleEbl365,
    updateEbl365,
    deleteEbl365,
};
