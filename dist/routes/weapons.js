"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weaponController_1 = require("../controllers/weaponController");
const router = express_1.default.Router();
// GET - A list of all weapon types
router.get('/', weaponController_1.allWeaponsGet);
// GET - Create a new weapon type form
router.get('/create', weaponController_1.addWeaponGet);
// POST - Create a new weapon type form
router.post('/create', weaponController_1.addWeaponPost);
// GET - List of all characters for a single weapon type
router.get('/:id', weaponController_1.singleWeaponCharactersGet);
// GET - Edit a particular weapon type form
router.get('/:id/edit', weaponController_1.editWeaponGet);
// POST - Edit a particular weapon type form
router.post('/:id/edit', weaponController_1.editWeaponPost);
// GET - Delete a particular weapon type form
router.get('/:id/delete', weaponController_1.deleteWeaponGet);
// POST - Delete a particular weapon type form
router.post('/:id/delete', weaponController_1.deleteWeaponPost);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvd2VhcG9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QixzRUFTeUM7QUFDekMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0NBQWEsQ0FBQyxDQUFDO0FBRS9CLHNDQUFzQztBQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSwrQkFBWSxDQUFDLENBQUM7QUFFcEMsdUNBQXVDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdDQUFhLENBQUMsQ0FBQztBQUV0Qyx3REFBd0Q7QUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsNENBQXlCLENBQUMsQ0FBQztBQUU5QywyQ0FBMkM7QUFDM0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZ0NBQWEsQ0FBQyxDQUFDO0FBRXZDLDRDQUE0QztBQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxpQ0FBYyxDQUFDLENBQUM7QUFFekMsNkNBQTZDO0FBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGtDQUFlLENBQUMsQ0FBQztBQUUzQyw4Q0FBOEM7QUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsbUNBQWdCLENBQUMsQ0FBQztBQUU3QyxrQkFBZSxNQUFNLENBQUMifQ==