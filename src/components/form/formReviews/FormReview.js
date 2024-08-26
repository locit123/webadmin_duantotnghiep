import React from "react";

const FormReview = () => {
  console.log("render FormReview");

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Review</h1>
      <div className="form-group">
        <label className="form-label">User Id</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">MenuItem Id</label>
        <select className="form-control ic-arrow">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Rating</label>
        <input
          type="text"
          placeholder="Nhập đánh giá ..."
          className="form-control"
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Comment</label>
        <input
          type="text"
          placeholder="Nhập comment ..."
          className="form-control"
        />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary">Add Review</button>
      </div>
    </div>
  );
};

export default FormReview;
