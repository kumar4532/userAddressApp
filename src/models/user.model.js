import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    }]
}, {timestamps: true})

const User = mongoose.model("user", userSchema);

export default User;