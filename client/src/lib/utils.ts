import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

let count = 0;

export function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

interface ResponseData<T> {
  code: number;
  status: string;
  data: T;
}

export async function getWithAuth<T>(route: string) {
  let data: ResponseData<T> = {
    code: 404,
    status: 'Not found',
    data: Object(),
  };

  const userStorage = localStorage.getItem('user');
  if (!userStorage) {
    return data;
  }

  const user = JSON.parse(userStorage);
  if (!user) {
    return data;
  }

  const response = await fetch(`/api/${route}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  data = await response.json();

  return data;
}

export async function postWithAuth<T>(route: string, body: string) {
  let data: ResponseData<T> = {
    code: 404,
    status: 'Not found',
    data: Object(),
  };

  const userStorage = localStorage.getItem('user');
  if (!userStorage) {
    return data;
  }

  const user = JSON.parse(userStorage);
  if (!user) {
    return data;
  }

  const response = await fetch(`/api/${route}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body,
  });

  data = await response.json();

  return data;
}

export function isSocketOpen(ws: WebSocket) {
  return ws.readyState === ws.OPEN;
}
