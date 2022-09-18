import bcrypt from "bcrypt";
export const generateHash = async (
  saltRounds: number,
  plainText: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(plainText, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

export const validateHash = async (
  plaintText: string,
  hashedText: string
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plaintText, hashedText, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
