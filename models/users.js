import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Corrected import

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tasks: [{
        title: String,
        description: String,
        completed: Boolean,
        createdAt: Date,
    }],
    verified: {
        type: Boolean,
        default: false,
    },
    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp:Number,
    resetPasswordOtpExpiry:Date,
});

// Pre-save hook to hash password before saving the user
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to generate JWT token
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password)
};

userSchema.index({otp_expiry:1},{expireAfterSeconds:0})

export const User = mongoose.model("User", userSchema);
