import { Form, Formik, FormikContextType } from "formik";
import React from "react";
import FormSignUp from "../../components/blocks/Form_signup/form-sigup";
import * as Yup from "yup";
import { PostRegister } from "../../api/apiCreate/api-create";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface InitalValue {
  emaiSignUp: string;
  passwordSignUp: string;
  userName: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const formRef = React.createRef<FormikContextType<InitalValue>>();
  const initialValues = {
    emaiSignUp: "",
    passwordSignUp: "",
    userName: "",
  };

  const validationSchema = Yup.object().shape({
    emaiSignUp: Yup.string()
      .required("Please enter your email address")
      .email("Form email fail"),
    passwordSignUp: Yup.string()
      .required("Please enter your password")
      .min(6, "Your password is too short."),
  });

  const handleRegister = async () => {
    const { emaiSignUp, passwordSignUp, userName } = formRef.current
      ?.values as InitalValue;
    let data = await PostRegister(emaiSignUp, passwordSignUp, userName);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
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
      onSubmit={() => handleRegister()}
      validateOnChange
      validateOnMount
      validateOnBlur
    >
      <Form>
        <FormSignUp />
      </Form>
    </Formik>
  );
}
