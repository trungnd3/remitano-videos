import { Prefer, PreferProps } from '@/src/components/common';
import { RenderResult, render } from '@/tests/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Prefer', () => {
  let rendered: RenderResult;
  let preferProps: PreferProps;

  beforeEach(() => {
    preferProps = {
      handler: vi.fn(),
      Icon: ThumbsUp,
      count: 10,
      active: false,
    };
  });

  it('should render like button', async () => {
    rendered = render(<Prefer {...preferProps} />);
    const button = await rendered.findByRole('button');
    expect(button.querySelector('svg')?.classList).toContain(
      'lucide-thumbs-up'
    );
  });

  it('should render like button with correct count number', async () => {
    rendered = render(<Prefer {...preferProps} />);
    const button = await rendered.findByRole('button');
    expect(button.querySelector('span')?.innerHTML).toBe(
      preferProps.count.toString()
    );
  });

  it('should render like button with non active state', async () => {
    rendered = render(<Prefer {...preferProps} />);
    const button = await rendered.findByRole('button');
    expect(button.querySelector('svg')?.getAttribute('fill')).toBe('none');
  });

  it('should render like button with active state', async () => {
    preferProps.active = true;
    rendered = render(<Prefer {...preferProps} />);
    const button = await rendered.findByRole('button');
    expect(button.querySelector('svg')?.getAttribute('fill')).toBe('red');
  });

  it('should render dislike button', async () => {
    preferProps.Icon = ThumbsDown;
    rendered = render(<Prefer {...preferProps} />);
    const button = await rendered.findByRole('button');
    expect(button.querySelector('svg')?.classList).toContain(
      'lucide-thumbs-down'
    );
  });
});
