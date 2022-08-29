"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const getWords_1 = __importDefault(require("./controllers/getWords"));
const getRank_1 = __importDefault(require("./controllers/getRank"));
// Instantiating Express Instance
const app = (0, express_1.default)();
// Middlewares
// Using Body Parser
app.use(express_1.default.json());
// Managing CORS
app.use((0, cors_1.default)());
// Setting env variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`) });
// Logging Requests (Development Only)
(() => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'dev') {
        const { default: morgan } = yield Promise.resolve().then(() => __importStar(require('morgan')));
        app.use(morgan('dev'));
    }
    ;
}))();
// Setting Routes
app.get('/words', getWords_1.default);
app.post('/rank', getRank_1.default);
// Undefined Routes
app.get("*", (_, res) => res.status(404).end("Route Not Found"));
exports.default = app;
