// src/lib/jwt.ts
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_NAME = 'expense-tracker-token';

interface TokenPayload {
  userId: string;
  email: string;
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err || !token) {
          return reject(err || new Error('Failed to generate token'));
        }
        resolve(token);
      }
    );
  });
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Token verification failed:', err);
        return resolve(null);
      }
      resolve(decoded as TokenPayload);
    });
  });
}

export async function setAuthToken(token: string) {
  (await cookies()).set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  return (await cookies()).get(TOKEN_NAME)?.value;
}

export async function clearAuthToken() {
  (await cookies()).delete(TOKEN_NAME);
}