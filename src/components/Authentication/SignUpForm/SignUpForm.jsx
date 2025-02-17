import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../FormInput/FormInput";
import Button from "../../global/Button/Button";

import { SignupContainer, SignTitle, SignText } from "./SignUpForm.styels";
import { useDispatch } from "react-redux";
import { signUpStart, singUpSuccess } from "../../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //confirm if password are same
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }
    if (password.length < 6) {
      return alert("Weak Password, try again");
    }
    try {
      dispatch(signUpStart(email, password, displayName));
      if (singUpSuccess) {
        navigate("/");
      }
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  return (
    <SignupContainer>
      <SignTitle>Don't have an account?</SignTitle>
      <SignText>Sign up Now!</SignText>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUpForm;
