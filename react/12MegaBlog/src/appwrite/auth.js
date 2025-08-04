import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    //this method can fail also so using try-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.logIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async isLoggedIn() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401 || error.message.includes('missing scope (account)')) {
        console.log("Appwrite service :: isLoggedIn :: No authenticated user found.");
    } else {
        console.error("Appwrite service :: isLoggedIn :: An unexpected error occurred:", error);
    }
    }
    return null;
  }
  async logOut() {
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        console.log('appwrite service::Logout::errpr',error);
        
    }
  }
}
const authService = new AuthService();
export default authService;
//these all methoda can be accesed using . operation on authService 