// checks if the user logged in with zupass, checking he session cookie
// if not it redirects to zupass.org, which will redirect to
// /zupass-proof and add a session cookie with the zupass data

import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import type { Cookie } from '$lib/types';
import { deleteCookie } from '$lib/delete-session-cookie';
const { PUBLIC_ZUPASS_URL } = env;
const { JWT_SECRET } = privateEnv;

const unProtectedPaths: string[] = [
  /* /zupass-proof */
];
const unProtectedBasePaths: string[] = ['zupass-proof'];

export const handle = (async ({ event, resolve }) => {
  try {
    const encodedCookie = event.cookies.get('session');
    if (!encodedCookie) {
      throw Error('Could not decode session cookie');
    }
    const zupass = jwt.verify(encodedCookie, JWT_SECRET) as Cookie;

    event.locals.zupass = zupass;
    return resolve(event);
  } catch (err) {
    // delete session cookie
    deleteCookie(event.cookies);

    if (
      unProtectedPaths.includes(event.url.pathname) ||
      // [0] is empty, if pathname starts with /
      unProtectedBasePaths.includes(event.url.pathname.split('/')[1])
    ) {
      return resolve(event);
    }
  }
  const { pathname } = event.url;
  // redirect to original requested url
  // const encodedPathname = encodeURIComponent(`?pathname=${pathname}`);
  const redirectUrlAfterZupassAuth = `${event.url.origin}/zupass-proof${pathname}`;
  const redirectUrl = `${PUBLIC_ZUPASS_URL}#/prove?request={%22type%22:%22Get%22,%22returnUrl%22:%22${redirectUrlAfterZupassAuth}%22,%22args%22:{%22identity%22:{%22argumentType%22:%22PCD%22,%22pcdType%22:%22semaphore-identity-pcd%22,%22userProvided%22:true},%22signedMessage%22:{%22argumentType%22:%22String%22,%22userProvided%22:true}},%22pcdType%22:%22semaphore-signature-pcd%22,%22options%22:{%22title%22:%22Zuzalu%20Auth%22,%22description%22:%22Zuzu-CRM%22}}`;

  throw redirect(303, redirectUrl);
}) satisfies Handle;
