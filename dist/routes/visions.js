'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const visionController_1 = require('../controllers/visionController');
const router = express_1.default.Router();
router.get('/', visionController_1.allVisionsGet);
router.get('/create', visionController_1.addVisionGet);
router.post('/create', visionController_1.addVisionPost);
router.get('/:id', visionController_1.singleVisionCharactersGet);
router.get('/:id/edit', visionController_1.editVisionGet);
router.post('/:id/edit', visionController_1.editVisionPost);
router.get('/:id/delete', visionController_1.deleteVisionGet);
router.post('/:id/delete', visionController_1.deleteVisionPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvdmlzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixzRUFTeUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQ0FBYSxDQUFDLENBQUM7QUFFL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsK0JBQVksQ0FBQyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSw0Q0FBeUIsQ0FBQyxDQUFDO0FBRTlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQ0FBYyxDQUFDLENBQUM7QUFFekMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsa0NBQWUsQ0FBQyxDQUFDO0FBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLG1DQUFnQixDQUFDLENBQUM7QUFFN0Msa0JBQWUsTUFBTSxDQUFDIn0=
