import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('User Form Tests', () => {
    test('renders form and inputs correctly', () => {
        render(<App />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
        expect(screen.getByText(/Add User/i)).toBeInTheDocument();
    });

    test('shows alert when name is missing', () => {
        window.alert = jest.fn();
        render(<App />);

        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
        fireEvent.click(screen.getByText(/Add User/i));

        expect(window.alert).toHaveBeenCalledWith('Error: Name is required.');
    });

    test('shows alert when age is missing', () => {
        window.alert = jest.fn();
        render(<App />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
        fireEvent.click(screen.getByText(/Add User/i));

        expect(window.alert).toHaveBeenCalledWith('Error: Age is required.');
    });

    test('shows alert for negative age', () => {
        window.alert = jest.fn();
        render(<App />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '-5' } });
        fireEvent.click(screen.getByText(/Add User/i));

        expect(window.alert).toHaveBeenCalledWith('Age cannot be negative.');
    });

    test('successfully adds user when both fields are filled correctly', () => {
        render(<App />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });

        fireEvent.click(screen.getByText(/Add User/i));

        expect(screen.getByText(/John - 25 years old/i)).toBeInTheDocument();
    });

    test('shows alert when both name and age are missing', () => {
        window.alert = jest.fn();
        render(<App />);

        fireEvent.click(screen.getByText(/Add User/i));

        expect(window.alert).toHaveBeenCalledWith('Please fill out both fields.');
    });
});
