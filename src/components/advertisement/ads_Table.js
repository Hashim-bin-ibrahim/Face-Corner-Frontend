import React, { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

export default function Advertisement_Table() {
  const [adsDetails, setAdsDetails] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getAdsDetails();
  }, []);

  const dispatch = useDispatch()


  const columns = [
    {
      name: "User",
      selector: (row) => <img width={40} height={40}  src={row.user.picture}  style={{borderRadius:"50%"}} />,
    },
    {
      name: "Campaign Type",
      selector: (row) => row.adType,

    },
    {
      name: "Campaign Name",
      selector: (row) => row.adName,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Budget",
      selector: (row) => row.budget,
    },
    {
      name: "Starts",
      selector: (row) => <Moment format="DD/MM/YYYY">{row.starts}</Moment>,
    },
    {
      name: "Ends",
      selector: (row) => <Moment format="DD/MM/YYYY">{row.ends}</Moment>,
    },
  ];

  const getAdsDetails = async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllAds`,
        {
          user: user.id,
        }
      );
      console.log(response);
      setAdsDetails(response.data);
      localStorage.setItem('ads',JSON.stringify(response.data))
      dispatch({
        type:"ADS",
        payload:response.data
      })
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  return <DataTable columns={columns} data={adsDetails} />;
}
