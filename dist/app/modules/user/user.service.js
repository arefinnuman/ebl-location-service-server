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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config/config"));
const employee_constant_1 = require("../../../constants/employee.constant");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const user_model_1 = require("../user/user.model");
const createAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_password.admin;
    }
    user.employeeId = 'DB-' + user.employeeCardNumber;
    user.role = 'admin';
    const newAdmin = yield user_model_1.User.create(user);
    return newAdmin;
});
const createViewer = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_password.admin;
    }
    user.employeeId = 'DB-' + user.employeeCardNumber;
    const newUser = yield user_model_1.User.create(user);
    return newUser;
});
const getAllUser = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOne({ employeeId });
    return result;
});
const updateUser = (employeeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const { fullName } = payload, UserData = __rest(payload, ["fullName"]);
    const updatedUserData = Object.assign({}, UserData);
    if (fullName && Object.keys(fullName).length > 0) {
        Object.keys(fullName).forEach(key => {
            const nameKey = `fullName.${key}`;
            updatedUserData[nameKey] =
                fullName[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ employeeId }, updatedUserData, {
        new: true,
    });
    return result;
});
const deleteUser = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ employeeId });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOneAndDelete({ employeeId });
    return result;
});
const updateToAdmin = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ employeeId });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ employeeId }, { role: 'admin' }, {
        new: true,
    });
    return result;
});
const updateToViewer = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ employeeId });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ employeeId }, { role: 'viewer' }, {
        new: true,
    });
    return result;
});
const approvedByAdmin = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ employeeId: employeeId });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ employeeId }, { approvedByAdmin: true }, {
        new: true,
    });
    return result;
});
const rejectedByAdmin = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ employeeId });
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user not found !');
    }
    const result = yield user_model_1.User.findOneAndDelete({ employeeId });
    return result;
});
const createUserByAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_password.admin;
    }
    user.employeeId = 'DB-' + user.employeeCardNumber;
    user.approvedByAdmin = true;
    const newUser = yield user_model_1.User.create(user);
    return newUser;
});
exports.UserService = {
    createAdmin,
    createViewer,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    updateToAdmin,
    updateToViewer,
    approvedByAdmin,
    rejectedByAdmin,
    createUserByAdmin,
};
