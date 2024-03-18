import { beforeEach, describe, expect, it } from 'vitest';
import { render, initialState, fireEvent, RenderResult } from '@/tests/utils';
import Sidebar from '@/src/components/layout/sidebar';

describe('Sidebar', () => {
  let rendered: RenderResult;
  let avatar: HTMLElement;

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

  beforeEach(async () => {
    rendered = render(<Sidebar />, { preloadedState });
    avatar = await rendered.findByTestId('avatar');
  });

  it('should render after user login and clicking on avatar', async () => {
    expect(avatar).toBeTruthy();
    fireEvent.click(avatar);
    expect(await rendered.findByTestId('sidebar')).toBeTruthy();
  });

  it('should render with welcome username text', async () => {
    fireEvent.click(avatar);
    const sidebar = await rendered.findByTestId('sidebar');
    expect(sidebar.getElementsByTagName('h2')[0].textContent).toBe(
      'Welcome,trung@gmail.com'
    );
  });

  it('should render logout button inside', async () => {
    fireEvent.click(avatar);
    const logoutBtn = await rendered.findByTestId('logout');
    expect(logoutBtn.textContent).toBe('Logout');
  });

  it.skip('should log user out when logout button clicked', async () => {
    fireEvent.click(avatar);

    const logoutBtn = await rendered.findByTestId('logout');
    expect(logoutBtn.textContent).toBe('Logout');

    fireEvent.click(logoutBtn);
    expect(await rendered.findByTestId('avatar')).toBeFalsy();
  });
});
