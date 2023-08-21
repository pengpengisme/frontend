import React from "react";
import Meta from "./Meta";
import { Link } from "react-router-dom";
import Container from "./Container";
import CustomInput from "./CustomInput";

const Forgotpassword = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">重設密碼</h3>
              <h6 className="text-center mt-2 mb-4">
                We will send you an email to reset your password
              </h6>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="Email" />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button" type="submit">
                      Submit
                    </button>
                    <Link className="forgotlink" to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;