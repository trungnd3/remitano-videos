import { TextCenter } from '@/src/components/common';
import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';

describe('Text Center', () => {
  const props = {
    title: 'Title',
    description: 'Description',
    direct: {
      to: '/',
      text: 'Direct',
    },
  };
  it('should render Text Center', async () => {
    const rendered = render(<TextCenter {...props} />);
    expect(await rendered.findByText(props.title)).toBeTruthy();
    expect(await rendered.findByText(props.description)).toBeTruthy();
    expect(await rendered.findByText(props.direct.text)).toBeTruthy();
  });
});
