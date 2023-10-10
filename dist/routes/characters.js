"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterController_1 = require("../controllers/characterController");
const router = express_1.default.Router();
// GET - A list of all characters.
router.get('/', characterController_1.allCharactersGet);
// GET - Create a new character form
router.get('/create', characterController_1.addCharacterGet);
// POST - Create a new character form
router.post('/create', characterController_1.addCharacterPost);
// GET - A single character details
router.get('/:id', characterController_1.singleCharacterGet);
// GET - Edit a particular character form
router.get('/:id/edit', characterController_1.editCharacterGet);
// POST - Edit a particular character form
router.post('/:id/edit', characterController_1.editCharacterPost);
// GET - Delete a particular character form
router.get('/:id/delete', characterController_1.deleteCharacterGet);
// POST - Delete a particular character form
router.post('/:id/delete', characterController_1.deleteCharacterPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvY2hhcmFjdGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5Qiw0RUFTNEM7QUFDNUMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxrQ0FBa0M7QUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsc0NBQWdCLENBQUMsQ0FBQztBQUVsQyxvQ0FBb0M7QUFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUscUNBQWUsQ0FBQyxDQUFDO0FBRXZDLHFDQUFxQztBQUNyQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQ0FBZ0IsQ0FBQyxDQUFDO0FBRXpDLG1DQUFtQztBQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSx3Q0FBa0IsQ0FBQyxDQUFDO0FBRXZDLHlDQUF5QztBQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxzQ0FBZ0IsQ0FBQyxDQUFDO0FBRTFDLDBDQUEwQztBQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSx1Q0FBaUIsQ0FBQyxDQUFDO0FBRTVDLDJDQUEyQztBQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx3Q0FBa0IsQ0FBQyxDQUFDO0FBRTlDLDRDQUE0QztBQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSx5Q0FBbUIsQ0FBQyxDQUFDO0FBRWhELGtCQUFlLE1BQU0sQ0FBQyJ9