// import "dotenv/config";
// import { defineConfig, env } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
//   migrations: {
//     path: "prisma/migrations",
//     seed: "prisma/seed.ts",
//   },
//   datasource: {
//     url: env("NEXT_PUBLIC_DATABASE_URL"),
//   },
// });


import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // provider: 'postgresql',
    url: process.env.DATABASE_URL!,
    // shadowDatabaseUrl: process.env.DATABASE_URL!,

  },
})
