import { Prop, Schema } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class User {
  @Prop({required: false})
  uid: string;

  @Prop({ required: false })
  phone: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  username:string;
  
  @Prop({default: () => Date.now().toString(12)})
  publicToken: string;
  
  @Prop({default: () => Date.now().toString(12) + Math.round((Date.now() / Math.random()*1000)).toString(12)})
  privateToken: string;
  
  @Prop({default: false})
  isBanned: boolean;
  
  @Prop({default: false})
  isVerified: boolean;

  @Prop({required: false})
  hash:string;
}