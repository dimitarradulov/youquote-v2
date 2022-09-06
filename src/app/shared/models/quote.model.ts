export interface Quote {
  id: string;
  author: string;
  authorImageUrl: string;
  content: string;
  createdAt: Date;
  creator?: string;
}
