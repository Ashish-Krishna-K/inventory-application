"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_js_1.default);
app.use('/users', users_js_1.default);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhEQUFxRDtBQUNyRCxzREFBK0Q7QUFDL0QsZ0RBQXdCO0FBQ3hCLGtFQUF5QztBQUN6QyxvREFBNEI7QUFFNUIsaUVBQTRDO0FBQzVDLGlFQUE0QztBQUU1QyxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QixvQkFBb0I7QUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUU5QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsZ0JBQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV4RCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrQkFBVyxDQUFDLENBQUM7QUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBRS9CLHlDQUF5QztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQzlCLElBQUksQ0FBQyxJQUFBLHFCQUFXLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILGdCQUFnQjtBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBYyxFQUFFLEdBQVksRUFBRSxHQUFhO0lBQzNELGtEQUFrRDtJQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFbkUsd0JBQXdCO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMifQ==