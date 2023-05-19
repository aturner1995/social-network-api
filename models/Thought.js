const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reactions');
const dateFormat = require('date-format');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function() {
                return dateFormat('yyyy-MM-dd hh:mm:ss', this._createdAt);
            },
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        // Configuration options
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
