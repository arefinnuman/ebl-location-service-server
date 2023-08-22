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
exports.Ebl365Service = void 0;
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const constant_function_1 = require("../../../constants/constant.function");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const ebl365_constant_1 = require("./ebl365.constant ");
const ebl365_model_1 = require("./ebl365.model");
const createEbl365 = (eblBranch) => __awaiter(void 0, void 0, void 0, function* () {
    eblBranch.networkId = (0, constant_function_1.generateRandom4DigitNumber)();
    const newBranch = yield ebl365_model_1.Ebl365.create(eblBranch);
    return newBranch;
});
const getAllEbl365 = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: ebl365_constant_1.ebl365SearchableFields.map(field => ({
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
    const result = yield ebl365_model_1.Ebl365.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield ebl365_model_1.Ebl365.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleEbl365 = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    return result;
});
const updateEbl365 = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Ebl365 not found !');
    }
    const ebl365Data = __rest(payload, []);
    const updatedEbl365Data = Object.assign({}, ebl365Data);
    const result = yield ebl365_model_1.Ebl365.findOneAndUpdate({ _id: id }, updatedEbl365Data, {
        new: true,
    });
    return result;
});
const deleteEbl365 = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Ebl 365 Booth is not found !');
    }
    const result = yield ebl365_model_1.Ebl365.findByIdAndDelete(id, { new: true });
    return result;
});
exports.Ebl365Service = {
    getAllEbl365,
    getSingleEbl365,
    updateEbl365,
    deleteEbl365,
    createEbl365,
};
