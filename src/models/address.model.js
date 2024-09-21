import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;

// import mongoose from "mongoose";
// const addressSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     street: {
//         type: String
//     },
//     city: {
//         type: String
//     },
//     state: {
//         type: String
//     },
//     zipCode: {
//         type: Number
//     },
// }, {timestamps: true})

// const Address = mongoose.model("address", addressSchema);

// export default Address;