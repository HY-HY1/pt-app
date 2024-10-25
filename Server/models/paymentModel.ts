import mongoose, { Schema, Document } from "mongoose";

interface PaymentModel extends Document {
    paymentId: string,
    stripeCustomerId: string, 
    customerId: string, 
    trainerId: string,
    amount: number,
    fee: number,
    trainerEarnings: number,
    status: "completed" | "pending" | "failed"
}

const paymentSchema: Schema = new Schema({
    paymentId: { type: String, unique: true },
    stripeCustomerId: { type: String },
    customerId: { type: String },
    trainerId: { type: String, required: true },
    amount: { type: Number, required: true },
    fee: { type: Number, required: true, default: 0.1 },
    trainerEarnings: {
        type: Number,
        required: true,
        default: function (this: PaymentModel) {
            return this.amount - (this.amount * this.fee);
        }
    },
    status: {
        type: String,
        enum: ["completed", "pending", "failed"],
        required: true
    }
});

const PaymentModel = mongoose.model<PaymentModel>("Payment", paymentSchema);
export default PaymentModel;
