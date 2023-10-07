"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterController_1 = require("../controllers/characterController");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', characterController_1.allCharactersGet);
router.get('/create', characterController_1.addCharacterGet);
router.post('/create', characterController_1.addCharacterPost);
router.get('/:id', characterController_1.singleCharacterGet);
router.get('/:id/edit', characterController_1.editCharacterGet);
router.post('/:id/edit', characterController_1.editCharacterPost);
router.post('/:id/delete', characterController_1.deleteCharacterGet);
router.post('/:id/delete', characterController_1.deleteCharacterPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw0RUFTNEM7QUFDNUMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsc0NBQWdCLENBQUMsQ0FBQztBQUVsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxxQ0FBZSxDQUFDLENBQUM7QUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsc0NBQWdCLENBQUMsQ0FBQztBQUV6QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSx3Q0FBa0IsQ0FBQyxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLHNDQUFnQixDQUFDLENBQUM7QUFFMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsdUNBQWlCLENBQUMsQ0FBQztBQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSx3Q0FBa0IsQ0FBQyxDQUFDO0FBRS9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLHlDQUFtQixDQUFDLENBQUM7QUFFaEQsa0JBQWUsTUFBTSxDQUFDIn0=