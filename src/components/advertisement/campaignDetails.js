import React, { useRef, useState } from "react";
import AddToYourPost from "../createPostPopup/AddToYourPost";
import useClickOutside from "../../helpers/clickOutside";
import ImagePreview from "../createPostPopup/ImagePreview";
import Moment from "react-moment";
import StripeCheckout from "react-stripe-checkout";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { UploadImages } from "../../functions/UploadImages";
import { createAds, createPost } from "../../functions/post";

export default function CampaignDetails({
  user,
  setVisible,
  setShowPayment,
  setNewPost,
  adType,
}) {
  const popup = useRef(null);
  const [ads, setAds] = useState(true);
  const [adLink, setAdLink] = useState("");
  const [adName, setAdName] = useState("");
  const [budget, setBudget] = useState("");
  const [start_date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [newPost, setNewPost] = useState(false);
  const [expireAt, setExpireAt] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");

  // const amount = document.getElementById("budget_amount").value;

  /*-----------------------calculating ads budget------------------*/
  const calculate_amount = async () => {
    let daily_amount = 600;
    const budget = document.getElementById("budget_amount").value;
    const total_day = budget / daily_amount;
    const day = Math.trunc(total_day);
    const float_part = Number((total_day - day).toFixed(2));
    const hours = float_part * 24;
    const hour = Math.trunc(hours);
    const message = "your ads runs " + day + " day & " + hour + " hours";
    document.getElementById("budget_alert").innerHTML = message;

    const e_day = day * 86400000;
    const e_hour = (hour * 86400000) / 24;
    const e_total = e_day + e_hour;
    const e_grand_total = new Date(new Date().valueOf() + e_total);

    setExpireAt(e_grand_total);
    const end_date = new Date(e_grand_total);
    setEndDate(end_date);
    console.log("end_date:", end_date);
  };

  /*-----------------------making a payment------------------*/

  const makePayment = (req, res, token) => {
    try {
      const body = {
        token,
      };
      const { data } = axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/payment`,
        {
          body: JSON.stringify(body),
        }
      );
      console.log(res);
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  };

  /*-----------------------post submit starts------------------*/

  const postSubmit = async () => {
    // storying data to database if it cotain text & backround images only...

    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        null,
        null,
        null,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });

      //uploading images to cloudinary,
      const response = await UploadImages(formData, path, user.token);

      // storying data to database after the success of uploading images to cloudinary...
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        ads,
        adLink,
        expireAt,
        user.token
      );

      setLoading(false);
      if (res === "ok") {
        setText("");
        setImages("");
        setVisible(false);
        setNewPost((prev) => !prev);
        const response_data = await createAds(
          adType,
          adName,
          adLink,
          budget,
          start_date,
          endDate,
          response,
          user.id
        );
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      // storing data to database if it  text only...

      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        null,
        null,
        null,
        user.token
      );
      setLoading(false);
      if (response === "ok") {
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }

    // setNewPost((prev = !prev));
  };

  /*-----------------------post submit ends------------------*/

  return (
    <div className="more_details_wraps">
      <div className="more_details_wrap">
        <div className="headers_wrap">
          <h4>More details</h4>
        </div>
      </div>

      <div className="campaign_name">
        <h4> Set Ads name</h4>
        <input
          type="text"
          placeholder="new campaign name"
          name=""
          id="campaignName"
          value={adName}
          onChange={(e) => {
            setAdName(e.target.value);
          }}
        />
      </div>
      <div className="campaign_name">
        <h4> Website Link</h4>

        <input
          type="Link"
          required
          placeholder="Drop your website link here"
          name=""
          id="campaignName"
          value={adLink}
          onChange={(e) => {
            setAdLink(e.target.value);
          }}
        />
      </div>
      <div className="image_wraps">
        <AddToYourPost setShowPrev={setShowPrev} ads={ads} />
        {showPrev && (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
      </div>
      <div className="budget_wraps">
        <div className="budget_wrap">
          <h4> Budget</h4>
          <input
            type="Number"
            placeholder="INR"
            name=""
            id="budget_amount"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
            }}
            onMouseLeave={() => {
              calculate_amount();
            }}
          />
          <div className="about_budget"></div>
        </div>
        <div className="schedule_wraps">
          <div className="start_date">
            <h4>Start Date :</h4>
            <input
              type="Date"
              id="datePicker"
              placeholder="start_date"
              value={start_date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div className="alert_message">
            <h3 id="budget_alert"></h3>
          </div>
        </div>
      </div>

      <div className="footer_submit">
        {/* <h4>
          Tap Continue to proceed payment page and you accept our terms and
          condetions.
        </h4> */}

        <div className="footer_button">
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setShowPayment(false);
            }}
          >
            cancel
          </button>

          <StripeCheckout
            stripeKey="pk_test_51LvLfBSGOMf6OU7oKDT5UH7Jmf7OVADLtlKNw9c3iSC9gn6r9hoY4qbmc3dPcAUiFQ7UkVoTUNrhm0cl5G6qQryh00bli5hZfs"
            token={makePayment}
            amount={budget * 100}
          >
            <button
              onClick={() => {
                postSubmit();
              }}
              disabled={loading}
            >
              {loading ? <PulseLoader color="#fff" size={5} /> : `Pay `}
            </button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}
