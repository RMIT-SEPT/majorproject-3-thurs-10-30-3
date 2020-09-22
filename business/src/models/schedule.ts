import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new Schedule
interface ScheduleAttrs {
  userId: String;
  workerId: String;
  scheduledTime: String;
  serviceType: Array<any>;
  businessId:String;
  date: String;
}

// An interface that describes the properties
// that a Schedule Model has
interface ScheduleModel extends mongoose.Model<ScheduleDoc> {
  build(attrs: ScheduleAttrs): ScheduleDoc;
}

// An interface that describes the properties
// that a Schedule Document has
interface ScheduleDoc extends mongoose.Document {
  userId: String;
  workerId: String;
  scheduledTime: String;
  serviceType: Array<any>;
  businessId:String;
  date: String;
}

const scheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    workerId: {
      type: String,
      required: true
    },
    businessId: {
      type: String,
      required: true
    },
    scheduledTime: {
      type: String,
      required: true
    },
    serviceType: {
      type: Array,
      default: []
    },
    date: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        // ret.id = ret._id;
        // delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);


scheduleSchema.statics.build = (attrs: any) => {
  return new Schedule(attrs);
};

const Schedule = mongoose.model<ScheduleDoc, ScheduleModel>('Schedule', scheduleSchema);

export { Schedule };
