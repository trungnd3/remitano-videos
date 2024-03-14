import { describe, expect, it } from 'vitest';
import { render } from '@/tests/utils';
import Header from '@/src/components/layout/header';

describe('Header', () => {
  it('shoud render with logo', async () => {
    const { findByAltText } = render(<Header />);
    expect(await findByAltText('Logo')).toBeTruthy();
  });

  it('shoud not render navbar without user login', () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('nav')).toBeFalsy();
  });

  it('should not render user avatar without logging-in', async () => {
    const { queryByTestId } = render(<Header />);
    expect(queryByTestId('avatar')).toBeFalsy();
  });
});
