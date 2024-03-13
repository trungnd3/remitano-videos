import { describe, expect, it } from 'vitest';
import { render } from '@/tests/utils';
import Header from '@/src/components/layout/header';

describe('Header', () => {
  it('shoud render with logo', async () => {
    const { findByAltText } = render(<Header />);
    expect(await findByAltText('Logo')).toBeTruthy();
  });
});
