import mongoose from 'mongoose';

const partnerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Rejected'],
    default: 'Pending'
  },
  plan: {
    type: String,
    enum: ['Free', 'Basic', 'Premium', 'Elite'],
    default: 'Free'
  }
}, {
  timestamps: true
});

export default mongoose.model('PartnerProfile', partnerProfileSchema);
