import { beforeEach, describe, expect, it } from 'vitest';
import { render, initialState, RenderResult } from '@/tests/utils';
import Navbar from '@/src/components/layout/navbar';

describe('Navbar', () => {
  let rendered: RenderResult;

  const preloadedState = {
    ...initialState,
    auth: {
      user: {
        id: 1,
        username: 'trung@gmail.com',
        token: 'testtoken',
      },
    },
  };

  beforeEach(() => {
    rendered = render(<Navbar />, { preloadedState });
  });

  it('should render with user account', async () => {
    expect(await rendered.findByTestId('nav')).toBeTruthy();
  });

  it('should render href item to share movie', async () => {
    const nav = await rendered.findByTestId('nav');
    const shareLink = nav.getElementsByTagName('a')[0];
    expect(shareLink.getAttribute('href')).toBe('/share');
  });
});
