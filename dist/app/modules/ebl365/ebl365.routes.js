"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBl365Routes = void 0;
const express_1 = __importDefault(require("express"));
const ebl365_controller_1 = require("./ebl365.controller");
const router = express_1.default.Router();
router.get('/', ebl365_controller_1.Ebl365Controller.getAllEbl365);
router.get('/:id', ebl365_controller_1.Ebl365Controller.getSingleEbl365);
router.patch('/:id', ebl365_controller_1.Ebl365Controller.updateEbl365);
router.delete('/:id', ebl365_controller_1.Ebl365Controller.deleteEbl365);
exports.EBl365Routes = router;
