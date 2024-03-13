import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/footer';

describe('Footer', () => {
  it('should render with author name', async () => {
    render(<Footer />);
    expect(await screen.findByText('Author: Trung Nguyen')).toBeTruthy();
  });
});
