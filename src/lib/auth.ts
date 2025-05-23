import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
      usernameValidator: (username) => {
        // Empêcher certains usernames réservés
        const reserved = ['admin', 'root', 'api', 'www', 'mail', 'support'];
        if (reserved.includes(username.toLowerCase())) {
          return false;
        }
        // Seuls les caractères alphanumériques, underscores et points sont autorisés
        return /^[a-zA-Z0-9_.]+$/.test(username);
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ],
  advanced: {
    database: {
      useNumberId: true, // Utiliser des IDs numériques au lieu d'UUIDs
    },
  },
}); 