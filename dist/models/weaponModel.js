"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const WeaponSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});
WeaponSchema.virtual('url').get(function () {
    return `/visions/${this.id}`;
});
const Weapon = mongoose_1.default.model('Weapon', WeaponSchema);
exports.default = Weapon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9uTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3dlYXBvbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQzlCLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Q0FDOUMsQ0FBQyxDQUFDO0FBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsT0FBTyxZQUFZLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQztBQU1ILE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFjLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVuRSxrQkFBZSxNQUFNLENBQUMifQ==