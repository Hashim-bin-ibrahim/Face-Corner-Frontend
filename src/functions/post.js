import axios from "axios";

export const createAds = async (
  adType,
  adName,
  adLink,
  budget,
  starts,
  ends,
  images,
  user
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createAds`,
      {
        adType,
        adName,
        adLink,
        budget,
        starts,
        ends,
        images,
        user,
      }
    );
    const post_id = data._id;
    console.log("data", post_id, data);
  } catch (error) {
    return error.response.data.message;
  }
};

export const createPost = async (
  type,
  background,
  text,
  images,
  user,
  ads,
  adLink,
  expireAt,
  token
) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createPost`,
      {
        type,
        background,
        text,
        images,
        user,
        ads,
        adLink,
        expireAt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/reactPost`,
      {
        postId,
        react,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const getReacts = async (postId, token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getReacts/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", data);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const uploadComment = async (postId, comment, userId, token) => {
  try {
    const data = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/uploadComment`,
      {
        postId,
        comment,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error");
    return error.response.data.message;
  }
};

export const getSingleData = async (postId) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getSinglePost/${postId}`
    );
    return data;
  } catch (error) {
    console.log("error");
    return error.response.data.message;
  }
};
