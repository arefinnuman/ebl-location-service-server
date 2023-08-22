"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblBranch = void 0;
const mongoose_1 = require("mongoose");
const EblBranchSchema = new mongoose_1.Schema({
    networkId: {
        type: String,
        required: true,
        unique: true,
    },
    branchName: {
        type: String,
        required: true,
        unique: true,
    },
    branchCode: {
        type: String,
    },
    branchDivision: {
        type: String,
        required: true,
    },
    branchAddress: {
        type: String,
        required: true,
    },
    branchMapLink: {
        type: String,
    },
    branchImage: {
        type: String,
    },
    branchLocation: {
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
exports.EblBranch = (0, mongoose_1.model)('EblBranch', EblBranchSchema);
