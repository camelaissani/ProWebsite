import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { LevelType } from '@/types';

export function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs));
}

export function levelToWidth(level: LevelType) {
  let width = '';
  switch (level) {
    case 'novice':
      width = 'w-1/4';
      break;
    case 'intermediate':
      width = 'w-2/4';
      break;
    case 'advanced':
      width = 'w-3/4';
      break;
    case 'expert':
      width = 'w-full';
      break;
    default:
      width = '';
  }
  return width;
}

export function isValidEmail(email: string) {
  const mailRegExp =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return mailRegExp.test(email);
}
