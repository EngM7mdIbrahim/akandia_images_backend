import { User } from "../models/User/User";

export default async function flushDatabase(){
  await User.deleteMany();
}