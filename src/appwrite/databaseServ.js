import Environment from "../environment/Environment";
import { Client, Databases, Query } from "appwrite";

export class DatabaseServices {
  dataClient = new Client();
  database;

  constructor() {
    this.dataClient.setEndpoint(Environment.endpointUrl).setProject(Environment.projectId);
    this.database = new Databases(this.dataClient);
  }

  async createBlog({ title, content, image, status, userid, slug }) {
    try {
      return await this.database.createDocument(
        Environment.databaseId,
        Environment.collectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("Appwrite :: Database :: createBlog :: ", error)
    }
  }

  async updateBlog(slug, { title, content, image, status, userid }) {
    try {
      return await this.database.updateDocument(
        Environment.databaseId,
        Environment.collectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("Appwrite :: Database :: updateBlog :: ", error)
    }
  }

  async deleteBlog(slug) {
    try {
      this.database.deleteDocument(Environment.databaseId, Environment.collectionId, slug);
      return true;
    } catch (error) {
      console.log("Appwrite :: Database :: deleteBlog :: ", error)
      return false;
    }
  }

  async getBlog(slug) {
    try {
      return await this.database.getDocument(
        Environment.databaseId,
        Environment.collectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: Database :: getBlog :: ", error)
    }
  }

  async listBlog(querise = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        Environment.databaseId,
        Environment.collectionId,
        querise
      );
    } catch (error) {
      console.log("Appwrite :: Database :: listBlog :: ", error)
    }
  }
}

const databaseServices = new DatabaseServices();
export default databaseServices;
