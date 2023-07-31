"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblNetwork = void 0;
const mongoose_1 = require("mongoose");
const EblNetworkSchema = new mongoose_1.Schema({
    networkId: {
        type: String,
        unique: true,
    },
    type: {
        type: String,
        enum: ['eblBranch', 'eblSubBranch', 'eblAgent', 'ebl365'],
        required: true,
    },
    eblBranch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'EblBranch',
    },
    eblSubBranch: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'EblSubBranch',
    },
    eblAgent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'EblAgent',
    },
    ebl365: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ebl365',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.EblNetwork = (0, mongoose_1.model)('EblNetwork', EblNetworkSchema);
