"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const api_1 = __importDefault(require("./routes/api"));
// Create an Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)()); // Enable CORS
app.use(body_parser_1.default.json()); // Parse JSON request bodies
// Route
app.use('/api', api_1.default);
// Set port
const PORT = process.env.PORT || 3000;
app.set('port', PORT);
// Connect to the database then start the server
(0, db_1.default)().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
