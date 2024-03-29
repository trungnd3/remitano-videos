import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import { Heading } from '@/src/components/common';

describe('Heading', () => {
  const props = {
    title: 'Testing title',
    description: 'Testing description',
  };

  it('should render heading with title and description', async () => {
    const { findByText } = render(<Heading {...props} />);
    expect(await findByText(props.title)).toBeTruthy();
    expect(await findByText(props.description)).toBeTruthy();
  });
});
