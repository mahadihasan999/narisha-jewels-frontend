import Button from "assets/Form/Button";
import GoogleSignIn from "assets/Form/GoogleSignIn";
import TextField from "assets/Form/TextField";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const signInUser = useAuth();

  // handle change
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  //handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInUser(userInput.email, userInput.password);
  };

  //form inputs
  const Inputs = [
    {
      id: 1,
      type: "email",
      placeholder: "Email",
      value: `${userInput.email}`,
      name: "email",
    },
    {
      id: 2,
      type: "password",
      placeholder: "Password",
      value: `${userInput.password}`,
      name: "password",
    },
  ];
  return (
    <main className="h-screen w-full banner">
      <div className="flex flex-col justify-center items-center h-screen">
        {/* logo  */}
        {/* <Brand /> */}
        {/* sign up form  */}
        <form
          className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="py-6 justify-center items-center">
            <div>
              <p
                tabIndex={0}
                role="heading"
                aria-label="Login to your account"
                className="text-2xl font-bold leading-6 text-gray-800"
              >
                Login to your account
              </p>
              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Dont have account?{" "}
                <Link to="/signup">
                  <span
                    tabIndex={0}
                    role="link"
                    aria-label="Sign up here"
                    className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                  >
                    {" "}
                    Sign up here
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            {Inputs.map((input) => (
              <TextField
                key={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                name={input.name}
                onChange={handleChange}
              />
            ))}
          </div>
          <Button text="Sign In" />

          <GoogleSignIn text="Sign In With Google" />
        </form>
      </div>
    </main>
  );
};

export default SignIn;
