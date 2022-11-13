import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import NotFound from "../../pages/notfound";

const firebase = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({
        user: {
          updateProfile: jest.fn(() => Promise.resolve("I am signed up!")),
        },
      }),
    ),
  })),
};

describe("<NotFound />", () => {
  it("renders the not found page with a logged in user", async () => {
    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <UserContext.Provider value={{ user: {} }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>,
    );

    expect(getByText("Not Found!")).toBeTruthy();
    expect(document.title).toEqual("Not Found - Instagram");
  });

  it("renders the not found page with an anon user", async () => {
    const { getByText } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <UserContext.Provider value={{ user: null }}>
            <NotFound />
          </UserContext.Provider>
        </FirebaseContext.Provider>
      </Router>,
    );

    expect(getByText("Not Found!")).toBeTruthy();
    expect(document.title).toEqual("Not Found - Instagram");
  });
});
