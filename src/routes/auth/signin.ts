import { Request, Response, Router } from "express";
import { ROUTES } from "../../constants/routes";
import { body } from "express-validator";
import validationCheck from "../../middlewares/validation-check";
import { BadRequestError } from "../../errors/bad-request-error";
import { IUserDoc, User } from "../../models/User/User";
import makeAccessToken from "../../utils/make-access-token";
import newUser from "../../models/User/operations/new-user";
import getUser from "../../models/User/operations/get-user";
import { Password } from "../../utils/password";
import updateUser from "../../models/User/operations/update-user";
import getAdmin from "../../models/Admin/operations/get-admin";

const signInProc = async (
  user: IUserDoc,
  password: string
): Promise<boolean> => {
  return await Password.compare(user.password, password);
};

const signUpProc = async (
  email: string,
  password: string
): Promise<IUserDoc> => {
  return await newUser({ email, password });
};

const assignAccessToken = async (
  user: IUserDoc,
  req: Request
): Promise<string> => {
  user.last_login = new Date();
  await updateUser({ _id: user._id }, user);
  const token = makeAccessToken(user);
  return token;
};

const route = Router();

route.post(
  ROUTES.AUTH.EMAIL_SIGNIN,
  [
    body("email").isEmail().withMessage("Please enter a valid email!"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Please enter an 8 character password that contains an uppercase, lowercase and a symbol!"
      ),
  ],
  validationCheck,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let existingUser: IUserDoc | null = null;
    try {
      existingUser = await getUser({ email });
    } catch (e: any) {
      if (e instanceof BadRequestError) {
        existingUser = null;
      } else {
        throw e;
      }
    }

    if (existingUser) {
      const isSignedIn = await signInProc(existingUser, password);
      console.log("Entered!");
      if (!isSignedIn) {
        throw new BadRequestError("Invalid credentials submitted!");
      }
    } else {
      existingUser = await signUpProc(email, password);
    }
    const accessToken = await assignAccessToken(existingUser, req);
    const currentAdminDoc = await getAdmin({ uid: existingUser._id });
    console.log("user: ", existingUser);
    console.log("admin: ", currentAdminDoc);
    return res
      .status(200)
      .send({ accessToken, admin: currentAdminDoc?.toJSON() ?? null });
  }
);

export { route as emailSignIn };
