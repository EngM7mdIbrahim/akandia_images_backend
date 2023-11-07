import { Document, Model, Schema, model } from "mongoose";
import {Password} from "../../utils/password";

//TODO: 'Change attributes of the user here!'
export interface IUser {
  email: string;
 password: string;
 last_login?: Date;
}

//TODO: 'Change attributes of the user here!'
export interface IUserDoc extends Document {
  email: string;
 password: string;
 last_login?: Date;
}

interface IUserModel extends Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

//TODO: 'Change attributes of the user here!'
const userSchema = new Schema<IUserDoc, IUserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: {
      transform: function (_, ret) {
        ret.uid = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.iat;
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async function(done){
  if(this.isModified('password')){
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword)
  }
  done();
})

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = model("User", userSchema);

export { User };
