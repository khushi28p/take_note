import { DefaultSession, DefaultUser } from "next-auth";

// This module extends NextAuth's built-in types to include the 'id' field
// on both the Session user object and the base User object.

declare module "next-auth" {
  // Extend the Session type
  interface Session {
    user: {
      id: string; // The ID from your database (Prisma User table)
    } & DefaultSession["user"]; // Inherit name, email, image properties
  }
  
  // Extend the User type (for the callback 'user' argument)
  interface User extends DefaultUser {
    id: string; // The ID from your database
  }
}
