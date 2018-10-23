import { ContactController } from '../controllers/contact.controller';

export class ContactRoute {  

    private contactController: ContactController = new ContactController();

    public routes(app): void {
        
        app.route('/contact_api/contacts/all/:idEntreprise')
        .get(this.contactController.getContactsAction) // Get all contacts
        
        app.route('/contact_api/contacts')
        .post(this.contactController.saveContactAction); // Add new contact

        app.route('/contact_api/contacts/:id')
        .get(this.contactController.getContactByIdAction) // Get specific contact 
        .put(this.contactController.updateContactAction) // Update contact

        app.route('/contact_api/contacts/:idEntreprise/:type')
        .get(this.contactController.getContactByTypeAction); // Get specific contact by type

    }
}