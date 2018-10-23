import { Request, Response } from 'express';
import { ContactService } from '../services/contact.service';
import { ToolsService } from '../services/tools.service';

export class ContactController {

    public saveContactAction (req: Request, res: Response) {
        const contactService: ContactService = new ContactService();
        const toolsService: ToolsService = new ToolsService();
        const contact = toolsService.trimObj(req.body);
        contactService.isContactExist(contact)
        .then(() => contactService.saveContact(contact))
        .then(() => contactService.sendDataContact('Create', contact))
        .then((message) => res.json({ message: message }) )
        .catch((err) => res.status(422).send({ error: err }));
    }

    public updateContactAction (req: Request, res: Response) {
        const contactService: ContactService = new ContactService();
        const toolsService: ToolsService = new ToolsService();
        const contact = toolsService.trimObj(req.body);
        contactService.updateContact(req.params.id, contact)
        .then(() => contactService.sendDataContact('Update', contact))
        .then((message) => res.json({ message: message }) )
        .catch((err) => res.status(422).send({ error: err }));
        
    }

    public getContactsAction (req: Request, res: Response) {
        const contactService: ContactService = new ContactService();
        contactService.getContacts(req.params.idEntreprise)
        .then((contacts) => res.json(contacts))
        .catch((err) => res.status(422).send({ error: err }));
    }

    public getContactByIdAction (req: Request, res: Response) {  
        const contactService: ContactService = new ContactService();
        contactService.getContactById(req.params.id)
        .then((contact) => res.json(contact))
        .catch((err) => res.status(422).send({ error: err }));
    }

    public getContactByTypeAction (req: Request, res: Response) {  
        const contactService: ContactService = new ContactService();
        contactService.getContactByType(req.params)
        .then((contacts) => res.json(contacts))
        .catch((err) => res.status(422).send({ error: err }));
    }
    
}