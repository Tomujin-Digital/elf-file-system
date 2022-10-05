import { Controller, Get, Param, Post, Render, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express"
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: "hello",
    };
  }

  @Get("read/:key")
  async getFile(@Response() res:any, @Param("key") key: string) {
    const fileFromS3 = await this.appService.readFromS3(key);

    // convert to image response
    res.set("Content-Type", "image/jpeg");
    return res.send(fileFromS3.Body);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadToS3(file);
  }
}