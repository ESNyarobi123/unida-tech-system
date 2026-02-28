export type Role = "VISITOR" | "EMPLOYEE" | "ADMIN";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: Role;
};
