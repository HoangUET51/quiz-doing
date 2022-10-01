import React, { useState } from "react";
import avatar from "../../../asset/img/avatar.jpg";
import { Button } from "../../parts/button/button";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import google from "../../../asset/img/google.png";
import microsoft from "../../../asset/img/Microsoft_logo.svg.png";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import eyeIcon from "../../../asset/img/eye.png";
import eyefIcon from "../../../asset/img/eyef.png";
import clsx from "clsx";
interface FormSignUpProps {}
export default function FormSignUp(props: FormSignUpProps) {
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
    console.log(showPass);
  };
  return (
    <div className="flex flex-row overflow-y-hidden">
      <div className="w-1/2 h-[100vh] bg-[#026451] flex flex-col justify-center items-center">
        <div className="text-white text-[24px] leading-[32px] w-[325px] h-[128px] text-center mb-[34px]">
          "We received 3x the responses using Typeform than from a
          professionally commissioned market research study."
        </div>
        <div className="h-[50px] w-[50px] mb-[10px]">
          <img src={avatar} alt="avatar" className="rounded-full" />
        </div>
        <div className="text-[15px] font-bold mb-[10px] text-white">
          <p>hoang.vuvan</p>
        </div>
        <div className="text-[15px] text-white font-semibold">
          <p>Developer VTI GROUP</p>
        </div>
      </div>
      <div className="w-1/2 rounded-l-lg">
        <div className="flex flex-row justify-end items-center gap-2 mt-2 mr-6">
          <span className="header-content">Already have an account?</span>
          <Button
            label="Log in"
            type="button"
            theme="secondary"
            className="!text-[#333] text-[15px] !border-[1px] !border-[#111] !rounded-none hover:!bg-[#d6d6d6]"
            onClick={handleLogin}
          />
        </div>

        <div className="flex flex-col justify-center h-full">
          <div className="text-center">
            <h1 className="text-[2.5rem] font-semibold">Typeform</h1>
            <div className="my-[25px] text-[20px] font-normal">
              Hello, who's this?
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div>
              <FormControl name="emaiSignUp">
                <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
                  Email
                </label>
                <Input
                  className="!max-w-full w-[300px]"
                  inputClassName="font-[Arial] text-[14px] outline-none"
                  errorClassName="!text-[#e54e87] !font-normal"
                  placeholder="Hoang.vuvan@vtn.com.vn"
                  hasShadow={false}
                />
              </FormControl>
            </div>
            <div className="relative">
              <div className="relative">
                <img
                  src={!showPass ? eyeIcon : eyefIcon}
                  className={clsx(
                    {
                      "w-[15px] h-[15px] absolute right-[10px] top-[50px] cursor-pointer":
                        !showPass,
                    },
                    {
                      "w-[30px] h-[30px] absolute right-[3px] top-[42px] text-black cursor-pointer":
                        showPass,
                    }
                  )}
                  alt="eye"
                  onClick={handleShowPass}
                />
              </div>
              <FormControl name="passwordSignUp">
                <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
                  Password
                </label>
                <Input
                  className="!max-w-full w-[300px]"
                  inputClassName="font-[Arial] text-[14px] outline-none"
                  errorClassName="!text-[#e54e87] !font-normal"
                  placeholder="At least 8 characters"
                  hasShadow={false}
                  type={showPass ? "text" : "password"}
                />
              </FormControl>
            </div>
            <div className="w-[100px] relative"></div>
            <div>
              <FormControl name="userName">
                <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
                  Name
                </label>
                <Input
                  className="!max-w-full w-[300px]"
                  inputClassName="font-[Arial] text-[14px] outline-none"
                  placeholder="Hoang Vu Van"
                  hasShadow={false}
                />
              </FormControl>
            </div>
            <div className="mt-[25px] w-[300px] flex flex-col gap-3">
              <Button
                type="submit"
                label="Sign up with email"
                className="w-[300px] !bg-[#333] !text-white font-semibold"
                size="m"
              />
              <div className="bg-[#BBBBBB] text-center relative h-[1px] my-[10px]">
                <span className="bg-[#fff] relative top-[-0.75rem] px-[15px]">
                  OR
                </span>
              </div>
              <div className="relative">
                <img
                  src={google}
                  alt="google"
                  className="absolute w-[25px] h-[25px] left-6 top-3"
                />
                <GoogleLogin
                  clientId="301801132811-fgurgek8jtqg75fcfsg2v371g8u587vn.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      type="button"
                      label="Log in to with Google"
                      className="w-[300px] bg-white !text-[#555] border-[1px] border-[#999]"
                      size="m"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    />
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="relative">
                <img
                  src={microsoft}
                  alt="microsoft"
                  className="absolute w-[25px] h-[25px] left-6 top-3"
                />
                <Button
                  type="button"
                  label="Log in to with Microsoft"
                  className="w-[300px]  bg-white !text-[#555] border-[1px] border-[#999]"
                  size="m"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
