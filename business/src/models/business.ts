import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new Business
interface BusinessAttrs {
  name: String;
  serviceType: String;
  serviceProvided: Array<any>;

}

// An interface that describes the properties
// that a Business Model has
interface BusinessModel extends mongoose.Model<BusinessDoc> {
  build(attrs: BusinessAttrs): BusinessDoc;
}

// An interface that describes the properties
// that a Business Document has
interface BusinessDoc extends mongoose.Document {
  name: String;
  serviceType: String;
  serviceProvided: Array<any>;
  schedules: Array<any>;
  history: Array<any>;
  workers: Array<any>;
  // admin: Array<any>;
}

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      required: true
    },
    serviceProvided: {
      type: Array,
      required: true
    },
    schedules: {
      type: Array,
      default: []
    },
    history: {
      type: Array,
      default: []
    },
    workers: {
      type: Array,
      default: []
    },
    // admin: {
    //   type: Array,
    //   default: []
    // }

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


businessSchema.statics.build = (attrs: BusinessAttrs) => {
  return new Business(attrs);
};

const Business = mongoose.model<BusinessDoc, BusinessModel>('Business', businessSchema);

export { Business };
