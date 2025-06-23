import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../redux/auth/authSlice";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading , isAuthenticated} = useSelector((state) => state.auth);

  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState({
    username: "",
    email: "",
    password: "",
  }); 


  const authDataChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if (isAuthenticated) {
      navigate("/")
    }
  },[isAuthenticated])
 
  const submitHandler = () => {
    if (signUp) {
      dispatch(registerUser(authData));
    } else {
      dispatch(loginUser(authData));
    }
  };

  return (
    <div className="  mx-auto w-full  bg-gray-50 flex items-center justify-center md:flex-row rounded-xl flex-col ">
      <div className="flex items-center justify-center w-full h-screen xl:basis-7/12  ">
        <div className="bg-white w-10/12 p-10 flex flex-col space-y-10">
          <h1 className="text-3xl text-center text-purple-600 font-bold ">
            {signUp ? "Kayıt Ol" : "Giriş Yap"}
          </h1>
          <div className="flex flex-col space-y-7  my-5">
            {signUp && (
              <input
                onChange={authDataChange}
                type="text"
                placeholder="Username"
                name="username"
                className="input-style"
              />
            )}
            <input
              onChange={authDataChange}
              type="text"
              placeholder="Email"
              name="email"
              className="input-style"
            />
            <input
              onChange={authDataChange}
              type="text"
              placeholder="Password"
              name="password"
              className="input-style"
            />
          </div>
          <div className="text-center text-gray-600  mb-4 ">
            {signUp ? (
              <span>
                Zaten Bir Hesabınız Var Mı?
                <b
                  onClick={() => setSignUp(!signUp)}
                  className="cursor-pointer pl-1 text-gray-800"
                >
                  Giriş Yap
                </b>
              </span>
            ) : (
              <span>
                Hesabınız Yok Mu?
                <b
                  onClick={() => setSignUp(!signUp)}
                  className="cursor-pointer pl-1 text-gray-800"
                >
                  Kayıt Ol
                </b>
              </span>
            )}
          </div>
          {signUp ? (
            <div onClick={submitHandler} className="auth-btn">
              <span className="flex items-center justify-center ">
                {loading ? (
                  <FaSpinner className="animate-spin text-2xl" />
                ) : (
                  "Kayıt Ol"
                )}
              </span>
            </div>
          ) : (
            <div onClick={submitHandler} className="auth-btn ">
              <span className="flex items-center justify-center ">
                {loading ? (
                  <FaSpinner className="animate-spin text-2xl" />
                ) : (
                  "Giriş Yap"
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-full  ">
        <img
          className="w-full h-screen rounded-r-xl"
          src="auth.png"
          alt="auth-image"
        />
      </div>
    </div>
  );
};

export default Auth;
