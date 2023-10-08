"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VisionSchema = new Schema({
    _name: { type: String, required: true, lowercase: true },
    description: { type: String, required: true },
});
VisionSchema.virtual('url').get(function () {
    return `/visions/${this.id}`;
});
VisionSchema.virtual('name').get(function () {
    return `${this._name[0].toUpperCase()}${this._name.slice(1)}`;
});
const Vision = mongoose_1.default.model('Vision', VisionSchema);
exports.default = Vision;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaW9uTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL3Zpc2lvbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQzlCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ3hELFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtDQUM5QyxDQUFDLENBQUM7QUFFSCxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM5QixPQUFPLFlBQVksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQy9CLENBQUMsQ0FBQyxDQUFDO0FBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQztBQU9ILE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFjLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUVuRSxrQkFBZSxNQUFNLENBQUMifQ==