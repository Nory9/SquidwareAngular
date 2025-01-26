export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    favorite_burger?: string; 
    total_spent: DoubleRange;
    vip_status: Boolean
  }
  