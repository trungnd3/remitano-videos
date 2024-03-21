import { RenderResult, fireEvent, render } from '@/tests/utils';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet';

describe('Sheet', () => {
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(
      <Sheet>
        <SheetTrigger data-testid='sheet-trigger'>Trigger</SheetTrigger>
        <SheetContent data-testid='sheet-content'>
          <SheetHeader data-testid='sheet-header'>
            <SheetTitle data-testid='sheet-title'>
              <p>Title</p>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription data-testid='sheet-description'>
            Description
          </SheetDescription>
          <SheetFooter data-testid='sheet-footer'>
            <p>Footer</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  });

  it('should render Sheet component', async () => {
    expect(await rendered.findByTestId('sheet-trigger')).toBeTruthy();
  });

  it('should render Sheet component on clicking sheet trigger', async () => {
    const trigger = await rendered.findByTestId('sheet-trigger');
    fireEvent.click(trigger);
    expect(await rendered.findByTestId('sheet-content')).toBeTruthy();
    expect(await rendered.findByTestId('sheet-header')).toBeTruthy();
    expect(await rendered.findByTestId('sheet-title')).toBeTruthy();
    expect(await rendered.findByTestId('sheet-description')).toBeTruthy();
    expect(await rendered.findByTestId('sheet-footer')).toBeTruthy();
  });
});
