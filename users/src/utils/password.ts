import { createHmac, randomBytes } from 'node:crypto';

export class Password {
  
  static async toHash(password: string) {
    const salt = randomBytes(32).toString('hex'); 
    const hashedPassword = createHmac('sha256', salt) 
      .update(password)
      .digest('hex');

    return `${hashedPassword}.${salt}`; 
  }

 
  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    const [hashedPassword, salt] = storedPassword.split('.'); 
    const suppliedHashedPassword = createHmac('sha256', salt) 
      .update(suppliedPassword)
      .digest('hex');

    return hashedPassword === suppliedHashedPassword; 
  }
}
