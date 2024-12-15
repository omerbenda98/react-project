import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../config";

const VisitTracker = () => {
  const [siteVisits, setSiteVisits] = useState(0);
  const [period, setPeriod] = useState("day");

  useEffect(() => {
    fetchSiteVisits();
  }, [period]);

  const fetchSiteVisits = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/analytics/visits`, {
        params: { period },
      });
      setSiteVisits(response.data.visits);
    } catch (error) {
      console.error("Error fetching site visits:", error);
      toast.error("Failed to fetch site visits");
    }
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <div>
      <h2>Site Visits</h2>
      <div>
        <button onClick={() => handlePeriodChange("hour")}>Last Hour</button>
        <button onClick={() => handlePeriodChange("day")}>Last Day</button>
        <button onClick={() => handlePeriodChange("month")}>Last Month</button>
        <button onClick={() => handlePeriodChange("year")}>Last Year</button>
      </div>
      <p>
        Visits in the last {period}: {siteVisits}
      </p>
    </div>
  );
};

export default VisitTracker;
