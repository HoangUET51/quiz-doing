import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { dashBoardOverview, logout } from "../../../api/apiCreate/api-create";
import power from "../../../asset/img/power1.png";

export default function DashBoard() {
  const navigate = useNavigate();
  const account = useSelector((state: any) => state.users.account);
  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res.EC === 0) {
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const data = [
    { name: "Users", uv: 400, pv: 2400, amt: 2400 },
    { name: "Quizs", uv: 200, pv: 1400, amt: 400 },
    { name: "Questions", uv: 1000, pv: 5400, amt: 900 },
    { name: "Answers", uv: 700, pv: 3000, amt: 1200 },
  ];
  const [dashBoard, setDashBoard] = useState<any>();
  useEffect(() => {
    getDashBoardOverview();
  }, []);
  const getDashBoardOverview = async () => {
    let res = await dashBoardOverview();
    if (res.EC === 0) {
      setDashBoard(res.DT);
    }
  };
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse">
        <Dropdown className="mt-[-10px] mr-[2rem] border-none ">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="hover:!bg-white border-none"
          >
            <img src={power} alt="power" className="w-[30px] h-[30px]" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="hover:bg-[#e3dfdf]">
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleLogout}
              className="hover:bg-[#e3dfdf]"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="flex flex-col bg-[#f3f7f9] px-10 pt-2">
        <div className="border-b-2 pb-3">
          <p className="text-[1.5rem] leading-5 font-semibold mb-[1rem]">
            Analytics Dashboard
          </p>
          <p className="text-[1rem] leading-5">
            Welcome back, Lucy! We've missed you. 👋
          </p>
        </div>
        <div className="flex flex-row p-10 gap-5">
          <div className="w-2/5 flex flex-row gap-5 flex-wrap">
            <div className="w-[20rem] h-[20rem] bg-white rounded p-3 ">
              <div className="text-[1.3rem] font-semibold text-[#1ccae1]">
                Total User
              </div>
              <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                Total: {dashBoard?.users?.total}
              </div>
              <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                Count Admin: {dashBoard?.users?.countAdmin}
              </div>
              <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                Count Users: {dashBoard?.users?.countUsers}
              </div>
            </div>
            <div className="w-[20rem] h-[20rem] bg-white rounded p-3 text-[1.3rem] font-semibold text-[#1ccae1]">
              <div className="text-[1.3rem] font-semibold text-[#1ccae1]">
                Total Quiz
              </div>
              <div>
                <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                  Count Quiz: {dashBoard?.others?.countQuiz}
                </div>
              </div>
            </div>
            <div className="w-[20rem] h-[20rem] bg-white rounded p-3 text-[1.3rem] font-semibold text-[#1ccae1]">
              <div className="text-[1.3rem] font-semibold text-[#1ccae1]">
                Total Question
              </div>
              <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                Count Questions: {dashBoard?.others?.countQuestions}
              </div>
            </div>
            <div className="w-[20rem] h-[20rem] bg-white rounded p-3 text-[1.3rem] font-semibold text-[#1ccae1]">
              <div className="text-[1.3rem] font-semibold text-[#1ccae1]">
                Total Answer
              </div>
              <div className="p-2 text-[1rem] font-medium text-[#d9b8b8]">
                Count Answers: {dashBoard?.others?.countAnswers}
              </div>
            </div>
          </div>
          <div className="w-3/5 bg-white">
            <div className="p-3 font-medium text-[1rem]">Mobile / Desktop</div>
            <AreaChart
              width={1200}
              height={600}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
}
