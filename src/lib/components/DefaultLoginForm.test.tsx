import { render, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import DefaultLoginForm from './DefaultLoginForm';
import { mockAuthData } from '../__tests__/mocks';
import { setConfig } from '../config';
import type { ActionElements, CallbackElement } from './types';

describe('DefaultLoginForm', () => {
    const mockCallbackElement: CallbackElement = vi.fn();
    const mockActionElements: ActionElements = vi.fn();

    const mockSetCallbackValue = vi.fn();
    const mockDoLogin = vi.fn()

    setConfig({
        callbackElement: mockCallbackElement,
        actionElements: mockActionElements,
    })
   

    const defaultProps = {
        authData: mockAuthData,
        setCallbackValue: mockSetCallbackValue,
        doLogin: mockDoLogin
    }

    it('renders login form', () => {
        render(<DefaultLoginForm {...defaultProps} />);
        
        expect(mockCallbackElement).toHaveBeenCalledTimes(2);
        expect(mockActionElements).toHaveBeenCalledTimes(1);        
    });

    it('calls doLogin on form submit', () => {
        const {container} = render(<DefaultLoginForm {...defaultProps} />);
        
        const form = container.querySelector('form');
        if(!form) {
            expect(form).not.toBeNull();
            return;
        }
        
        expect(form).toBeInTheDocument();
        fireEvent.submit(form);
        expect(mockDoLogin).toHaveBeenCalledTimes(1)
    });
});