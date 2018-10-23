import * as mongoose from 'mongoose';
import { BanqueSchema } from './banque.model';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    idEntreprise: { 
        type: Number, 
        required: true 
    },
    code: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    etat: { 
        type: String, 
        required: true 
    },
    statut: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String
    },
    civilite: {
        type: String   
    },
    nom: {
        type: String    
    },
    prenom: {
        type: String   
    },
    tel: {
        type: String 
    },
    fax: {
        type: String   
    },
    adresse: {
        type: String   
    },
    ville: {
        type: String   
    },
    cp: {
        type: String   
    },
    pays: {
        type: String   
    },
    siret: {
        type: String   
    },
    siteWeb: {
        type: String   
    },
    modeReglement: {
        type: String   
    },
    raisonSociale: {
        type: String   
    },
    banques: [
        BanqueSchema
    ],
    createdBy: {
        type: Number,
        required: true
    },
    updatedBy: {
        type: Number
    }
});