export interface HomeData {
  id?: string;
  title?: string;
  description?: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}
