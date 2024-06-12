import  User  from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import credentials from '../common/credentials';

export const registerUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

export const loginUser = async (data: any) => {
  const user = await User.findOne({ where: { username: data.username } });
  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ id: user.id,role: user.role  }, credentials.jwt.SECRET, { expiresIn: '10h' });
  return { user, token };
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

