"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CharacterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
    _rarity: { type: String, required: true, enum: ['5', '4'] },
    weapon: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true },
});
CharacterSchema.virtual('url').get(function () {
    return `/characters/${this.id}`;
});
CharacterSchema.virtual('rarity').get(function () {
    return `${this._rarity} star`;
});
CharacterSchema.virtual('imgName').get(function () {
    let url = '';
    const nameArray = this.name.split(' ');
    if (nameArray.length < 2)
        url = this.name.toLowerCase();
    url = nameArray.map((word) => word.toLowerCase()).join('_');
    return url;
});
const Character = mongoose_1.default.model('Character', CharacterSchema);
exports.default = Character;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcmFjdGVyTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2NoYXJhY3Rlck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQTBEO0FBRTFELE1BQU0sTUFBTSxHQUFHLGtCQUFRLENBQUMsTUFBTSxDQUFDO0FBRS9CLE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDO0lBQ2pDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0QyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDN0MsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN0RSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0lBQzNELE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Q0FDdkUsQ0FBQyxDQUFDO0FBRUgsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakMsT0FBTyxlQUFlLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3BDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxPQUFPLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNyQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUMsQ0FBQztBQVFILE1BQU0sU0FBUyxHQUFHLGtCQUFRLENBQUMsS0FBSyxDQUFpQixXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFFL0Usa0JBQWUsU0FBUyxDQUFDIn0=