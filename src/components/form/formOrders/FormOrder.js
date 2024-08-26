import React from "react";

const FormOrder = () => {
  console.log("render FormOrder");

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Order</h1>
      <div className="form-group">
        <label className="form-label">User Id</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Table Id</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Status</label>
        <select className="form-control ic-arrow">
          <option>Mở</option>
          <option>Đóng</option>
        </select>
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add Order</button>
      </div>
    </div>
  );
};

export default FormOrder;
