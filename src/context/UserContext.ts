import { createRegisteredContext } from "react-singleton-context";

export enum Roles {
  Admin = "admin",
  Developer = "developer",
}

export interface IUserContext {
  loading: boolean;
  user?: {
    id: string;
    email?: string;
    roles?: Record<Roles, boolean>;
  };
}

export const UserContext = createRegisteredContext<IUserContext>(
  "UserContext",
  {
    loading: true,
  }
);
