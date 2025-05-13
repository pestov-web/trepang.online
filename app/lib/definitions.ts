export type Good = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  discount: number | null;
  wbUrl: string | null;
  ozonUrl: string | null;
  images: { url: string }[] | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

interface FormProps {
  goods: {
    images: { id: number; url: string; productId: number }[];
    id: number;
    name: string;
    description: string | null;
    wbUrl: string | null;
    ozonUrl: string | null;
    price: number;
    discount: number | null;
    createdAt: Date;
  }[];
}
