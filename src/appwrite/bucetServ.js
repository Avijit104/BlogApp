import Environment from "../environment/Environment";
import { Client, Storage, ID } from "appwrite";

export class BucketServise {
  bucketClient = new Client();
  bucket;
  constructor() {
    this.bucketClient.setEndpoint(Environment.endpointUrl).setProject(Environment.projectId);
    this.bucket = new Storage(this.bucketClient);
  }

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(Environment.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }
  async deleteImage(fileId) {
    try {
      await this.bucket.deleteFile(Environment.bucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getImagePreview(fileId) {
    return await this.bucket.getFilePreview(Environment.bucketId, fileId);
  }
}

const bucketServise = new BucketServise();
export default bucketServise;