import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase.service";

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId]);

  return { photos };
}
