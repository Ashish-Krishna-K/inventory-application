"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterController_1 = require("../controllers/characterController");
const router = express_1.default.Router();
router.get('/', characterController_1.allCharactersGet);
router.get('/create', characterController_1.addCharacterGet);
router.post('/create', characterController_1.addCharacterPost);
router.get('/:id', characterController_1.singleCharacterGet);
router.get('/:id/edit', characterController_1.editCharacterGet);
router.post('/:id/edit', characterController_1.editCharacterPost);
router.get('/:id/delete', characterController_1.deleteCharacterGet);
router.post('/:id/delete', characterController_1.deleteCharacterPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw0RUFTNEM7QUFDNUMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxzQ0FBZ0IsQ0FBQyxDQUFDO0FBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLHFDQUFlLENBQUMsQ0FBQztBQUV2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQ0FBZ0IsQ0FBQyxDQUFDO0FBRXpDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLHdDQUFrQixDQUFDLENBQUM7QUFFdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsc0NBQWdCLENBQUMsQ0FBQztBQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1Q0FBaUIsQ0FBQyxDQUFDO0FBRTVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLHdDQUFrQixDQUFDLENBQUM7QUFFOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUseUNBQW1CLENBQUMsQ0FBQztBQUVoRCxrQkFBZSxNQUFNLENBQUMifQ==