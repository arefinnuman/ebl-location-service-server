"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.ViewerService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const employee_constant_1 = require("../../../constants/employee.constant");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const user_model_1 = require("../user/user.model");
const viewer_model_1 = require("./viewer.model");
const getAllViewers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: employee_constant_1.employeeSearchableFields.map(field => ({
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
    const result = yield viewer_model_1.Viewer.find(whereConditions)
        .populate('department')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield viewer_model_1.Viewer.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleViewer = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield viewer_model_1.Viewer.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Viewer not found !');
    }
    const result = yield viewer_model_1.Viewer.findOne({ employeeId }).populate('department');
    return result;
});
const updateViewer = (employeeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield viewer_model_1.Viewer.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Viewer not found !');
    }
    const { fullName } = payload, ViewerData = __rest(payload, ["fullName"]);
    const updatedViewerData = Object.assign({}, ViewerData);
    if (fullName && Object.keys(fullName).length > 0) {
        Object.keys(fullName).forEach(key => {
            const nameKey = `fullName.${key}`;
            updatedViewerData[nameKey] =
                fullName[key];
        });
    }
    const result = yield viewer_model_1.Viewer.findOneAndUpdate({ employeeId }, updatedViewerData, {
        new: true,
    });
    return result;
});
const deleteViewer = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield viewer_model_1.Viewer.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Viewer not found !');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const viewer = yield viewer_model_1.Viewer.findOneAndDelete({ employeeId });
        if (!viewer) {
            throw new apiError_1.default(404, 'Failed to delete Viewer');
        }
        yield user_model_1.User.deleteOne({ employeeId });
        session.commitTransaction();
        session.endSession();
        return viewer;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
exports.ViewerService = {
    getAllViewers,
    getSingleViewer,
    updateViewer,
    deleteViewer,
};
