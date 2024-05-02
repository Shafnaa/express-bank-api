import bcrypt from "bcrypt";

/**
 * Hash a plain text password
 * @param {string} password - The password to be hashed
 * @returns {string}
 */
async function hashPassword(password: string) {
  const saltRounds = 16;
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  return hashedPassword;
}

/**
 * Compares a plain text password and its hashed to determine its equality
 * Mainly use for comparing login credentials
 * @param {string} password - A plain text password
 * @param {string} hashedPassword - A hashed password
 * @returns {boolean}
 */
async function passwordMatched(password: string, hashedPassword: string) {
  return await bcrypt.compareSync(password, hashedPassword);
}

export { hashPassword, passwordMatched };
