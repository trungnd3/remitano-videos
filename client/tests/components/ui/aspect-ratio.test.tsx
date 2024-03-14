import { AspectRatio } from '@/src/components/ui/aspect-ratio';
import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';

describe('Aspect Ratio', () => {
  const text = 'Test Aspect';

  it('should render Aspect Ratio', async () => {
    const { findByText } = render(
      <AspectRatio ratio={16 / 9} className='w-full'>
        <p>{text}</p>
      </AspectRatio>
    );
    expect(await findByText(text)).toBeTruthy();
  });
});
