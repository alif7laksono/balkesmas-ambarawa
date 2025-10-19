// app/utils/types.ts

import { Document, Types } from "mongoose";

// ✅ Base Interfaces
export interface ICategory extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INews extends Document {
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  imageKey?: string;
  slug: string;
  status: "draft" | "published" | "archived";
  metaTitle?: string;
  metaDescription?: string;
  date: Date;
  eventDate: Date;
  category: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Extended Interfaces
export interface NewsDocument extends INews {
  _id: Types.ObjectId;
}

export interface NewsLean {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  imageKey?: string; // ✅ Optional
  image?: string; // ✅ Tambahkan untuk data existing
  slug: string;
  status: "draft" | "published" | "archived";
  metaTitle?: string;
  metaDescription?: string;
  date: string;
  eventDate: string;
  category: {
    _id: string;
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface UpdateNewsData {
  title: string;
  content: string;
  category: string;
  eventDate: Date;
  slug?: string;
  status?: string;
  image?: string;
  imageKey?: string;
  excerpt?: string;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  imageKey: string;
  image?: string;
  slug: string;
  createdAt: string;
  eventDate: Date;
  category: {
    _id: string;
    name: string;
  };
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export type NewsType = News;

export interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageKey: string;
  slug: string;
  createdAt: string;
  eventDate: Date;
  category?: string;
  readTime?: number;
  views?: number;
}

export interface NavLink {
  name: string;
  href: string;
  subLinks?: NavLink[];
}

export interface TestResult {
  success: boolean;
  service?: string;
  error?: string;
  timestamp?: string;
  details?: TestDetails;
}

export interface TestDetails {
  database?: string;
  host?: string;
  port?: number;
  collections?: string[];
  version?: string;
  storageEngine?: string;
  bucket?: string;
  region?: string;
  endpoint?: string;
  buckets?: string[];
  mongodb?: TestSubResult;
  s3?: TestSubResult;
  newsCrud?: TestSubResult;
  categories?: TestSubResult;
  debug?: {
    endpointConfigured?: boolean;
    bucketConfigured?: boolean;
    accessKeyConfigured?: boolean;
    secretKeyConfigured?: boolean;
  };
}

export interface TestSubResult {
  success: boolean;
  error?: string;
  count?: number;
  sample?: string;
}

export type NewsProps = {
  news: News[];
};

export interface NewsQuery {
  status: string;
  title?: { $regex: string; $options: string };
  category?: string;
}

// ✅ Type untuk hasil Mongoose lean()
export type NewsLeanResult = {
  _id: Types.ObjectId;
  title: string;
  content: string;
  excerpt: string;
  imageKey?: string; // ✅ Optional
  image?: string; // ✅ Untuk data existing
  slug: string;
  status: "draft" | "published" | "archived";
  metaTitle?: string;
  metaDescription?: string;
  date: Date;
  eventDate: Date;
  category: {
    _id: Types.ObjectId;
    name: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
};
