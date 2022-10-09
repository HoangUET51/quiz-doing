import { createSlice } from "@reduxjs/toolkit";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
interface InitalValue {
  account: {
    access_token: string;
    email: string;
    image: string;
    refresh_token: string;
    role: string;
    username: string;
  };
  isAuthentication: boolean;
}
const initialState: InitalValue = {
  account: {
    access_token: "",
    email: "",
    image: "",
    refresh_token: "",
    role: "",
    username: "",
  },
  isAuthentication: false,
};

export const fetchDataSuccess = (data: any) => {
  return {
    type: FETCH_DATA_SUCCESS,
    data: data,
  };
};
export const useSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [FETCH_DATA_SUCCESS]: (state: any, action: any) => {
      return {
        ...state,
        account: {
          access_token: action.data.DT.access_token,
          email: action.data.DT.email,
          image: action.data.DT.image,
          refresh_token: action.data.DT.refresh_token,
          role: action.data.DT.role,
          username: action.data.DT.username,
        },
        isAuthentication: true,
      };
    },
  },
});

export default useSlice.reducer;
