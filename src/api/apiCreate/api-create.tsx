import axios from "../common/api-customiz";

export interface AxiosResponse<T = any, D = any> {
  DT: T;
  EC: number;
  EM: string;
  totalPages?: number;
  totalRows?: number;
}

const PostApiCreate = (
  email: any,
  password: any,
  name: any,
  role: any,
  image: any
): Promise<AxiosResponse<any, any>> => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const GetApiUsers = (): Promise<AxiosResponse<any, any>> => {
  return axios.get("api/v1/participant/all");
};

const GetApiUsersWithPanigate = (
  page: any,
  limit: any
): Promise<AxiosResponse<any, any>> => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const PutApiUser = (
  id: any,
  name: any,
  role: any,
  image: any
): Promise<AxiosResponse<any, any>> => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const DeleteUser = (id: any): Promise<AxiosResponse<any, any>> => {
  return axios.delete("api/v1/participant", { data: { id } });
};

export {
  PostApiCreate,
  GetApiUsers,
  PutApiUser,
  DeleteUser,
  GetApiUsersWithPanigate,
};
