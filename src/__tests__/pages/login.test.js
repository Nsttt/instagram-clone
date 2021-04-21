import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login page with form submission and logs the user in', async () => {
    const succededToLogin = jest.fn(() => Promise.resolve('Signed in!'));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succededToLogin,
      })),
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>,
    );

    await act(async () => {
      expect(document.title).toEqual('Login - Instagram');

      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'test-email@google.es' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'test-password' },
      });
      fireEvent.submit(getByTestId('login'));

      expect(succededToLogin).toHaveBeenCalled();
      expect(succededToLogin).toHaveBeenCalledWith('test-email@google.es', 'test-password');

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('test-email@google.es');
        expect(getByPlaceholderText('Password').value).toBe('test-password');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });

  it('renders the login page with form submission and fails to log in the user', async () => {
    const succededToLogin = jest.fn(() => Promise.reject(new Error('Signed in!')));
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succededToLogin,
      })),
    };
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <Login />
        </FirebaseContext.Provider>
      </Router>,
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'test-email' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'test-password' },
      });
      fireEvent.submit(getByTestId('login'));

      expect(succededToLogin).toHaveBeenCalled();
      expect(succededToLogin).toHaveBeenCalledWith('test-email', 'test-password');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
