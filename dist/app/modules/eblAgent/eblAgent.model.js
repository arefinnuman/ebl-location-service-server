"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblAgent = void 0;
const mongoose_1 = require("mongoose");
const EblAgentSchema = new mongoose_1.Schema({
    networkId: {
        type: String,
        required: true,
        unique: true,
    },
    serialNo: {
        type: String,
        required: true,
        unique: true,
    },
    agentName: {
        type: String,
        required: true,
    },
    agentCode: {
        type: String,
    },
    agentDivision: {
        type: String,
        required: true,
    },
    agentAddress: {
        type: String,
        required: true,
    },
    agentMapLink: {
        type: String,
        required: true,
    },
    agentLocation: {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        },
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.EblAgent = (0, mongoose_1.model)('EblAgent', EblAgentSchema);
