"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visionController_1 = require("../controllers/visionController");
const router = express_1.default.Router();
router.get('/', visionController_1.allVisionsGet);
router.get('/create', visionController_1.addVisionGet);
router.post('/create', visionController_1.addVisionPost);
router.get('/:id/edit', visionController_1.editVisionGet);
router.post('/:id/edit', visionController_1.editVisionPost);
router.post('/:id/delete', visionController_1.deleteVisionGet);
router.post('/:id/delete', visionController_1.deleteVisionPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdmlzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixzRUFReUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQ0FBYSxDQUFDLENBQUM7QUFFL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsK0JBQVksQ0FBQyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQ0FBYSxDQUFDLENBQUM7QUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsaUNBQWMsQ0FBQyxDQUFDO0FBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGtDQUFlLENBQUMsQ0FBQztBQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxtQ0FBZ0IsQ0FBQyxDQUFDO0FBRTdDLGtCQUFlLE1BQU0sQ0FBQyJ9