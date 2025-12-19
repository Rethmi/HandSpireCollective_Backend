// import mongoose, { Document, Schema } from "mongoose"

// export enum Role {
//   ADMIN = "ADMIN",
//   AUTHOR = "AUTHOR",
//   USER = "USER"
// }

// export enum Status {
//   NONE = "NONE",
//   PENDING = "PENDING",
//   APPROVED = "APPROVED",
//   REJECTED = "REJECTED"
// }

// export interface IUSER extends Document {
//   _id: mongoose.Types.ObjectId
//   firstname?: string
//   lastname?: string
//   email: string
//   password: string
//   roles: Role[]
//   approved: Status
// }

// const userSchema = new Schema<IUSER>({
//   email: { type: String, unique: true, lowercase: true, required: true },
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   password: { type: String, required: true },
//   roles: { type: [String], enum: Object.values(Role), default: [Role.USER] },
//   approved: {
//     type: String,
//     enum: Object.values(Status),
//     default: Status.NONE
//   }
// })

// export const User = mongoose.model<IUSER>("User", userSchema)


import mongoose from "mongoose";

const userModel = new mongoose.Schema(

    {
        "id": {
            type: String,
            unique: true,
            index: true,
            default: function() {
                const timestamp = Date.now().toString();
                const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
                return `USER_${timestamp}_${random}`;
            }
        },
        "firstName": {
            required: true,
            type: String
        },
        "lastName": {
            required: true,
            type: String
        },
        "email": {
            required: true,
            type: String
        },
        "password": {
            required: true,
            type: String
        },
        "role": {
            required: true,
            type: String,
        },
    }
);

const User = mongoose.model('User', userModel);
export default User;