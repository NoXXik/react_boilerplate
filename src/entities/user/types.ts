export type UserRole = 'admin' | 'manager' | 'user' | string;

export type User = {
  id: string | number;
  email: string;
  name: string;
  role: UserRole;
};

