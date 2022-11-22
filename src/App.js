import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
// import Activate from "./pages/home/activate";
// import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Advertisements from "../src/pages/Advertisement/index";
import Messenger from "./pages/Messenger/Messenger";
import { PostsReducer } from "./functions/Reducers";
import Weather from "./pages/Weather";

function App() {
  const [visible, setVisible] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [adsPost, setAdsPOst] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, error, posts }, dispatch] = useReducer(PostsReducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getAllPosts();
  }, [newPost, user]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  return (
    <div>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          setNewPost={setNewPost}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/profile/:username" element={<Profile />} exact />

          <Route
            path="/advertisement"
            element={<Advertisements setNewPost={setNewPost} />}
            exact
          />
          <Route path="/weather" element={<Weather />} exact />
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />
          <Route path="/messenger" element={<Messenger />} />

          {/* <Route path="/activate/:token" element={<Activate />} exact /> */}
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        {/* <Route path="/reset" element={<Reset />} /> */}
      </Routes>
    </div>
  );
}

export default App;
