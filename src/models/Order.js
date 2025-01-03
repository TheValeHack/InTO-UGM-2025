import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  participant_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  voucher_code: { type: String },
  total_price: { type: Number, required: true },
  payment_status: { type: String, enum: ['pending', 'paid', 'canceled'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);