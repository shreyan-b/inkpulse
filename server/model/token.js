import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400 // 30 days
    }
});

const Token = mongoose.model('Token', tokenSchema);
export default Token;