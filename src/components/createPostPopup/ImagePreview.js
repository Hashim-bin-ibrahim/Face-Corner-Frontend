import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import "./style.css";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setError,
  setShowPrev,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/gif" &&
        img.type !== "image/webp" &&
        img.type !== "image/png"
      ) {
        setError(
          `${img.name} format is unsuppeted,only jpeg, png, gif, webp are allowed. `
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024) {
        setError(`${img.name} size is too large. max 1 mb allowdeed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          accept="image/jpeg,image/png,image/webp,image/gif"
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0">
            <div className="preview_actions">
              <button>
                <i className="edit_icon"></i>Edit
              </button>
              <button
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="edit_icon"></i>Add Photo/vedio
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6 "
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        {/* <div className="add_pics_inside2">
          <div className="add_circle">
            <i className="phone_icon"></i>
          </div>
          <div className="mobile_text">Add phots from your mobile device.</div>
          <span className="addphone_btn">Add</span>
        </div> */}
      </div>
    </div>
  );
}
