'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const indexController_1 = require('../controllers/indexController');
const router = express_1.default.Router();
/* GET home page. */
router.get('/', indexController_1.indexGet);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLG9FQUEwRDtBQUMxRCxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhDLG9CQUFvQjtBQUNwQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSwwQkFBUSxDQUFDLENBQUM7QUFFMUIsa0JBQWUsTUFBTSxDQUFDIn0=
