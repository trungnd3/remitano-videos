import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthForm } from '@/src/components/forms';
import { RenderResult, fireEvent, render } from '@/tests/utils';

const FORM_PROPS = {
  title: 'Auth Form',
  description: 'Testing Form Description',
  btnText: 'Submit',
  onSubmit: vi.fn(),
  formSide: 'left' as 'left' | 'right',
  otherSide: {
    title: 'Testing Register Title',
    description: 'Testing Register Side Description',
    href: '/',
    btnText: 'Register',
  },
};

describe('Auth Form', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<AuthForm {...FORM_PROPS} />);
  });

  it('should render Auth Form', async () => {
    expect(await rendered.findByRole('form')).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.title)).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.description)).toBeTruthy();
  });

  it('should render 2 inputs with correct placeholder', async () => {
    const userInput = await rendered.findByRole('textbox');
    const passwordInput = await rendered.findByRole('password');

    expect(userInput.getAttribute('placeholder')).toBe('Username');
    expect(passwordInput.getAttribute('placeholder')).toBe('Password');
  });

  it('should render submit button with correct text', async () => {
    const button = await rendered.findByRole('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should trigger the onSubmit function by clicking submit button', async () => {
    const form = await rendered.findByRole('form');
    const userInput = await rendered.findByRole('textbox');
    const passwordInput = await rendered.findByRole('password');
    fireEvent.change(userInput, { target: { value: 'trung@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.submit(form);
    expect(FORM_PROPS.onSubmit).toHaveBeenCalled();
  });

  it('should render link text', async () => {
    const link = await rendered.findByText(FORM_PROPS.otherSide.btnText);
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(FORM_PROPS.otherSide.href);
  });
});
