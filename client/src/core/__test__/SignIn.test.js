import React from 'react'
import ReactDOM from 'react-dom'
import SignIn from '../SignIn'

import { cleanup, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup)
it('Sign in component renders correctly', () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div);
})

it('Sign in component is in document ? ', () => {
    const { getByTestId } = render(<SignIn />)
    expect(
        getByTestId('signin-container'),
      ).toBeInTheDocument()
})

it('Sign in component has class name signin-container? ', () => {
    const { getByTestId } = render(<SignIn />)
    expect(
        getByTestId('signin-container'),
      ).toHaveClass('signin-container')
})

it('Sign in component has class name signin-container? ', () => {
    const { getByTestId } = render(<SignIn />)
    expect(getByTestId('signin-form')).toHaveFormValues({
        username: '',
        password: "",
      })
})

