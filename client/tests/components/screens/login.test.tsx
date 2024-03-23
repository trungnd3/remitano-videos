import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RenderResult, render } from '@/tests/utils';
import { Login } from '@/src/screens';

const FORM_PROPS = {
  title: 'Signing In',
  description: 'Login to watch and share videos',
  btnText: 'Log In',
  onSubmit: vi.fn(),
  formSide: 'left' as 'left' | 'right',
  otherSide: {
    title: 'Testing Register Title',
    description: 'Testing Register Side Description',
    href: '/',
    btnText: 'Register',
  },
};

describe('Login', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<Login />);
  });

  it('should render Login form', async () => {
    expect(await rendered.findByRole('form')).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.title)).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.description)).toBeTruthy();
  });
});
