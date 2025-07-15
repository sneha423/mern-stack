import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
export class DatabaseService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title,slug,content,featuredImage,status,userId}){
    try {
        return await this.database.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId})
    } catch (error) {
        console.log('appwrite service:: createPost::error',error);
        
    }
  }
  async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status})
    } catch (error) {
        console.log('appwrite service:: updatePost::error',error);
    }
  }
  async deletePost({slug}){
    try {
        await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        return true
    } catch (error) {
        console.log('appwrite service:: deletePost::error',error);
        return false
    }
  }
  async getPost(slug){
    try {
        return await this.database.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
    } catch (error) {
        console.log('appwrite service:: getPost::error',error);
    }
  }
  async allPosts(queries=[Query.equal('status','active')]){
    try {
        return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
    } catch (error) {
        console.log('appwrite service:: allPosts::error',error);
        return false
    }
  }
  //file upload method
  async uploadfile(file){
    try {
        return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
    } catch (error) {
        console.log('appwrite service:: uploadFile::error',error);
        return false
    }
  }
  async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
    } catch (error) {
        onsole.log('appwrite service:: deleteFile::error',error);
        return false
    }
  }
  getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
  }
}
const databaseService = new DatabaseService();
export default databaseService;
