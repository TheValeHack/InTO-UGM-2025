import mongoose from 'mongoose';

const VoucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  type: { type: String, enum: ['nominal', 'percentage'], required: true }, // nominal atau percentage
  valid_until: { type: Date, required: true },
  max_usage: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Voucher || mongoose.model('Voucher', VoucherSchema);
