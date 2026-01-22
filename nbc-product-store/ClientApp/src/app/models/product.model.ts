export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export interface RetrieveProductsListResponse {
  statusCode: string;
  statusDescription: string;
  products: Product[];
}