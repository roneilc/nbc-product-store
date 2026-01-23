export interface CartRequest {
  productId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
}

export interface RetrieveCartResponse {
  statusCode: string;
  statusDescription: string;
  items?: CartItem[];
}
