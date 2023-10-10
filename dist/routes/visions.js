"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visionController_1 = require("../controllers/visionController");
const router = express_1.default.Router();
// GET - A list of all visions
router.get('/', visionController_1.allVisionsGet);
// GET - Create a new vision form
router.get('/create', visionController_1.addVisionGet);
// POST - Create a new vision form
router.post('/create', visionController_1.addVisionPost);
// GET - All characters with a particular vision
router.get('/:id', visionController_1.singleVisionCharactersGet);
// GET - Edit a particular vision form
router.get('/:id/edit', visionController_1.editVisionGet);
// POST - Edit a particular vision form
router.post('/:id/edit', visionController_1.editVisionPost);
// GET - Delete a particular vision form
router.get('/:id/delete', visionController_1.deleteVisionGet);
// POST - Delete a particular vision form
router.post('/:id/delete', visionController_1.deleteVisionPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdmlzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixzRUFTeUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyw4QkFBOEI7QUFDOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0NBQWEsQ0FBQyxDQUFDO0FBRS9CLGlDQUFpQztBQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwrQkFBWSxDQUFDLENBQUM7QUFFcEMsa0NBQWtDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV0QyxnREFBZ0Q7QUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsNENBQXlCLENBQUMsQ0FBQztBQUU5QyxzQ0FBc0M7QUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZ0NBQWEsQ0FBQyxDQUFDO0FBRXZDLHVDQUF1QztBQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQ0FBYyxDQUFDLENBQUM7QUFFekMsd0NBQXdDO0FBQ3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGtDQUFlLENBQUMsQ0FBQztBQUUzQyx5Q0FBeUM7QUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsbUNBQWdCLENBQUMsQ0FBQztBQUU3QyxrQkFBZSxNQUFNLENBQUMifQ==