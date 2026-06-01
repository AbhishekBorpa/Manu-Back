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
  alternatePhone: {
    type: String,
    trim: true,
    default: ''
  },
  
  /* 🔥 KYC FIELDS */
  gstNumber: {
    type: String,
    default: ''
  },
  businessRegistrationNumber: {
    type: String,
    default: ''
  },
  aadharNumber: {
    type: String,
    default: ''
  },
  panNumber: {
    type: String,
    default: ''
  },
  gstDoc: {
    type: String,
    default: ''
  },
  businessRegDoc: {
    type: String,
    default: ''
  },
  aadharDoc: {
    type: String,
    default: ''
  },
  panDoc: {
    type: String,
    default: ''
  },
  kycSubmittedAt: {
    type: Date
  },

  verificationStatus: {
    type: String,
    enum: ['Not Submitted', 'Pending', 'Verified', 'Rejected'],
    default: 'Not Submitted'
  },
  
  plan: {
    type: String,
    enum: ['Free', 'Basic', 'Premium', 'Elite'],
    default: 'Free'
  },

  isBlocked: {
    type: Boolean,
    default: false
  },

  subscriptionExpiry: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('PartnerProfile', partnerProfileSchema);
