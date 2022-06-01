const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pw: {
        type: String,
        required: true,
    },
    subscription: {
        type: Boolean
    },
});

module.exports = mongoose.model("user", UserSchema);

