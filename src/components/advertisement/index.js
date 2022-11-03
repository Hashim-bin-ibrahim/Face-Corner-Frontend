import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Logo } from "../../svg";
import Advertisement_Table from "./ads_Table";
import CampaignDetails from "./campaignDetails";
import CreateCampaign from "./createCampaign";
import "./style.css";
export default function Advertisement({ setNewPost, }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [adType, setAdType] = useState("");

  return (
    <div className="ads_wraps">
      <div className="ads_wrap_1">
        <div className="left_header">
          <div className="circle">
            <Logo />
          </div>
          <span>Ads Manager</span>
        </div>
        <div className="user_data">
          <div className="circle">
            <img src={user?.picture} alt="" />
          </div>
          <span className="">
            {" "}
            {user?.first_name} {user.last_name}
          </span>
        </div>
        <div className="campaign_btn">
          <button>Campaigns</button>
          <button
            onClick={() => {
              setVisible(true);
            }}
          >
            Create
          </button>
        </div>
      </div>
      <div className="ads_wrap_2">
        <Advertisement_Table />
        {visible && (
          <CreateCampaign
            setVisible={setVisible}
            setShowPayment={setShowPayment}
            setAdType={setAdType}
            adType={adType}
          />
        )}
        {showPayment && (
          <CampaignDetails
            user={user}
            setVisible={setVisible}
            setShowPayment={setShowPayment}
            setNewPost={setNewPost}
            adType={adType}
           
          />
        )}
      </div>
    </div>
  );
}
