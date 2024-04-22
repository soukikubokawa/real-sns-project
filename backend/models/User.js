const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        profilePicture: {
            type: String,
            default: ""
        },
        coverPicture: {
            type: String,
            default: ""
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            max: 70
        },
        city: {
            type:String
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3]
        }
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);