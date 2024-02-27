const mongoose=require('mongoose');
const AccountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // Index on userId
    },
    balance: {
        type: Number,
        required: true,
        default: 0, // Default value for balance
        validate: {
            validator: (value) => value >= 0, // Validate that balance is non-negative
            message: 'Balance must be non-negative',
        },
    },
});

// Middleware to set a default balance before saving
AccountSchema.pre('save', function (next) {
    if (!this.balance) {
        this.balance = 0;
    }
    next();
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = { Account };
