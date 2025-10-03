import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DefaultActionElements from './DefaultActionElements';
import { mockAuthData } from '../__tests__/mocks';

describe('DefaultActionElements', () => {
    
    it('renders actions from confirmation callback', () => {
        render(<DefaultActionElements callbacks={mockAuthData.callbacks} />);
        const registerButton = screen.getByText('Register device')
        expect(registerButton).toBeInTheDocument();

        const skipButton = screen.getByText('Skip this step')
        expect(skipButton).toBeInTheDocument();
    });

    it('renders default action', () => {
        render(<DefaultActionElements callbacks={[]} />);
        const defaultButton = screen.getByText('Log In')
        expect(defaultButton).toBeInTheDocument();
    });

});