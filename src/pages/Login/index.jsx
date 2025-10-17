import React, { useState } from "react";
import loginpic from "../../assets/img/loginpic.png";

const Login = () => {
  const [formData, setFormData] = useState("false");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please correct the errors in the form.");
    } else {
      alert("Saved! Data: " + formData);
    }
  };

  return (
    <div className="container-myntra">
      <div className="row pb-5">
        <img src={loginpic} alt="loginlogo" width={330} />
        <p>
          <b>Login</b> or <b>Signup</b>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="mobile"
              placeholder="91+ | Mobile Number*"
              value={formData.mobile}
              onChange={handleChange}
              className={`myntra-input ${errors.mobile ? "input-error" : ""}`}
            />
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>
         
          <p className="fs text-secondary fw-semibold py-2">
            {/* <input type="checkox"/> */}
             <input class="form-check-input" type="checkbox" value="" id="checkDefault"/>
            By continuing, I agreet the
            <span className="colour">Terms of Use</span> & <br />{" "}
            <span className="colour">Privacy Policy</span> and I am above 18
            years old.
          </p>
         
          <button type="submit" className="myntra-button">
            Continue
          </button>
          <span className="text-secondary fs">
            Have Trouble logging in? <span className="colour">Get Help</span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
