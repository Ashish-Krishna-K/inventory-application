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
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const characters_js_1 = __importDefault(require("./routes/characters.js"));
const visions_js_1 = __importDefault(require("./routes/visions.js"));
const weapons_js_1 = __importDefault(require("./routes/weapons.js"));
const app = (0, express_1.default)();
const mongoDevDbUrl = process.env.MONGODB_URI;
// Connect to mongodb database.
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoDevDbUrl);
    }
    catch (error) {
        console.error(error);
    }
}))();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Set up rate limiter: maximum of twenty requests per minute
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
// setting up routes
app.use('/', index_js_1.default);
app.use('/characters', characters_js_1.default);
app.use('/visions', visions_js_1.default);
app.use('/weapons/', weapons_js_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFxRDtBQUNyRCxzREFBK0Q7QUFDL0QsZ0RBQXdCO0FBQ3hCLGtFQUF5QztBQUN6QyxvREFBNEI7QUFDNUIsd0RBQWdDO0FBQ2hDLDhEQUFzQztBQUN0QyxvREFBNEI7QUFDNUIsNEVBQTJDO0FBRTNDLGlFQUE0QztBQUM1QywyRUFBc0Q7QUFDdEQscUVBQWdEO0FBQ2hELHFFQUFnRDtBQUVoRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVksQ0FBQztBQUMvQywrQkFBK0I7QUFDL0IsQ0FBQyxHQUFTLEVBQUU7SUFDVixJQUFJO1FBQ0YsTUFBTSxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN2QztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QjtBQUNILENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztBQUVMLG9CQUFvQjtBQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRTlCLDZEQUE2RDtBQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFBLDRCQUFTLEVBQUM7SUFDeEIsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSTtJQUN2QixHQUFHLEVBQUUsRUFBRTtDQUNSLENBQUMsQ0FBQztBQUNILHFDQUFxQztBQUNyQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxnQkFBTSxHQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEscUJBQVcsR0FBRSxDQUFDLENBQUM7QUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsdUJBQVksR0FBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTlELG9CQUFvQjtBQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQkFBVyxDQUFDLENBQUM7QUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsdUJBQWdCLENBQUMsQ0FBQztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxvQkFBYSxDQUFDLENBQUM7QUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsb0JBQWEsQ0FBQyxDQUFDO0FBRXBDLHlDQUF5QztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQzlCLElBQUksQ0FBQyxJQUFBLHFCQUFXLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBYyxFQUFFLEdBQVksRUFBRSxHQUFhO0lBQzNELGtEQUFrRDtJQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFbkUsd0JBQXdCO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMifQ==