import bcrypt from 'bcryptjs';
import {createHmac} from 'crypto';

const saltRounds = parseInt(process.env.SALT_ROUND);

const hashPassword = (password) => {
   const salt = bcrypt.genSaltSync(saltRounds)
   return bcrypt.hashSync(password, salt);
};

const compareHashPassword = (password, hashed_password) => {
   return bcrypt.compareSync(password, hashed_password)
}

const hmacProcess = (value, key) => {
   return createHmac('sha256', key).update(value).digest('hex');
}

const genRandomHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export {hashPassword, compareHashPassword, hmacProcess, genRandomHex};