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
