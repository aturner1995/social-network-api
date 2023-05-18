const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reactions');
const dateFormat = require('dateformat');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 15,
            maxLength: 500,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp, "dddd, mmmm, yyyy, h:MM:ss TT")
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
            virtuals: true,
        },
        id: false,
    }

);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

module.exports = model('thought', thoughtSchema);