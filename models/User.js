const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // Username field
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // Email field
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    // Use a regular expression to validate the email format
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
                },
                message: 'Email validation failed'
            }
        },
        // Thoughts field (array of references to 'thought' documents)
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        // Friends field (array of references to other 'user' documents)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        // Configuration options
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual getter for friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = model('user', userSchema);
