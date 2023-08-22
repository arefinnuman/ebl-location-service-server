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
exports.EblBranchService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const constant_function_1 = require("../../../constants/constant.function");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const eblBranch_constant_1 = require("./eblBranch.constant");
const eblBranch_model_1 = require("./eblBranch.model");
const createBranch = (eblBranch) => __awaiter(void 0, void 0, void 0, function* () {
    eblBranch.networkId = (0, constant_function_1.generateRandom4DigitNumber)();
    const newBranch = yield eblBranch_model_1.EblBranch.create(eblBranch);
    return newBranch;
});
const getAllBranch = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: eblBranch_constant_1.branchSearchableFields.map(field => ({
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
    const result = yield eblBranch_model_1.EblBranch.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield eblBranch_model_1.EblBranch.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBranch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield eblBranch_model_1.EblBranch.findOne({ _id: id });
    return result;
});
const updateBranch = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield eblBranch_model_1.EblBranch.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Branch not found !');
    }
    const branchData = __rest(payload, []);
    const updatedBranchData = Object.assign({}, branchData);
    const result = yield eblBranch_model_1.EblBranch.findOneAndUpdate({ _id: id }, updatedBranchData, {
        new: true,
    });
    return result;
});
const deleteBranch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield eblBranch_model_1.EblBranch.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'branch is not found !');
    }
    const result = yield eblBranch_model_1.EblBranch.findByIdAndDelete(id, { new: true });
    return result;
});
exports.EblBranchService = {
    createBranch,
    getAllBranch,
    getSingleBranch,
    updateBranch,
    deleteBranch,
};
