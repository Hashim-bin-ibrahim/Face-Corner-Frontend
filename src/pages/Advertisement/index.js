import "./style.css";
import Advertisement from "../../components/advertisement";

export default function Advertisements({ setNewPost }) {
  return (
    <div className="div">
      <Advertisement setNewPost={setNewPost}  />
    </div>
  );
}
