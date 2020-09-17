import React from 'react'
import ReactDOM from 'react-dom'
import SignUp from '../signup'

import { cleanup, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)
it('Sign up component renders correctly', () => {
    // Create Div Element
    const div = document.createElement("div");
    // Render SignUp with Div Element
    ReactDOM.render(<SignUp />, div);
})

it('Sign up component is in document ? ', () => {
    const { getByTestId } = render(<SignUp />)
    // Is SignUp Container in the Document
    expect(
        getByTestId('signup-container'),
    ).toBeInTheDocument()
})

it('Sign up component has class name signup-container ? ', () => {
    const { getByTestId } = render(<SignUp />)
    // Does SignUp Container have the correct class
    expect(
        getByTestId('signup-container'),
    ).toHaveClass('signup-container')
})

it('Sign up component has class name signup-container ? ', () => {
    const { getByTestId } = render(<SignUp />)
    // Test Form contains valid Form Values
    expect(getByTestId('signup-form')).toHaveFormValues({
        username: '',
        email: '',
        password: "",
    })
})

