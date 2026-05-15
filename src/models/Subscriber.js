import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Unsubscribed'],
    default: 'Active'
  }
}, {
  timestamps: true
});

export default mongoose.model('Subscriber', subscriberSchema);
