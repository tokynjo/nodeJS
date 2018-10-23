import * as mongoose from 'mongoose';
import { ContactSchema } from '../models/contact.model';
import { ContactAMQP } from '../amqp/contact.amqp';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactService {

    public saveContact (contact: any) {
        return new Promise((resolve, reject) => {
            Contact.create(contact, (err, createdContact) => {
                if(err)  {
                    reject(err.message);
                }
                else {
                    resolve(createdContact);
                }
            });
        });
    }

    public getContacts (idEntreprise: any) {
        return new Promise((resolve, reject) => {
            let criteria: any = {
                idEntreprise: idEntreprise
            };         
            Contact.find(criteria, (err, contacts) => {
                if(err) {
                    reject(err.message);
                }
                else {
                    resolve(contacts);
                }
            });
        });
    }

    public getContactById (id: any) {  
        return new Promise((resolve, reject) => {
            Contact.findById(id, (err, contact) => {
                if(err) {
                    reject(err.message);
                }
                else {
                    resolve(contact);
                }
            });
        });
    }

    public isContactExist(contact: any) {
        return new Promise((resolve, reject) => {
            let criteria: any = {
                idEntreprise: contact.idEntreprise,
                code: contact.code
            };         
            Contact.find(criteria, (err, contact) => {
                if(err)  {
                    reject(err.message);
                }
                if(contact[0]) {
                    reject('Le contact existe');
                }
                else {
                    resolve();
                }
            });
        });
    }

    public sendDataContact(type: string, contact: any) {
        return new Promise((resolve, reject) => {
            const params = (type === 'Create' ? null : { idEntreprise: contact.idEntreprise, code: contact.code });
            const data = { type: type, params: params, code: contact.code, email: contact.email,
                etat: contact.etat, nom: contact.nom, raisonSociale: contact.raisonSociale,
                adresse: contact.adresse, cp: contact.cp, ville: contact.ville, pays: contact.pays,
                idEntreprise: contact.idEntreprise
            };
            const contactRabbitMQ: ContactAMQP = new ContactAMQP();
            try {
                if(contact.type === 'Fournisseur') {
                    //contactRabbitMQ.sendData(data, 'contact_achat');
                }
                else {
                    contactRabbitMQ.sendData(data, 'contact_dev_vente');
                    contactRabbitMQ.sendData(data, 'contact_cmd_vente');
                    contactRabbitMQ.sendData(data, 'contact_fac_vente');
                    contactRabbitMQ.sendData(data, 'contact_bl_vente');
                }
                resolve((type === 'Create') ? 'Ajouté avec succès' : 'Modifié avec succès');
            } catch (ex) {
                reject('Echec d\'envoi de données');
            }
        });
    }

    public updateContact (id: any, contact: any) {
        return new Promise((resolve, reject) => {
            Contact.findById(id, (err, findContact) => {
                if(err) {
                    reject(err.message);
                } 
                if(findContact.code !== contact.code) {
                    // Code changed
                    let criteria: any = {
                        idEntreprise: contact.idEntreprise,
                        code: contact.code
                    };         
                    Contact.find(criteria, (err, findContact) => {
                        if(err)  {
                            reject(err.message);
                        }
                        if(findContact[0]) {
                            reject('Le contact existe');
                        }
                    });
                }
                Contact.findByIdAndUpdate(id, contact, { new: true }, (err, updatedContact) => {
                    if(err) {
                        reject(err.message);
                    } else {
                        resolve(updatedContact);
                    }
                });
            });
        });
    }

    public getContactByType(params: any) {  
        return new Promise((resolve, reject) => {
            let criteria: any = {
                idEntreprise: params.idEntreprise,
                type: params.type
            };         
            Contact.find(criteria, (err, contacts) => {
                if(err) {
                    reject(err.message);
                }
                else {
                    resolve(contacts);
                }
            });
        });
    }
    
}