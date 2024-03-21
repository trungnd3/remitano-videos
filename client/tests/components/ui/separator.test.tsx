import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import { Separator } from '@/src/components/ui/separator';

describe('Separator', () => {
  it('should render Separator', async () => {
    const { container } = render(<Separator />);
    const element = container.children[0];
    expect(element).toBeTruthy();
    expect(element.getAttribute('data-orientation')).toBe('horizontal');
  });

  it('should render Separator', async () => {
    const { container } = render(<Separator orientation='vertical' />);
    const element = container.children[0];
    expect(element).toBeTruthy();
    expect(element.getAttribute('data-orientation')).toBe('vertical');
  });
});
