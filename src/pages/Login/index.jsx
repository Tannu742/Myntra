import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import loginpic from "../../assets/img/loginpic.png";

const Login = () => {
  const [formData, setFormData] = useState({ mobile: "", agree: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(data.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }
    if (!data.agree) {
      newErrors.agree = "You must agree to the Terms & Privacy Policy.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
      alert(`OTP sent to ${formData.mobile}`);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={8} md={6} lg={4} className="shadow-sm bg-white rounded">
          <div className="text-center mb-3 mt-4">
            <img src={loginpic} alt="Login" width="250" className="mb-3" />
            <p className="fs-5">
              <b>Login</b> or <b>Signup</b>
            </p>
          </div>

          {submitted && (
            <Alert variant="success" className="py-2 text-center">
              OTP sent successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Control
                type="tel"
                name="mobile"
                placeholder="+91 | Mobile Number*"
                value={formData.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="agree">
              <Form.Check
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                label={
                  <>
                    By continuing, I agree to the{" "}
                    <span className="text-danger fw-semibold">Terms of Use</span> &{" "}
                    <span className="text-danger fw-semibold">Privacy Policy</span> and I am above 18 years old.
                  </>
                }
              />
              {errors.agree && <div className="text-danger small mt-1">{errors.agree}</div>}
            </Form.Group>
            <Button
              type="submit"
              className={`w-100 fw-semibold ${
                formData.agree ? "btn-danger" : "btn-secondary"
              }`}
              disabled={!formData.agree}
            >
              Continue
            </Button>

            <div className="text-center mt-3 small text-secondary">
              Have trouble logging in?{" "}
              <span
                className="text-danger fw-semibold"
                style={{ cursor: "pointer" }}
              >
                Get Help
              </span>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
