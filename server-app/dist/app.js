"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
console.log(process.env.NODE_ENV);
dotenv_1.default.config({ path: path_1.default.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
app.get("*", (req, res) => res.end("testing routes"));
exports.default = app;
