import { Document } from 'mongoose';

export interface User extends Document {
  createDate: Date;
  updateDate: Date;
  email: string;
  hash: string;
  firstname?: string;
  lastname?: string;
}

export interface BookMark extends Document {
  createDate: Date;
  updateDate: Date;
  title: string;
  description?: string;
  link: string;
}
