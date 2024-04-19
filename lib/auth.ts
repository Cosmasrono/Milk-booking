import bcrypt from 'bcryptjs';

export const hashPassword = async (password: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (password: any, hashedPassword: any) => {
  return await bcrypt.compare(password, hashedPassword);
};