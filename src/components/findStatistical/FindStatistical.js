import React from "react";

const FindStatistical = ({
  handleClickFind,
  valueStart,
  onChangeStart,
  valueEnd,
  onChangeEnd,
}) => {
  return (
    <>
      <input
        type="date"
        className="ip-date"
        value={valueStart}
        onChange={onChangeStart}
      />
      <input
        type="date"
        className="ip-date"
        value={valueEnd}
        onChange={onChangeEnd}
      />
      <button onClick={handleClickFind} className="ip-date">
        Tìm
      </button>
    </>
  );
};

export default FindStatistical;
