import { Form, Formik, FormikContextType } from "formik";
import React from "react";
import FormLogin from "../../components/blocks/Form_Login/Form-Login";
import * as Yup from "yup";
import { PostLogin } from "../../api/apiCreate/api-create";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface InitalValue {
  emaiLogin: string;
  passwordLogin: string;
}
export default function Login() {
  const formRef = React.createRef<FormikContextType<InitalValue>>();
  const initialValues: InitalValue = {
    emaiLogin: "",
    passwordLogin: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    emaiLogin: Yup.string()
      .required("Please enter your email address")
      .email("Form email fail"),
    passwordLogin: Yup.string()
      .required("Please enter your password")
      .min(8, "Your password is too short."),
  });

  const handleLogin = async () => {
    const { emaiLogin, passwordLogin } = formRef.current?.values as InitalValue;
    let data = await PostLogin(emaiLogin, passwordLogin);
    if (data && data.EC === 0) {
      toast.success("Login successfully");
      navigate("/");
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formRef}
      onSubmit={() => {}}
      validateOnChange
      validateOnMount
      validateOnBlur
    >
      <Form>
        <FormLogin handleLogin={handleLogin} />
      </Form>
    </Formik>
  );
}
