const { Schema, Types } = require('mongoose');
const dateFormat = require('date-format');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function() {
                return dateFormat('yyyy-MM-dd hh:mm:ss', this._createdAt);
            },
        },
    },
    {
        // Configuration options
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;