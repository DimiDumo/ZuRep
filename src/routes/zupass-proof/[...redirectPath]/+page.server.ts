// the page must render otherwise cookie
// does not get saved and starts a redirect endless loop

import type { Cookie, Pcd, SemaphoreSignaturePcd } from '$lib/types';
import jwt from 'jsonwebtoken';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
const { NODE_ENV, JWT_SECRET } = env;

// this is where zupass will redirect to on success
// the signedMessage is the userId
// using  a GET to https://api.pcd-passport.com/zuzalu/participant/${userId}
// we could get the requested information, like email, name etc.
export const load = (({ url, cookies }) => {
  try {
    const semaphoreSignaturePcd: SemaphoreSignaturePcd = JSON.parse(
      url.searchParams.get('proof') || '{}'
    );
    const pcd: Pcd = JSON.parse(semaphoreSignaturePcd.pcd);
    const userId = pcd.claim.signedMessage;

    const cookie: Cookie = {
      userId,
      pcd
    };

    const token = jwt.sign(cookie, JWT_SECRET);
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: NODE_ENV !== 'development',
      maxAge: 60 * 60 * 0.5
    });
  } catch (err: any) {
    console.error('Could not parse zupass response: ', err?.message);
    throw err;
  }
  // throw redirect(302, `/zupass-success/${redirectPath}`);
}) satisfies PageServerLoad;
