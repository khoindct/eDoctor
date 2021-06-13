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
