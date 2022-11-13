import { Controller, Get, Post } from "@nestjs/common";

@Controller("user")
export class UserController {
  constructor() { }

  @Post("auth/login")
  async login() {
    
  }

  @Post("auth/register")
  async register() {

  }

  @Post("auth/logout")
  async logout() {
  
  }

  @Post("auth/verify")
  async verify() {
  
  }


  @Get("me")
  async me() {

  }

}