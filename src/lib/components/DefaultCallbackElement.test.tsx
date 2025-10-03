import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DefaultCallbackElement from './DefaultCallbackElement';
import { mockAuthData } from '../__tests__/mocks';

describe('DefaultCallbackElement', () => {
  const setCallbackValue = vi.fn();

  it('renders login input', () => {
    render(<DefaultCallbackElement callback={mockAuthData.callbacks[0]} setCallbackValue={setCallbackValue} />);

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('value', 'demo');
  });

  it('renders password input', () => {
    const { container } = render(<DefaultCallbackElement callback={mockAuthData.callbacks[1]} setCallbackValue={setCallbackValue} />);
    
    const input = container.querySelector("#IDToken2");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('changes callback value', () => {
    const newLogin = 'newLogin';
    render(<DefaultCallbackElement callback={mockAuthData.callbacks[0]} setCallbackValue={setCallbackValue} />);
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: {value: newLogin}});
    expect(setCallbackValue).toHaveBeenCalledTimes(1);
    expect(setCallbackValue).toHaveBeenCalledWith(newLogin)
  });
});