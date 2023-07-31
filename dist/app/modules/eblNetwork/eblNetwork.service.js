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
exports.EblNetworkService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const ebl365_model_1 = require("../ebl365/ebl365.model");
const eblAgent_model_1 = require("../eblAgent/eblAgent.model");
const eblBranch_model_1 = require("../eblBranch/eblBranch.model");
const eblSubBranch_model_1 = require("../eblSubBranch/eblSubBranch.model");
const eblNetwork_model_1 = require("./eblNetwork.model");
const createBranch = (eblBranch, network) => __awaiter(void 0, void 0, void 0, function* () {
    network.type = 'eblBranch';
    let newData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        eblBranch.networkId = network.networkId;
        const newBranch = yield eblBranch_model_1.EblBranch.create([eblBranch], { session });
        if (!newBranch.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create customer');
        }
        network.eblBranch = newBranch[0]._id;
        const newNetwork = yield eblNetwork_model_1.EblNetwork.create([network], { session });
        if (!newNetwork.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newData = newNetwork[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newData = yield eblNetwork_model_1.EblNetwork.findOne({
        networkId: newData.networkId,
    }).populate('eblBranch');
    return newData;
});
const createSubBranch = (eblSubBranch, network) => __awaiter(void 0, void 0, void 0, function* () {
    network.type = 'eblSubBranch';
    let newData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        eblSubBranch.networkId = network.networkId;
        const newSubBranch = yield eblSubBranch_model_1.EblSubBranch.create([eblSubBranch], { session });
        if (!newSubBranch.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create customer');
        }
        network.eblSubBranch = newSubBranch[0]._id;
        const newNetwork = yield eblNetwork_model_1.EblNetwork.create([network], { session });
        if (!newNetwork.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newData = newNetwork[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newData = yield eblNetwork_model_1.EblNetwork.findOne({
        networkId: newData.networkId,
    }).populate('eblSubBranch');
    return newData;
});
const createAgent = (eblAgent, network) => __awaiter(void 0, void 0, void 0, function* () {
    network.type = 'eblAgent';
    let newData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        eblAgent.networkId = network.networkId;
        const newAgent = yield eblAgent_model_1.EblAgent.create([eblAgent], { session });
        if (!newAgent.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create agent');
        }
        network.eblAgent = newAgent[0]._id;
        const newNetwork = yield eblNetwork_model_1.EblNetwork.create([network], { session });
        if (!newNetwork.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newData = newNetwork[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newData = yield eblNetwork_model_1.EblNetwork.findOne({
        networkId: newData.networkId,
    }).populate('eblAgent');
    return newData;
});
const create365 = (ebl365, network) => __awaiter(void 0, void 0, void 0, function* () {
    network.type = 'ebl365';
    let newData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        ebl365.networkId = network.networkId;
        const new365 = yield ebl365_model_1.Ebl365.create([ebl365], { session });
        if (!new365.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create customer');
        }
        network.ebl365 = new365[0]._id;
        const newNetwork = yield eblNetwork_model_1.EblNetwork.create([network], { session });
        if (!newNetwork.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newData = newNetwork[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    newData = yield eblNetwork_model_1.EblNetwork.findOne({
        networkId: newData.networkId,
    }).populate('ebl365');
    return newData;
});
const getAllNetworks = () => __awaiter(void 0, void 0, void 0, function* () {
    const networks = yield eblNetwork_model_1.EblNetwork.find()
        .populate('eblAgent')
        .populate('eblBranch')
        .populate('eblSubBranch')
        .populate('ebl365');
    return networks;
});
exports.EblNetworkService = {
    createBranch,
    createSubBranch,
    createAgent,
    create365,
    getAllNetworks,
};
