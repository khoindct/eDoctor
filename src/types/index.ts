export interface IUser {
  _id: string;
  name: string;
  phone: string;
  role?: string;
  avatar: {
    url: string;
    filename: string;
  };
  email: string;
}

export interface IClinicDetail {
  coverImage: {
    url: string;
    filename: string;
  };
  name: string;
  email: string;
  address: string;
  description: string;
  phone: string;
  coordinates: number[];
}

export interface IReply {
  _id: string;
  reply: string;
  user: IUser;
}

export interface IReview {
  _id: string;
  rating: number;
  review: string;
  replies: IReply[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
