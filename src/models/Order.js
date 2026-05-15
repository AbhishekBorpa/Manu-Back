import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    name: String,
    email: String
  },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Refunded'],
    default: 'Unpaid'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
