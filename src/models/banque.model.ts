import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BanqueSchema = new Schema({
    nom: { 
        type: String, 
        required: true 
    },
    adresse: { 
        type: String
    },
    domiciliation: { 
        type: String, 
        required: true 
    },
    rib: { 
        type: String, 
        required: true 
    }
});