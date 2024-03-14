import { beforeEach, describe, expect, it } from 'vitest';
import { RenderResult, render } from '@/tests/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

const FALLBACK_TEXT = 'TN';
const IMAGE_ALT_TEXT = 'Fake Avatar';

describe('Avatar', () => {
  let rendered: RenderResult;
  let image: HTMLElement | null = null;

  beforeEach(() => {
    rendered = render(
      <Avatar>
        <AvatarImage src='/test.png' alt={IMAGE_ALT_TEXT} />
        <AvatarFallback>{FALLBACK_TEXT}</AvatarFallback>
      </Avatar>
    );
  });

  it('should render the fallback initially', () => {
    const fallback = rendered.queryByText(FALLBACK_TEXT);
    expect(fallback).toBeTruthy();
  });

  it('should not render the image initially', () => {
    image = rendered.queryByRole('img');
    expect(image).toBeFalsy();
  });

  it('should render the image after it has loaded', async () => {
    image = await rendered.findByRole('img');
    expect(image).toBeTruthy();
  });

  it('should have alt text on the image', async () => {
    image = await rendered.findByAltText(IMAGE_ALT_TEXT);
    expect(image).toBeTruthy();
  });
});
