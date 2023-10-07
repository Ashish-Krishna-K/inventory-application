"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CharacterSchema = new Schema({
    name: { type: String, required: true },
    vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
    _rarity: { type: String, required: true, enum: ['5', '4'] },
    _weapon: { type: String, required: true, enum: ['BOW', 'CATALYST', 'CLAYMORE', 'SWORD', 'POLEARM'] },
});
CharacterSchema.virtual('url').get(function () {
    return `/character/${this.id}`;
});
CharacterSchema.virtual('rarity').get(function () {
    return `${this._rarity} star`;
});
CharacterSchema.virtual('weapon').get(function () {
    return `${this._weapon[0]}${this._weapon.slice(1).toLowerCase()}`;
});
const Character = mongoose_1.default.model('Character', CharacterSchema);
exports.default = Character;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2NoYXJhY3Rlck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ2pDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3RFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDM0QsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTtDQUNyRyxDQUFDLENBQUM7QUFFSCxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNqQyxPQUFPLGNBQWMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUgsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDcEMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLE9BQU8sQ0FBQztBQUNoQyxDQUFDLENBQUMsQ0FBQztBQUVILGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDcEUsQ0FBQyxDQUFDLENBQUM7QUFRSCxNQUFNLFNBQVMsR0FBRyxrQkFBUSxDQUFDLEtBQUssQ0FBaUIsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRS9FLGtCQUFlLFNBQVMsQ0FBQyJ9