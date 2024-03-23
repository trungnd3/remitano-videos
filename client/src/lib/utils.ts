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

export const calculateRemainingTime = (expirationTime: number) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const retreiveStoredToken = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    return null;
  }

  try {
    const storedToken = JSON.parse(storedUser).token;
    const storeExpirationDate = JSON.parse(storedUser).tokenExpiresAt;

    const remainingTime = calculateRemainingTime(storeExpirationDate);

    if (remainingTime <= 60000) {
      localStorage.removeItem('user');
      return null;
    }

    return {
      token: storedToken,
      duration: remainingTime,
    };
  } catch (error) {
    console.log('Cannot retreive token', error);
    return null;
  }
};
