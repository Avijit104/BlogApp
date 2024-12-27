import Environment from "../environment/Environment";
import { Client, Account, ID } from "appwrite";

export class AuthServices {
  authClient = new Client();
  authAccount;

  constructor() {
    this.authClient.setEndpoint(Environment.endpointUrl).setProject(Environment.projectId);
    this.authAccount = new Account(this.authClient);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.authAccount.create(
        ID.unique(),
        name,
        email,
        password
      );
      if (userAccount) {
        //here we will be calling another method because we want to directly login after account creation
        this.authLogin({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async authLogin({ email, password }) {
    try {
      return await this.authAccount.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getUserAccount() {
    try {
      const userDetails = await this.authAccount.get();
      if (userDetails) {
        return userDetails;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite :: Auth :: getUserAccount :: ", error)
    }
  }
  async authLogout() {
    try {
      await this.authAccount.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authServices = new AuthServices();
export default authServices;
