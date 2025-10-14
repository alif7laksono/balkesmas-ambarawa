import { Document, Types } from "mongoose";

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
  image: string;
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

export interface UpdateNewsData {
  title: string;
  content: string;
  category: string;
  eventDate: Date;
  slug?: string;
  status?: string;
  image?: string;
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
  excerpt: string;
  image: string;
  slug: string;
  createdAt: string;
  eventDate: Date;
  category: {
    _id: string;
    name: string;
  };
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
  news: {
    _id: string;
    title: string;
    content: string;
    image: string;
    category?: { _id: string; name: string };
    createdAt: string;
    eventDate: Date;
  }[];
};

export interface NewsQuery {
  status: string;
  title?: { $regex: string; $options: string };
  category?: string;
}
