import mongoose from "mongoose";

export interface PeopleDocument extends mongoose.Document {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    address: string;
    frinds: Array<string>;
    pets: Array<string>;
}

const PeopleSchema = new mongoose.Schema({
        firstname: {
            type: String, 
            required: true, 
            unique: false
        },
        lastname: {
            type: String, 
            required: true, 
            unique: false
        },
        phoneNumber: {
            type: String, 
            required: true, 
            unique: true
        },
        address: {
            type: String, 
            required: true, 
            unique: false
        },
        frinds: {
            type: Array,
            default: []
        },
        pets: {
            type: Array,
            default: []
        }
    }, 
    {
        timestamps: true
    }
);

const People = mongoose.model<PeopleDocument>("People", PeopleSchema);

export default People;