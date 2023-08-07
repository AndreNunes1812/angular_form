export interface Cliente {
  id?: number;
  cliente: string;
  created_at?: string;
  updated_at?: string;
  endereco?: [{ endereco: string; numero: string; bairro: string }];
}
