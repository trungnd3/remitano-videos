import { describe, expect, it } from 'vitest';
import { render, initialState, fireEvent } from '@/tests/utils';
import Sidebar from '@/src/components/layout/sidebar';

describe('Sidebar', () => {
  const preloadedState = {
    ...initialState,
    auth: { user: 'trung@gmail.com' },
  };

  it('should render after user login and clicking on avatar', async () => {
    const { findByTestId } = render(<Sidebar />, { preloadedState });

    const avatar = await findByTestId('avatar');
    expect(avatar).toBeTruthy();

    fireEvent.click(avatar);
    expect(await findByTestId('sidebar')).toBeTruthy();
  });

  it('should render with welcome username text', async () => {
    const { findByTestId } = render(<Sidebar />, { preloadedState });

    const avatar = await findByTestId('avatar');

    fireEvent.click(avatar);
    const sidebar = await findByTestId('sidebar');
    expect(sidebar.getElementsByTagName('h2')[0].textContent).toBe(
      'Welcome,trung@gmail.com'
    );
  });

  it('should render logout button inside', async () => {
    const { findByTestId } = render(<Sidebar />, { preloadedState });

    const avatar = await findByTestId('avatar');
    fireEvent.click(avatar);

    const logoutBtn = await findByTestId('logout');
    expect(logoutBtn.textContent).toBe('Logout');
  });

  it.skip('should log user out when logout button clicked', async () => {
    const { findByTestId } = render(<Sidebar />, { preloadedState });

    const avatar = await findByTestId('avatar');
    fireEvent.click(avatar);

    const logoutBtn = await findByTestId('logout');
    expect(logoutBtn.textContent).toBe('Logout');

    fireEvent.click(logoutBtn);
    expect(await findByTestId('avatar')).toBeFalsy();
  });
});
