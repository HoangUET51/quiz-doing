import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import google from "../../../asset/img/google.png";
import microsoft from "../../../asset/img/Microsoft_logo.svg.png";
import spinner from "../../../asset/img/sp.png";
import { Button } from "../../parts/button/button";
import { FormControl } from "../../parts/form-control/form-control";
import { Input } from "../../parts/input/input";
interface FormLoginProps {
  handleLogin: () => void;
  isLoading: boolean;
}
export default function FormLogin(props: FormLoginProps) {
  const navigate = useNavigate();
  const { handleLogin, isLoading } = props;
  const responseGoogle = (response: any) => {};
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="h-[100vh] overflow-y-hidden">
      <div className="header-login flex flex-row justify-end items-center gap-2 mt-2 mr-6">
        <span className="header-content">Don't have an account yet?</span>
        <Button
          label="Sign-up"
          type="button"
          theme="secondary"
          className="!text-[#333] text-[15px] !border-[1px] !border-[#111] !rounded-none hover:!bg-[#d6d6d6]"
          onClick={handleSignUp}
        />
        <span className="cursor-pointer decoration-1 border-b-[1px] border-[#333]">
          Need help?
        </span>
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
            <FormControl name="emaiLogin">
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
          <div>
            <FormControl name="passwordLogin">
              <label htmlFor="" className="text-[16px] leading-6 py-[7px]">
                Password
              </label>
              <Input
                className="!max-w-full w-[300px]"
                inputClassName="font-[Arial] text-[14px] outline-none"
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
          <div className="mt-[25px] w-[300px] flex flex-col gap-3 relative">
            <div>
              <Button
                type="button"
                label="Log in to Typeform"
                className="w-[300px] !bg-[#333] !text-white font-semibold"
                size="m"
                onClick={handleLogin}
                disabled={isLoading}
              />
              {isLoading && (
                <img
                  src={spinner}
                  className="w-[30px] h-[30px] absolute top-[10px] left-[40px] animate-spin"
                  alt="spinner"
                />
              )}
            </div>

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
  );
}
