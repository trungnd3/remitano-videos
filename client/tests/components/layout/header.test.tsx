import { beforeEach, describe, expect, it } from 'vitest';
import {
  RenderResult,
  render,
  initialState,
  screen,
  act,
  fireEvent,
} from '@/tests/utils';
import Header from '@/src/components/layout/header';

describe('Header', () => {
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
    rendered = render(<Header />);
  });

  it('shoud render with logo', async () => {
    expect(await rendered.findByAltText('Logo')).toBeTruthy();
  });

  it('shoud not render navbar without user login', () => {
    expect(rendered.queryByTestId('nav')).toBeFalsy();
  });

  it('should not render user avatar without user login', async () => {
    expect(rendered.queryByTestId('avatar')).toBeFalsy();
  });

  it('shoud render navbar with user login', () => {
    rendered = render(<Header />, { preloadedState });
    expect(rendered.queryByTestId('nav')).toBeTruthy();
  });

  it('should render user avatar and sidebar with user login', async () => {
    rendered = render(<Header />, { preloadedState });
    const avatar = await rendered.findByTestId('avatar');
    expect(avatar).toBeTruthy();

    fireEvent.click(avatar);
    expect(rendered.queryAllByTestId('sidebar')).toBeTruthy();
  });
});
