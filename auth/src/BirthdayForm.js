import React, { useState } from "react";

import './BirthdayForm.css';
const BirthdayForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    bdayMsg: "",
    phNo: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.bdayMsg ||
      !formData.phNo ||
      !formData.date
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/addBirthday", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response);
    if (response.ok) {
      console.log("Submission successful");
      setFormData({
        name: "",
        bdayMsg: "",
        phNo: "",
        date: "",
      });
    } else {
      console.error("Submission failed");
    }
  };

  return (
    <div className="bday">
      <form className="birthday-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Birthday Message:</label>
        <input
          type="text"
          name="bdayMsg"
          value={formData.bdayMsg}
          onChange={handleChange}
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phNo"
          value={formData.phNo}
          onChange={handleChange}
        />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BirthdayForm;
