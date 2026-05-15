import mongoose from 'mongoose';

const partnerInventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  price: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('PartnerInventory', partnerInventorySchema);
