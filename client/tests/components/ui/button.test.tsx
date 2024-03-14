import { describe, expect, it } from 'vitest';
import { render } from '@/tests/utils';
import { Button } from '@/src/components/ui/button';

describe('Button', () => {
  const btnText = 'Share movie';

  it('should render default Button', async () => {
    const { findByText } = render(<Button>{btnText}</Button>);
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('bg-primary');
  });

  it('should render destructive Button', async () => {
    const { findByText } = render(
      <Button variant='destructive'>{btnText}</Button>
    );
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('bg-destructive');
  });

  it('should render outline Button', async () => {
    const { findByText } = render(<Button variant='outline'>{btnText}</Button>);
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('bg-background');
  });

  it('should render secondary Button', async () => {
    const { findByText } = render(
      <Button variant='secondary'>{btnText}</Button>
    );
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('bg-secondary');
  });

  it('should render ghost Button', async () => {
    const { findByText } = render(<Button variant='ghost'>{btnText}</Button>);
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('hover:bg-accent');
  });

  it('should render link Button', async () => {
    const { findByText } = render(<Button variant='link'>{btnText}</Button>);
    const btn = await findByText(btnText);
    expect(btn).toBeTruthy();
    expect(btn.classList).toContain('text-primary');
    expect(btn.classList).toContain('hover:underline');
  });

  it('should render asChild Button', async () => {
    const { findByText } = render(
      <Button asChild>
        <p>{btnText}</p>
      </Button>
    );
    const btn = await findByText(btnText);
    expect(btn.closest('button')).toBeFalsy();
  });
});
