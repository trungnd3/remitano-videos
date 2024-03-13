import { describe, expect, it } from 'vitest';
import { render, initialState, fireEvent, findByRole } from '@/tests/utils';
import Header from '@/src/components/layout/header';

describe('Header', () => {
  it('shoud render with logo', async () => {
    const { findByAltText } = render(<Header />);
    expect(await findByAltText('Logo')).toBeTruthy();
  });

  it('shoud render navbar with user login', async () => {
    const { findByTestId } = render(<Header />, {
      preloadedState: {
        ...initialState,
        auth: {
          user: 'trung',
        },
      },
    });

    expect(await findByTestId('nav')).toBeTruthy();
  });

  it('should render sidebar with user login after clicking avatar', async () => {
    const { findByTestId } = render(<Header />, {
      preloadedState: {
        ...initialState,
        auth: {
          user: 'trung',
        },
      },
    });

    const avatar = await findByTestId('avatar');
    expect(avatar).toBeTruthy();

    fireEvent.click(avatar);
    expect(
      await findByRole(document.getElementsByTagName('body')[0], 'dialog')
    ).toBeTruthy();
  });
});
