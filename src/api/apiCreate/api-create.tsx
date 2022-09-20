import axios from "../common/api-customiz";

const PostApiCreate = (
  email: any,
  password: any,
  name: any,
  role: any,
  image: any
) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const GetApiUsers = () => {
  return axios.get("api/v1/participant/all");
};

export { PostApiCreate, GetApiUsers };