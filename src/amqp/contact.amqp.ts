import * as Amqp from "amqplib/callback_api";

export class ContactAMQP {

    private url: string = 'amqp://localhost';

    public sendData (data: any, queueName: string) {
        Amqp.connect(this.url, (err, conn) => {
            if(err) {
                console.log(err);
            } else {
                var message = JSON.stringify(data);
                conn.createChannel((err, ch) => {
                    if(err) {
                        console.log(err);
                    } else {
                        ch.assertQueue(queueName, { durable: false });
                        ch.sendToQueue(queueName, Buffer.from(message));
                    }
                });
                setTimeout(() => conn.close(), 500);
            }
        });
    }
}