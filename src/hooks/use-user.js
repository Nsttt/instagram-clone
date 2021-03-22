import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase.service';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
