import { describe, expect, it } from 'vitest';
import { render, initialState } from '@/tests/utils';
import Navbar from '@/src/components/layout/navbar';

describe('Navbar', () => {
  const preloadedState = {
    ...initialState,
    auth: { user: 'trung@gmail.com' },
  };

  it('should render with user account', async () => {
    const { findByTestId } = render(<Navbar />, { preloadedState });
    expect(await findByTestId('nav')).toBeTruthy();
  });

  it('should render href item to share movie', async () => {
    const { findByTestId } = render(<Navbar />, { preloadedState });
    const nav = await findByTestId('nav');
    const shareLink = nav.getElementsByTagName('a')[0];
    expect(shareLink.getAttribute('href')).toBe('/share');
  });
});
