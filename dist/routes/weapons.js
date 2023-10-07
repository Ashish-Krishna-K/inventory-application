"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weaponController_1 = require("../controllers/weaponController");
const router = express_1.default.Router();
router.get('/', weaponController_1.allWeaponsGet);
router.get('/create', weaponController_1.addWeaponGet);
router.post('/create', weaponController_1.addWeaponPost);
router.get('/:id/edit', weaponController_1.editWeaponGet);
router.post('/:id/edit', weaponController_1.editWeaponPost);
router.post('/:id/delete', weaponController_1.deleteWeaponGet);
router.post('/:id/delete', weaponController_1.deleteWeaponPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvd2VhcG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixzRUFReUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQ0FBYSxDQUFDLENBQUM7QUFFL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsK0JBQVksQ0FBQyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQ0FBYSxDQUFDLENBQUM7QUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsaUNBQWMsQ0FBQyxDQUFDO0FBRXpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGtDQUFlLENBQUMsQ0FBQztBQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxtQ0FBZ0IsQ0FBQyxDQUFDO0FBQzdDLGtCQUFlLE1BQU0sQ0FBQyJ9