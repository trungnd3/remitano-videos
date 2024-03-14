import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

const orignalGlobalImage = window.Image;

expect.extend(matchers);

beforeAll(() => {
  (window.Image as any) = class MockImage {
    onload: () => void = () => {};
    src: string = '';
    constructor() {
      setTimeout(() => {
        this.onload();
      }, 300);
      return this;
    }
  };
});

afterAll(() => {
  window.Image = orignalGlobalImage;
});

afterEach(() => {
  cleanup();
});
