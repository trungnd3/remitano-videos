import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RenderResult, fireEvent, render } from '@/tests/utils';
import { ShareForm } from '@/src/components/forms';

const FORM_PROPS = {
  title: 'Auth Form',
  description: 'Testing Form Description',
  btnText: 'Submit',
  onSubmit: vi.fn(),
};

describe('Share Form', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<ShareForm {...FORM_PROPS} />);
  });

  it('should render Share Form', async () => {
    expect(await rendered.findByRole('form')).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.title)).toBeTruthy();
    expect(await rendered.findByText(FORM_PROPS.description)).toBeTruthy();
  });

  it('should render 2 inputs with correct placeholder', async () => {
    const inputs = await rendered.findAllByRole('textbox');
    expect(inputs[0].getAttribute('placeholder')).toBe('YouTube URL');
  });

  it('should render submit button with correct text', async () => {
    const button = await rendered.findByRole('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should trigger the onSubmit function by clicking submit button', async () => {
    const form = await rendered.findByRole('form');
    const inputs = await rendered.findAllByRole('textbox');

    fireEvent.change(inputs[0], {
      target: { value: 'youtube.com/watch?v=12345' },
    });
    fireEvent.submit(form);
    expect(FORM_PROPS.onSubmit).toHaveBeenCalled();
  });
});
