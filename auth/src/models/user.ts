import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  name:string;
  password: string;
  address: string;
  phone: string;
  role: string;
  shift: string;
  businessId: string;
  days: Array<any>;
  // schedules: Array<any>;
  // history: Array<any>;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  name:string;
  password: string;
  address: string;
  phone: string;
  role: string;
  shift: string;
  businessId: string;
  schedules: Array<any>;
  history: Array<any>;
  days: Array<any>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    shift: {
      type: String
    },
    businessId: { type: String, default: "" },
    schedules: { type: Array, default:[] },
    history: { type: Array, default:[] },
    days: { type: Array, default:[] }
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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
