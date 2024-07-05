export interface User {
  id: string;
  email: string;
  emailConstraint?: string;
  emailVerified: number;
  enabled: number;
  federationLink?: string;
  firstName?: string;
  lastName?: string;
  realmId?: string;
  username: string;
  createdTimestamp?: number;
  serviceAccountClientLink?: string;
  notBefore: number;
}
