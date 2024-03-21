import Layout from '@/src/components/layout';
import { render } from '@/tests/utils';
import { describe, expect, it } from 'vitest';

describe('Layout', () => {
  it('should render layout', () => {
    const rendered = render(
      <Layout>
        <div data-testid='layout'>Testing</div>
      </Layout>
    );

    expect(rendered.queryByRole('main')).toBeTruthy();

    expect(rendered.queryByTestId('layout')).toBeTruthy();
  });
});
