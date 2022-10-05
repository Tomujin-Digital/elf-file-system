import { Injectable } from '@nestjs/common';
import { S3 } from "aws-sdk";
import { existsSync, readFileSync, writeFile } from 'fs';

@Injectable()
export class AppService {
  constructor() {}
  private s3: S3;
  private appUrl: string;

  onApplicationBootstrap() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.appUrl = process.env.APP_URL || "http://localhost:3000";
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
      imgLink: `${this.appUrl}/read/${file.originalname}`,
      ...result
    };
  }

  async readFromS3(key: string) {
    const params = {
      Bucket: "imagesbucketo",
      Key: key,
    };
    const result = await this.s3.getObject(params).promise();
    
    // cache image
    writeFile(`cache/${key}`, Buffer.from(result.Body as Buffer), (err) => {
      if (err) {
        console.log(err);
      }
    });
  
    return result;
  }

  readFromLocal(key: string) {
    const isExist = existsSync(`cache/${key}`);
    if(!isExist) return false;
    
    const result = readFileSync(`cache/${key}`);
    return {
      Body: result,
    };
  }
}
