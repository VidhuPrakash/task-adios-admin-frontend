export interface UserData {
  id: string;
  email: string;
  name: string;
  password: string;
  role?: "1" | "2" | "3" | "junior" | "senior" | "manager";
  status: number;
  table: "admin" | "company" | "employee";
  companyId?: string | null;
  designation?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
