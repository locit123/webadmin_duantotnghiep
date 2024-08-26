import React from "react";

const FindStatistical = ({
  handleClickFind,
  valueStart,
  onChangeStart,
  valueEnd,
  onChangeEnd,
  disabled,
}) => {
  return (
    <>
      <span>Ngày bắt đầu:</span>
      <input
        type="date"
        className="ip-date"
        value={valueStart}
        onChange={onChangeStart}
      />
      <span>Ngày kết thúc:</span>
      <input
        type="date"
        className="ip-date"
        value={valueEnd}
        onChange={onChangeEnd}
      />
      <button onClick={handleClickFind} className="ip-date" disabled={disabled}>
        Tìm
      </button>
    </>
  );
};

export default FindStatistical;
