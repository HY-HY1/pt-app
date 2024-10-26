import mongoose, {Schema, Document} from "mongoose";

const trainerSchema: Schema = new Schema({
    userId: { type: String, required: true, unique: true},
    onboardingId: { type: String}
})