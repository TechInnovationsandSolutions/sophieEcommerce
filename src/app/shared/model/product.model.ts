import { ICategory } from './category.model';

export interface ITag {
  id: number;
  name: string;
}

export interface IComment {
  name: string;
  comment?: string;
  rate?: number;
}

export interface IReview {
  id?: number;
  name: string;
  comment?: string;
  rating?: number;
  created_at?: Date;
  canEdit?: boolean;
  onEdit?: boolean;
}

export interface IProdImage {
  url?: string;
  thumbnail?: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  description?: string;
  excerpt?: string;
  cost?: number;
  reduced_cost?: number;
  discount?: string;
  createdOn?: string;
  lastUpdate?: string;
  ratings?: IReview[];
  tags?: ITag[];
  avg_rating?: number;
  images?: IProdImage[];
  quantity?: number;
}
