import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import NotFound from '../../pages/notfound';
import { getUserByUserId } from '../../services/firebase.service';
import userFixture from '../../fixtures/logged-in-user';

jest.mock('../../services/firebase.service');

describe('<NotFound />', () => {
  it('renders the not found page with a logged in user', async () => {
    await act(async () => {
      await getUserByUserId.mockImplementation(() => [userFixture]);
      const { queryByText } = render(
        <Router>
          <FirebaseContext.Provider value={{}}>
            <UserContext.Provider value={{ user: { uid: 1 } }}>
              <NotFound />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>,
      );

      await waitFor(() => {
        expect(queryByText('Login')).toBeFalsy();
        expect(queryByText('Not Found!')).toBeTruthy();
      });
    });
  });

  it('renders the not found page with an anon user', async () => {
    await act(async () => {
      await getUserByUserId.mockImplementation(() => []);
      const { queryByText } = render(
        <Router>
          <FirebaseContext.Provider value={{}}>
            <UserContext.Provider value={{ user: {} }}>
              <NotFound />
            </UserContext.Provider>
          </FirebaseContext.Provider>
        </Router>,
      );

      await waitFor(() => {
        expect(queryByText('Login')).toBeTruthy();
        expect(queryByText('Not Found!')).toBeTruthy();
      });
    });
  });
});
