"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CharacterSchema = new Schema({
    _name: { type: String, required: true, lowercase: true },
    _rarity: { type: String, required: true, enum: ['5', '4'] },
    description: { type: String, required: true },
    vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
    weapon: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true },
    imgPath: { type: String, required: true },
});
CharacterSchema.virtual('url').get(function () {
    return `/characters/${this.id}`;
});
CharacterSchema.virtual('name').get(function () {
    return this._name
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
});
CharacterSchema.virtual('rarity').get(function () {
    return `${this._rarity} star`;
});
const Character = mongoose_1.default.model('Character', CharacterSchema);
exports.default = Character;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2NoYXJhY3Rlck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ2pDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ3hELE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDM0QsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQzdDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdEUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0RSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Q0FDMUMsQ0FBQyxDQUFDO0FBRUgsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakMsT0FBTyxlQUFlLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUs7U0FDZCxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxPQUFPLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFRSCxNQUFNLFNBQVMsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBaUIsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRS9FLGtCQUFlLFNBQVMsQ0FBQyJ9