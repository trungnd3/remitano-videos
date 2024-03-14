import { beforeEach, describe, expect, it } from 'vitest';
import { RenderResult, render } from '@/tests/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from '@/src/components/ui/card';

const IMAGE_ALT_TEXT = 'Fake Avatar';
const TITLE = 'Card Title';
const DESCRIPTION = 'Card Description';
const FOOTER_TEXT = 'Card Footer';

describe('Card', () => {
  let rendered: RenderResult;

  let image: HTMLElement | null = null;

  beforeEach(() => {
    rendered = render(
      <Card data-testid='card'>
        <CardImage className='w-full' src='/test.png' alt={IMAGE_ALT_TEXT} />
        <CardHeader className='px-2'>
          <CardTitle>{TITLE}</CardTitle>
        </CardHeader>
        <CardContent className='px-2'>
          <CardDescription>{DESCRIPTION}</CardDescription>
        </CardContent>
        <CardFooter className='px-2'>
          <p>{FOOTER_TEXT}</p>
        </CardFooter>
      </Card>
    );
  });

  it('should render card', async () => {
    expect(await rendered.findByTestId('card')).toBeTruthy();
    expect(await rendered.findByText(TITLE)).toBeTruthy();
    expect(await rendered.findByText(DESCRIPTION)).toBeTruthy();
    expect(await rendered.findByText(FOOTER_TEXT)).toBeTruthy();
  });

  it('should render card image', async () => {
    image = await rendered.findByRole('img');
    expect(image).toBeTruthy();
  });
});
