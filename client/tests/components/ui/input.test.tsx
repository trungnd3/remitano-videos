import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';
import { Input } from '@/src/components/ui/input';

const PLACEHOLDER = 'Testing placeholder';

describe('Input', () => {
  it('should render Input', async () => {
    const { findByRole } = render(<Input placeholder={PLACEHOLDER} />);
    expect((await findByRole('textbox')).getAttribute('placeholder')).toBe(
      PLACEHOLDER
    );
  });
});
