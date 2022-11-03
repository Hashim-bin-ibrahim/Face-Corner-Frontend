import React, { useEffect, useState } from "react";
import { AdsData, NoneCampaign } from "../../data/adsData";
export default function CreateCampaign({
  setVisible,
  setShowPayment,
  adType,
  setAdType,
}) {
  const options = [
    "Awareness",
    "Traffic",
    "Engagement",
    "Leads",
    "App promotion",
    "Sales",
  ];

  const [adsPreview, setAdsPreview] = useState("");
  const [adsDescription, setAdsDescription] = useState(
    "Select your campaign type."
  );
  const [adsImagePath, setAdsImagePath] = useState(
    "https://res.cloudinary.com/dr3xzih8o/image/upload/v1666206620/hashimceepee/post%20Images/nnmige7fa2v8alzf6igc.png"
  );

  useEffect(() => {
    AdsData.map((item) => {
      if (item.name === adsPreview) {
        setAdsDescription(item.description);
        setAdsImagePath(item.img_path);
      }
    });
  }, [adsPreview]);


/*------------------radio button on change------------------- */


  return (
    <div className="create_ad_wraps">
      <div className="ad_headers">
        <div className="ads_header_txt">
          <span>Create Campaign</span>
        </div>
      </div>
      <div className="select_campaign_ad_wrap">
        <div className="select_campaign_left">
          {options.map((option, i) => (
            <div className="input_field">
              <input
                key={i}
                className="radio_btn"
                type="radio"
                name="input"
                value={option}
                onClick={(e) => {
                  setAdType(e.target.value);
                }}
              />
              <div
                className="radio_contant"
                onMouseEnter={() => {
                  setAdsPreview(option);
                }}
              >
                {option}
              </div>
            </div>
          ))}
        </div>
        <div className="select_campaign_right">
          <div className="select_campaign_img">
            <img
              className="ads_preview_image"
              src={adsImagePath}
              alt=""
              height={50}
              width={50}
            />
          </div>

          <span>{adsDescription}</span>
        </div>
      </div>
      <div className="footer_submit">
        <div className="footer_button">
          <button
            type="button"
            onClick={() => {
              setVisible(false);
            }}
          >
            cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setShowPayment(true);
              setVisible(false);
            }}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
}
