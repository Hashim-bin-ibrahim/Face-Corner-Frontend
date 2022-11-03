import { ArrowRight, Plus } from "../../../svg";
import Story from "./story";
import "./style.css";
import { stories } from "../../../data/home";
import { useMediaQuery } from "react-responsive";
export default function Stories() {
  const query1175px = useMediaQuery({
    query: "(max-width:1175px)",
  });
  const max = query1175px ? 4 : stories.length;
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
