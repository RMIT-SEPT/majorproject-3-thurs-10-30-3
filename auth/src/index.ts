import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { ScheduleCreatedListener } from './common/events/schedule-created-listener'
import { ScheduleCanceledListener } from './common/events/schedule-canceled-listener'

const MONGO_URL = 'mongodb+srv://gpgx8nell:1256ahdk@samshop.e9sdx.mongodb.net/sept'
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    // Read enviromental variables
    var NATS_CLUSTER_ID = process.env.NATS_CLUSTER_ID
    var NATS_CLIENT_ID = process.env.NATS_CLIENT_ID
    var NATS_URL = process.env.NATS_URL

    // Connect to nats streaming service
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      NATS_CLIENT_ID,
      NATS_URL
    );

    // Abort connection upon app close.
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // Enable listeners
    new ScheduleCreatedListener(natsWrapper.client).listen();
    new ScheduleCanceledListener(natsWrapper.client).listen();

    // Connect database
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  // Start listening
  app.listen(3000, () => {
    console.log('Auth service listening on port 3000!');
  });
};

start();
