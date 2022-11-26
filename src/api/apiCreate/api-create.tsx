import axios from "../common/api-customiz";

export interface AxiosResponse<T = any> {
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
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const GetApiUsers = (): Promise<AxiosResponse<any>> => {
  return axios.get("api/v1/participant/all");
};

const GetApiUsersWithPanigate = (
  page: any,
  limit: any
): Promise<AxiosResponse<any>> => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const PutApiUser = (
  id: any,
  name: any,
  role: any,
  image: any
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", name);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const DeleteUser = (id: any): Promise<AxiosResponse<any>> => {
  return axios.delete("api/v1/participant", { data: { id } });
};

const PostLogin = (
  email: string,
  password: string
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/login", { email, password, delay: 1000 });
};

const PostRegister = (
  email: string,
  password: string,
  username: string
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/register", { email, password, username });
};

const getQuizByUsers = (): Promise<AxiosResponse<any>> => {
  return axios.get("api/v1/quiz-by-participant");
};

const getQuestionsByQuiz = (id: any): Promise<AxiosResponse<any>> => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmit = (data: any): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/quiz-submit", { ...data });
};

const postCreateQuiz = (
  description: any,
  name: any,
  difficulty: any,
  image: any
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.post("api/v1/quiz", data);
};

const getAllQuiz = (): Promise<AxiosResponse<any>> => {
  return axios.get("api/v1/quiz/all");
};

const deleteQuiz = (id: any): Promise<AxiosResponse<any>> => {
  return axios.delete(`api/v1/quiz/${id}`);
};

const getAllQuestions = (): Promise<AxiosResponse<any>> => {
  return axios.get("api/v1/question/all");
};

const deleteQuestion = (id: any, quizId: any): Promise<AxiosResponse<any>> => {
  return axios.delete("api/v1/question", { data: { id, quizId } });
};

const createQuestion = (
  quiz_id: any,
  description: any,
  questionImage: any
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("api/v1/question", data);
};

const createAnswer = (
  question_id: any,
  description: any,
  correct_answer: any
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const updateQuiz = (
  id: any,
  description: any,
  name: any,
  difficulty: any,
  quizImage: any
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("api/v1/quiz", data);
};

const updateQuestion = (
  id: any,
  quiz_id: any,
  description: any,
  questionImage: any
): Promise<AxiosResponse<any>> => {
  const data = new FormData();
  data.append("id", id);
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.put("api/v1/question", data);
};

const assignQuizForUser = (
  quizId: any,
  userId: any
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const logout = (
  email: any,
  refresh_token: any
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/logout", { email, refresh_token });
};

const dashBoardOverview = (): Promise<AxiosResponse<any>> => {
  return axios.get("api/v1/overview");
};

const changePassword = (
  current_password: any,
  new_password: any
): Promise<AxiosResponse<any>> => {
  return axios.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

export {
  PostApiCreate,
  GetApiUsers,
  PutApiUser,
  DeleteUser,
  GetApiUsersWithPanigate,
  PostLogin,
  PostRegister,
  getQuizByUsers,
  getQuestionsByQuiz,
  postSubmit,
  postCreateQuiz,
  getAllQuiz,
  deleteQuiz,
  getAllQuestions,
  deleteQuestion,
  createQuestion,
  createAnswer,
  updateQuiz,
  updateQuestion,
  assignQuizForUser,
  logout,
  dashBoardOverview,
  changePassword,
};
