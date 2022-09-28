import React from "react";
import { Button } from "../../parts/button/button";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
import google from "../../../asset/img/google.png";
import microsoft from "../../../asset/img/Microsoft_logo.svg.png";
import { GoogleLogin } from "react-google-login";
interface FormLoginProps {
  handleLogin: () => void;
}
export default function FormLogin(props: FormLoginProps) {
  const { handleLogin } = props;
  const responseGoogle = (response: any) => {
    console.log(response);
  };
  return (
    <div>
      <div className="header-login flex flex-row justify-end items-center gap-2 mt-2 mr-6">
        <span className="header-content">Don't have an account yet?</span>
        <Button
          label="Sign-up"
          type="button"
          theme="secondary"
          className="!text-[#333] text-[15px] !border-[1px] !border-[#111] !rounded-none "
        />
        <span className="cursor-pointer decoration-1 border-b-[1px] border-[#333]">
          Need help?
        </span>
      </div>
      <div className="text-center mt-[20rem]">
        <h1 className="text-[2.5rem] font-semibold">Typeform</h1>
        <div className="my-[25px] text-[20px] font-normal">
          Hello, who's this?
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <FormControl name="emaiLogin">
            <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
              Email
            </label>
            <Input
              className="!max-w-full w-[300px]"
              inputClassName="font-[Arial] text-[14px]"
              errorClassName="!text-[#e54e87] !font-normal"
              placeholder="Hoang.vuvan@vtn.com.vn"
              hasShadow={false}
            />
          </FormControl>
        </div>
        <div>
          <FormControl name="passwordLogin">
            <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
              Password
            </label>
            <Input
              className="!max-w-full w-[300px]"
              inputClassName="font-[Arial] text-[14px]"
              errorClassName="!text-[#e54e87] !font-normal"
              placeholder="At least 8 characters"
              hasShadow={false}
              type="password"
            />
          </FormControl>

          <div className="decoration-1 mb-[25px] mt-[10px] text-[#777] border-b-[1px] border-[#333] w-[126px] cursor-pointer">
            Forgot password?
          </div>
        </div>
        <div className="mt-[25px] w-[300px] flex flex-col gap-3">
          <Button
            type="button"
            label="Log in to Typeform"
            className="w-[300px] bg-[#333] text-white font-semibold mb-[25px]"
            size="m"
            onClick={handleLogin}
          />
          <div className="relative">
            <img
              src={google}
              alt="google"
              className="absolute w-[25px] h-[25px] left-6 top-3"
            />
            <GoogleLogin
              clientId="REQUIRED"
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
  );
}
