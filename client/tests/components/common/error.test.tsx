import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import { Error } from '@/src/components/common';

describe('Error', () => {
  const props = {
    status: '404',
    message: 'Page not found',
  };

  const backLink = {
    text: 'Go back Home',
    href: '/',
  };

  it('should render error component', async () => {
    const { findByText } = render(<Error {...props} />);
    expect(await findByText(props.status)).toBeTruthy();
    expect(await findByText(props.message)).toBeTruthy();
    const link = await findByText(backLink.text);
    expect(link.closest('a')?.getAttribute('href')).toBe(backLink.href);
  });
});
