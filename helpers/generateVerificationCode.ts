import crypto from 'crypto';

export function generateVerificationCode(length = 8): string {
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const code = randomBytes.toString('hex').slice(0, length);
  return code;
}
