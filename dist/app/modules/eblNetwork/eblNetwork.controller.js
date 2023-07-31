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
exports.EblNetworkController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const eblNetwork_service_1 = require("./eblNetwork.service");
const createBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { eblBranch } = _a, networkData = __rest(_a, ["eblBranch"]);
    const result = yield eblNetwork_service_1.EblNetworkService.createBranch(eblBranch, networkData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `branch created successfully`,
        data: result,
    });
}));
const createSubBranch = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { eblSubBranch } = _b, networkData = __rest(_b, ["eblSubBranch"]);
    const result = yield eblNetwork_service_1.EblNetworkService.createSubBranch(eblSubBranch, networkData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `sub branch created successfully`,
        data: result,
    });
}));
const createAgent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.body, { eblAgent } = _c, networkData = __rest(_c, ["eblAgent"]);
    const result = yield eblNetwork_service_1.EblNetworkService.createAgent(eblAgent, networkData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `agent created successfully`,
        data: result,
    });
}));
const create365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _d = req.body, { ebl365 } = _d, networkData = __rest(_d, ["ebl365"]);
    const result = yield eblNetwork_service_1.EblNetworkService.create365(ebl365, networkData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `365 created successfully`,
        data: result,
    });
}));
const getAllNetworks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eblNetwork_service_1.EblNetworkService.getAllNetworks();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `All networks fetched successfully`,
        data: result,
    });
}));
exports.EblNetworkController = {
    createBranch,
    createSubBranch,
    createAgent,
    create365,
    getAllNetworks,
};
