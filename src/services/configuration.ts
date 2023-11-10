import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

enum Status {
  "active",
}

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }: {
    title: string;
    slug: string;
    content: string;
    status: Status;
    featuredImage: string;
    userId: string;
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite :: createPost :: Error", error);
    }
  }

  async updatePost(
    slug: string,
    {
      title,
      content,
      featuredImage,
      status,
    }: {
      title: string;
      content: string;
      status: Status;
      featuredImage: string;
    }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite :: updatePost :: Error", error);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: Error", error);
      return false;
    }
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite :: getPost :: Error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", Status.active)]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite :: getPosts :: Error", error);
    }
  }

  //   file upload services

  // * This method returns the storage id
  //   The method requires the file blob itself
  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite :: uploadFile :: Error", error);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite :: deleteFile :: Error", error);
    }
  }

  getPreviewFile(fileId: string) {
    try {
      this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite :: getPreviewFile :: Error", error);
    }
  }
}

const service = new Service();
export default service;
