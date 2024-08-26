import React, { useCallback, useEffect, useState } from "react";

const ProgressBar = ({ listDataPromotion, className, className2 }) => {
  const [total, setTotal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [displayedTotal, setDisplayedTotal] = useState(0);

  let data = listDataPromotion?.data?.promotions;

  const getTotal = useCallback(() => {
    if (listDataPromotion && listDataPromotion?.data && data.length > 0) {
      let newTotal = 0;
      let newTotalCount = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].isActive === true) {
          if (data[i].usedCount) {
            newTotal += data[i].usedCount;
          }
          if (data[i].maxUsage) {
            newTotalCount += data[i].maxUsage;
          }
        }
      }
      setTotal(newTotal);
      setTotalCount(newTotalCount);
    }
  }, [listDataPromotion, data]);

  useEffect(() => {
    getTotal();
  }, [getTotal]);

  useEffect(() => {
    if (displayedTotal < total) {
      const interval = setInterval(() => {
        setDisplayedTotal((prev) => {
          if (prev < total) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [total, displayedTotal]);

  return (
    <>
      <div className={"progressBar"} style={{ width: `${totalCount}%` }}>
        <span className="totalCount">{`${totalCount}%`}</span>
        <div
          className={"run-progressBar"}
          style={{ width: `${displayedTotal}%` }}
        >
          <span className="total-progressBar">{displayedTotal}%</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
