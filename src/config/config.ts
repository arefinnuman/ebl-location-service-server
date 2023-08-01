import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_MODULES,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: {
    super_admin: process.env.DEFAULT_SUPER_ADMIN_PASSWORD,
    admin: process.env.DEFAULT_ADMIN_PASSWORD,
    maker: process.env.DEFAULT_MAKER_PASSWORD,
    checker: process.env.DEFAULT_CHECKER_PASSWORD,
    viewer: process.env.DEFAULT_VIEWER_PASSWORD,
  },
};
