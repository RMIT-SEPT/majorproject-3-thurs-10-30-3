import { Message, Stan } from 'node-nats-streaming';
import { User } from '../../models/user'
interface Event {
    subject: string;
    data: any;
}

export class ScheduleCanceledListener {
    private client: Stan;
    private subject: string;
    private queueGroupName: string;
    private ackWait: number;

    constructor(client: Stan) {
        this.client = client;
        this.subject = 'schedule:canceled';
        this.queueGroupName = "auth-service-queue-group";
        this.ackWait = 5 * 1000;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }

    async onMessage(data: any, msg: Message) {
        const user = await User.findById(data.userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.schedules = user?.schedules.filter((s, index) => {
            if (JSON.stringify(s._id) === JSON.stringify(data.scheduleId)) {
                return false
            } else {
                return true
            }
        })

        await user.save()

        msg.ack();
    }
}
