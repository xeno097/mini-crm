import { randomBytes } from 'crypto';
import slugify from 'slugify';

export const generateSlug = (input: string[], unique = false) => {
  if (!input || input.length === 0) {
    throw new Error('generateSlug: Received null | undefined | empty array');
  }

  const inputCopy = [...input];

  if (unique) {
    const randomString = randomBytes(5).toString('hex');
    inputCopy.push(randomString);
  }

  const rawString = inputCopy.join('-');

  const slug = slugify(rawString, {
    lower: true,
    strict: true,
  });

  return slug;
};
