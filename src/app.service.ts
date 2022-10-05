import { Injectable } from '@nestjs/common';
import { S3 } from "aws-sdk";

@Injectable()
export class AppService {
  constructor() {}
  private s3: S3;

  onApplicationBootstrap() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async uploadToS3(file: Express.Multer.File) {
    // upload to S3
    const params = {
      Bucket: "imagesbucketo",
      Key: file.originalname,
      Body: file.buffer,
    };
    let result = await this.s3.upload(params).promise();
  
    return {
      imgLink: `http://localhost:3000/read/${file.originalname}`,
      ...result
    };
  }

  async readFromS3(key: string) {
    const params = {
      Bucket: "imagesbucketo",
      Key: key,
    };
    const result = await this.s3.getObject(params).promise();
    return result;
  }
}
