"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblSubBranch = void 0;
const mongoose_1 = require("mongoose");
const EblSubBranchSchema = new mongoose_1.Schema({
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
    subBranchName: {
        type: String,
        required: true,
    },
    subBranchCode: {
        type: String,
    },
    subBranchDivision: {
        type: String,
        required: true,
    },
    subBranchAddress: {
        type: String,
        required: true,
    },
    subBranchMapLink: {
        type: String,
        required: true,
    },
    subBranchLocation: {
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
exports.EblSubBranch = (0, mongoose_1.model)('EblSubBranch', EblSubBranchSchema);
