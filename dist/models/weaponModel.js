"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const WeaponSchema = new Schema({
    _name: { type: String, required: true, lowercase: true },
});
WeaponSchema.virtual('url').get(function () {
    return `/visions/${this.id}`;
});
WeaponSchema.virtual('name').get(function () {
    return `${this._name[0].toUpperCase()}${this._name.slice(1)}`;
});
const Weapon = mongoose_1.default.model('Weapon', WeaponSchema);
exports.default = Weapon;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhcG9uTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3dlYXBvbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQzlCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0NBQ3pELENBQUMsQ0FBQztBQUVILFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzlCLE9BQU8sWUFBWSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDQUFDO0FBT0gsTUFBTSxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxLQUFLLENBQWMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRW5FLGtCQUFlLE1BQU0sQ0FBQyJ9