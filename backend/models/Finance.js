const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },

    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Finance', financeSchema);