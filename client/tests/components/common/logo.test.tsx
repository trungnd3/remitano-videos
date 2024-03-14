import { Logo } from '@/src/components/common';
import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';

describe('Logo', () => {
  it('should render logo image', async () => {
    const { findByAltText } = render(<Logo />);
    const img = await findByAltText('Logo');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/logo-white.svg');
  });

  it('should render logo text', async () => {
    const { findByText } = render(<Logo />);
    expect(await findByText('Funny Movies')).toBeTruthy();
  });
});
