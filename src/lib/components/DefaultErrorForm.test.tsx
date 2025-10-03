import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DefaultErrorForm from './DefaultErrorForm';


describe('DefaultErrorForm', () => {
  const mockResetError = vi.fn();
  
  const defaultProps = {
    error:  { code: 401, reason: 'Test reason', message: 'Test error message'},
    resetError: mockResetError
  }

  it('renders error message and retry button', () => {
    render(<DefaultErrorForm {...defaultProps} />);
    
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('calls resetError when retry button is clicked', () => {
    render(<DefaultErrorForm {...defaultProps} />);
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    fireEvent.click(retryButton);
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });
});