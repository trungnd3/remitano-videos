import { ToastAction } from '@/src/components/ui/toast';
import { Toaster } from '@/src/components/ui/toaster';
import { toast, Toast } from '@/src/components/ui/use-toast';
import { act, fireEvent, render } from '@/tests/utils';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Toaster', () => {
  let toastVal: {
    title: string;
    description: string;
    actionHandler: Mock;
    actionText: string;
  };
  let toastProps: Toast;

  beforeEach(() => {
    toastVal = {
      title: 'Test toaster',
      description: 'This is test description for toaster',
      actionHandler: vi.fn(),
      actionText: 'Action',
    };

    toastProps = {
      title: toastVal.title,
      description: <div data-testid='toaster-desc'>{toastVal.description}</div>,
    };
  });

  it('should not render Toaster component without adding new toast', async () => {
    const rendered = render(<Toaster />);
    const desc = rendered.queryByTestId('toaster-desc');
    expect(desc).toBeFalsy();
  });

  it('should render Toaster component with correct title and description', async () => {
    toast(toastProps);
    const rendered = render(<Toaster />);

    // assert toast title
    expect(rendered.queryByText(toastVal.title)).toBeTruthy();

    // assert toast description
    const desc = await rendered.findByTestId('toaster-desc');
    expect(desc).toBeTruthy();
    expect(desc.innerHTML).toBe(toastVal.description);
  });

  it('should render Toaster component with action', async () => {
    toastProps.action = (
      <ToastAction
        altText='toast-action'
        type='button'
        data-testid='toaster-action'
        onClick={toastVal.actionHandler}
      >
        {toastVal.actionText}
      </ToastAction>
    );
    toast(toastProps);
    const rendered = render(<Toaster />);

    // assert toast action
    const actionEl = await rendered.findByTestId('toaster-action');
    expect(actionEl).toBeTruthy();
    fireEvent.click(actionEl);
    expect(toastVal.actionHandler).toHaveBeenCalled();
  });

  it('should update Toaster component', async () => {
    const toasting = toast(toastProps);
    const rendered = render(<Toaster />);

    const desc = await rendered.findByTestId('toaster-desc');
    expect(desc.innerHTML).toBe(toastVal.description);

    const updatedVal = {
      ...toastVal,
      description: 'This is updated description for toast',
    };
    act(() => {
      toasting.update({
        id: toasting.id,
        description: (
          <div data-testid='toaster-desc'>{updatedVal.description}</div>
        ),
      });
    });

    const updatedDesc = await rendered.findByTestId('toaster-desc');
    expect(updatedDesc.innerHTML).toBe(updatedVal.description);
  });

  it('should dismiss Toaster component', async () => {
    const toasting = toast(toastProps);
    const rendered = render(<Toaster />);

    expect(rendered.queryByTestId('toaster-desc')).toBeTruthy();

    act(() => {
      toasting.dismiss();
    });

    expect(rendered.queryByTestId('toaster-desc')).toBeFalsy();
  });
});
