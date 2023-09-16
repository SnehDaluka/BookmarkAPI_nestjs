import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  createdate: {
    required: true,
    type: Date,
    default: Date.now,
  },
  updatedate: {
    required: true,
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  hash: {
    type: String,
    required: [true, 'Password is required'],
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
});

export const BookMarkSchema = new mongoose.Schema(
  {
    createdate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    updatedate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Link is required'],
      trim: true,
    },
  },
);
