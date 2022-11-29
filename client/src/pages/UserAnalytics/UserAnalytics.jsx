import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  overallConsumed,
  overallWasted,
  threeMonthConsumed,
  threeMonthWasted,
  thisYearConsumed,
  thisYearWasted,
} from "../../utils/foodService";
import useUser from "../../hooks/useUser";
import "./UserAnalytics.css";

function UserAnalytics() {
  const { user, handleLogout } = useUser();
  let navigate = useNavigate();

  const [overallConsume, setOverallConsume] = useState([]);
  const [overallWaste, setOverallWaste] = useState([]);

  const [consumedLast3Months, setConsumedLast3Months] = useState([]);
  const [wastedLast3Months, setWastedLast3Months] = useState([]);
  const [consumedThisYear, setConsumedThisYear] = useState([]);
  const [wastedThisYear, setWastedThisYear] = useState([]);

  useEffect(() => {
    getOverallConsumed();
    getOverallWaste();
    getConsumedLastThreeMonths();
    getWastedLast3Months();
    getConsumedThisYear();
    getWastedThisYear();
  }, []);

  async function getOverallConsumed() {
    const consumed = await overallConsumed();
    setOverallConsume(consumed);
  }

  async function getOverallWaste() {
    const wasted = await overallWasted();
    setOverallWaste(wasted);
  }

  console.log("overall consumed", overallConsume);
  console.log("overall wasted", overallWaste);

  async function getConsumedLastThreeMonths() {
    const consumed = await threeMonthConsumed();
    setConsumedLast3Months(consumed);
  }

  async function getWastedLast3Months() {
    const wasted = await threeMonthWasted();
    setWastedLast3Months(wasted);
  }

  async function getConsumedThisYear() {
    const consumed = await thisYearConsumed();
    setConsumedThisYear(consumed);
  }

  async function getWastedThisYear() {
    const wasted = await thisYearWasted();
    setWastedThisYear(wasted);
  }

  return (
    <div className="analytics">
      <div className="analytics-title">
        <div className="user">
          {overallConsume.length > 0 ? (
            <>
              <div>
                <h2>Hey, {overallConsume[0].user.username}!</h2>
              </div>

              <div>
                <img
                  src={require("../../images/wave.png")}
                  alt="waving"
                  className="wave-icon"
                />
              </div>
            </>
          ) : (
            <>
              <h2>Hey there!</h2>
              <div>
                <img
                  src={require("../../images/wave.png")}
                  alt="waving"
                  className="wave-icon"
                />
              </div>
            </>
          )}
        </div>

        <h3>Here's your food consumption and waste analytics</h3>
      </div>

      <div className="analytics-container">
        <div className="analytic-card">
          <div className="analytics-title">
            <h4>Overall</h4>
          </div>

          <div className="wasted-status-section">
            <div className="overall-consumed">
              {overallConsume ? (
                <div>
                  <p className="waste-status-num">{overallConsume.length}</p>
                  <p className="consumed">Consumed</p>
                </div>
              ) : null}
            </div>

            <div>
              <p>vs.</p>
            </div>

            <div className="overall-wasted">
              {overallWaste ? (
                <div>
                  <p className="waste-status-num">{overallWaste.length}</p>
                  <p className="wasted">Wasted</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytics-title">
            <h4>Previous 3 months</h4>
          </div>

          <div className="wasted-status-section">
            <div className="three-months-consumed">
              {consumedLast3Months ? (
                <div>
                  <p className="waste-status-num">
                    {consumedLast3Months.length}
                  </p>
                  <p className="consumed">Consumed</p>
                </div>
              ) : null}
            </div>

            <div>
              <p>vs.</p>
            </div>

            <div className="three-months-wasted">
              {wastedLast3Months ? (
                <div>
                  <p className="waste-status-num">{wastedLast3Months.length}</p>
                  <p className="wasted">Wasted</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytics-title">
            <h4>This year</h4>
          </div>

          <div className="wasted-status-section">
            <div className="three-months-consumed">
              {consumedThisYear ? (
                <div>
                  <p className="waste-status-num">{consumedThisYear.length}</p>
                  <p className="consumed">Consumed</p>
                </div>
              ) : null}
            </div>

            <div>
              <p>vs.</p>
            </div>

            <div className="this-year-wasted">
              {wastedThisYear ? (
                <div>
                  <p className="waste-status-num">{wastedThisYear.length}</p>
                  <p className="wasted">Wasted</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default UserAnalytics;
