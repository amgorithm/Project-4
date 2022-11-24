import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  overallConsumed,
  overallWasted,
  threeMonthConsumed,
  threeMonthWasted,
  thisYearConsumed,
  thisYearWasted,
} from "../../utils/foodService";
import useUser from "../../hooks/useUser";

function UserAnalytics() {
  const { user } = useUser();
  let navigate = useNavigate();
  const [overallConsume, setOverallConsume] = useState();
  const [overallWaste, setOverallWaste] = useState();
  const [consumedLast3Months, setConsumedLast3Months] = useState();
  const [wastedLast3Months, setWastedLast3Months] = useState();
  const [consumedThisYear, setConsumedThisYear] = useState();
  const [wastedThisYear, setWastedThisYear] = useState();

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

  console.log(wastedThisYear);

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
    <div>
      <h3>Food waste analytics</h3>

      <h4>Overall:</h4>
      {overallConsume ? (
        <div>
          <p>
            Consumed: <span>{overallConsume.length}</span>
          </p>
        </div>
      ) : null}

      {overallWaste ? (
        <div>
          <p>
            Wasted: <span>{overallWaste.length}</span>
          </p>
        </div>
      ) : null}

      <h4>Last 3 months</h4>

      {consumedLast3Months ? (
        <div>
          <p>
            Consumed: <span>{consumedLast3Months.length}</span>
          </p>
        </div>
      ) : null}

      {wastedLast3Months ? (
        <div>
          <p>
            Wasted: <span>{wastedLast3Months.length}</span>
          </p>
        </div>
      ) : null}

      <h4>This year</h4>
      {consumedThisYear ? (
        <div>
          <p>
            Consumed: <span>{consumedThisYear.length}</span>
          </p>
        </div>
      ) : null}
      {wastedThisYear ? (
        <div>
          <p>
            Wasted: <span>{wastedThisYear.length}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default UserAnalytics;
