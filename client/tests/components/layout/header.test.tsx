import { beforeEach, describe, expect, it } from 'vitest';
import { RenderResult, render } from '@/tests/utils';
import Header from '@/src/components/layout/header';

describe('Header', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<Header />);
  });

  it('shoud render with logo', async () => {
    expect(await rendered.findByAltText('Logo')).toBeTruthy();
  });

  it('shoud not render navbar without user login', () => {
    expect(rendered.queryByTestId('nav')).toBeFalsy();
  });

  it('should not render user avatar without logging-in', async () => {
    expect(rendered.queryByTestId('avatar')).toBeFalsy();
  });
});
