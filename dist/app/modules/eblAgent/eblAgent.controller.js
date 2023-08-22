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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblAgentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationField_1 = require("../../../constants/paginationField");
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interface/pick"));
const eblAgent_constant_1 = require("./eblAgent.constant");
const eblAgent_service_1 = require("./eblAgent.service");
const createEblAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const result = yield eblAgent_service_1.EblAgentService.createAgent(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Agent Created Successfully`,
        data: result,
    });
}));
const getAllAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, eblAgent_constant_1.agentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationField_1.paginationFields);
    const result = yield eblAgent_service_1.EblAgentService.getAllAgent(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ebl agent retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield eblAgent_service_1.EblAgentService.getSingleAgent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ebl agent retrieved successfully !',
        data: result,
    });
}));
const updateAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield eblAgent_service_1.EblAgentService.updateAgent(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ebl agent updated successfully !',
        data: result,
    });
}));
const deleteAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield eblAgent_service_1.EblAgentService.deleteAgent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ebl agent deleted successfully !',
        data: result,
    });
}));
exports.EblAgentController = {
    getAllAgent,
    getSingleAgent,
    updateAgent,
    deleteAgent,
    createEblAgent,
};
