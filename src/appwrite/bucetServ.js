import Environment from "../environment/Environment";
import { Client, Storage, ID } from "appwrite";

export class BucketServise {
  bucketClient = new Client();
  bucket;
  constructor() {
    this.bucketClient
      .setEndpoint(Environment.endpointUrl)
      .setProject(Environment.projectId);
    this.bucket = new Storage(this.bucketClient);
  }

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        Environment.bucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: Bucket :: uploadImage :: ", error)
    }
  }
  
  async deleteImage(fileId) {
    try {
      await this.bucket.deleteFile(Environment.bucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite :: Bucket :: deleteImage :: ", error)
    }
  }

  async getImagePreview(fileId) {
    const result= this.bucket.getFilePreview(
      Environment.bucketId,
      fileId
    );
    return result.href;
  }
}

const bucketService = new BucketServise();
export default bucketService;
