// app/utils/news.ts

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
