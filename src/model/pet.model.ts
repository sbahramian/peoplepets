import mongoose from "mongoose";

export interface PetDocument extends mongoose.Document {
    name: string;
    type: string;
    color: string;
    isOwner: Boolean;
    ownerID: string;
}

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Pet name is required.'],
            unique: true,
            trim: true
        },
        type: {
            type: String,
            required: [true, 'Pet type is required.'],
            trim: true
        },
        color: {
            type: String,
            required: [true, 'Pet coloe is required.'],
            unique: false
        },
        isOwner: {
            type: Boolean,
            default: false
        },
        ownerID: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const Pet = mongoose.model<PetDocument>("Pet", PetSchema);

export default Pet;
