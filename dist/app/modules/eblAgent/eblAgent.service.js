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
exports.EblAgentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const eblNetwork_model_1 = require("../eblNetwork/eblNetwork.model");
const eblAgent_constant_1 = require("./eblAgent.constant");
const eblAgent_model_1 = require("./eblAgent.model");
const getAllAgent = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: eblAgent_constant_1.agentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield eblAgent_model_1.EblAgent.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield eblAgent_model_1.EblAgent.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAgent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eblAgent_model_1.EblAgent.findOne({ _id: id });
    return result;
});
const updateAgent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield eblAgent_model_1.EblAgent.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Agent not found !');
    }
    const AgentData = __rest(payload, []);
    const updatedAgentData = Object.assign({}, AgentData);
    const result = yield eblAgent_model_1.EblAgent.findOneAndUpdate({ _id: id }, updatedAgentData, {
        new: true,
    });
    return result;
});
const deleteAgent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield eblAgent_model_1.EblAgent.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Agent is not found !');
    }
    const networkId = isExist === null || isExist === void 0 ? void 0 : isExist.networkId;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const Agent = yield eblAgent_model_1.EblAgent.findOneAndDelete({ networkId });
        if (!Agent) {
            throw new apiError_1.default(404, 'failed to delete Agent');
        }
        yield eblNetwork_model_1.EblNetwork.deleteOne({ networkId });
        session.commitTransaction();
        session.endSession();
        return Agent;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.EblAgentService = {
    getAllAgent,
    getSingleAgent,
    updateAgent,
    deleteAgent,
};
