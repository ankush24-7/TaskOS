const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        read: {
            type: Boolean,
            default: false
        },
        metadata: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Notification', notificationSchema);