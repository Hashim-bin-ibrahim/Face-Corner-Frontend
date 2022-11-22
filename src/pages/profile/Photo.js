import axios from "axios";
import React, { useReducer } from "react";
import { useEffect } from "react";
import { PhotosReducer, ProfileReducer } from "../../functions/Reducers";

export default function Photo({ username, token }) {
  const [{ loading, error, photos }, dispatch] = useReducer(PhotosReducer, {
    loading: false,
    photos: {},
    error: "",
  });

  useEffect(() => {
    getPhotos();
  }, [username]);

  const path = `${username}/*`;
  const max = 30;
  const sort = "desc";

  const getPhotos = async () => {
    try {
      dispatch({
        type: "PHOTOS_REQUEST",
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/listImages`,
        {
          path,
          max,
          sort,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "PHOTOS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHOTOS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="profile_card">
      {/* <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div> */}
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}
