import mongoose, { connect } from "mongoose";
import { kMaxLength } from "node:buffer";

const userSchema = new mongoose.Schema({
    connectCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
})

export default mongoose.model("User", userSchema)