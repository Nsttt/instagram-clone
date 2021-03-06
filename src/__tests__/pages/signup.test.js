import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import SignUp from '../../pages/signup';
import FirebaseContext from '../../context/firebase';
import { doesUsernameExists } from '../../services/firebase.service';
import * as ROUTES from '../../constants/routes';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../../services/firebase.service');

describe('<SignUp />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign up page with a form submission and signs a user up', async () => {
    const firebase = {
      firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve('User added')),
        })),
      })),
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: { updateProfile: jest.fn(() => Promise.resolve('I am signed up!')) },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>,
    );

    await act(async () => {
      doesUsernameExists.mockImplementation(() => Promise.resolve(true)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'nstlopez' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Nestor Lopez' },
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'nstlopez@gmail.com' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instagram');
      await expect(doesUsernameExists).toHaveBeenCalled();
      await expect(doesUsernameExists).toHaveBeenCalledWith('nstlopez');

      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('nstlopez');
        expect(getByPlaceholderText('Full name').value).toBe('Nestor Lopez');
        expect(getByPlaceholderText('Email address').value).toBe('nstlopez@gmail.com');
        expect(getByPlaceholderText('Password').value).toBe('password');
        expect(queryByTestId('error')).toBeFalsy();
      });
    });
  });

  it('renders the sign up page but an error is present (username exists)', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.resolve({})),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>,
    );

    await act(async () => {
      doesUsernameExists.mockImplementation(() => Promise.resolve([false])); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'nstlopez' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Nestor Lopez' },
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'nstlopez@gmail.com' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instagram');
      await expect(doesUsernameExists).toHaveBeenCalled();
      await expect(doesUsernameExists).toHaveBeenCalledWith('nstlopez');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('');
        expect(getByPlaceholderText('Full name').value).toBe('');
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });

  it('renders the sign up page but an error is thrown', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() => ({
          user: {
            updateProfile: jest.fn(() => Promise.reject(new Error('Username exists'))),
          },
        })),
      })),
    };

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignUp />
        </FirebaseContext.Provider>
      </Router>,
    );

    await act(async () => {
      doesUsernameExists.mockImplementation(() => Promise.resolve(false)); // as true but inverse in the code

      await fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'nstlopez' } });
      await fireEvent.change(getByPlaceholderText('Full name'), {
        target: { value: 'Nestor Lopez' },
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'nstlopez@gmail.com' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
      fireEvent.submit(getByTestId('sign-up'));

      expect(document.title).toEqual('Sign Up - Instagram');
      await expect(doesUsernameExists).toHaveBeenCalled();
      await expect(doesUsernameExists).toHaveBeenCalledWith('nstlopez');

      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalledWith(ROUTES.DASHBOARD);
        expect(getByPlaceholderText('Username').value).toBe('');
        expect(getByPlaceholderText('Full name').value).toBe('');
        expect(getByPlaceholderText('Email address').value).toBe('');
        expect(getByPlaceholderText('Password').value).toBe('');
        expect(queryByTestId('error')).toBeTruthy();
      });
    });
  });
});
