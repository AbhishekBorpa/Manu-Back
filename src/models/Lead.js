import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Unknown'
  },
  budget: {
    type: String,
    default: 'N/A'
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Negotiation', 'Converted', 'Lost', 'Nurturing'],
    default: 'New'
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Lead', leadSchema);
