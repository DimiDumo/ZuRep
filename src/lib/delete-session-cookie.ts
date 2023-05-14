import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
const { PUBLIC_NODE_ENV } = env;

export function deleteCookie(cookies: Cookies, cookieName = 'session') {
  cookies.set(cookieName, '', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: PUBLIC_NODE_ENV !== 'development',
    maxAge: 0
  });
}
