import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/images/Union.png";
import styles from "../components/Login.module.css";
import { NavLink } from "react-router-dom";
import { UseUserLogin } from "../hooks/queries";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const PasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const schema = yup.object({
  username: yup
    .string()
    .required(" نام کاربری الزامی است")
    .min(3, " حداقل 3 کاراکتر"),
  password: yup
    .string()
    .required("رمز عبور الزامی است")
    .matches(
      PasswordRegex,
      "رمز عبور باید حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک، عدد و نماد باشد"
    ),
});

function Login() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate, error } = UseUserLogin();

  const onSubmit = (data) => {
    console.log(data);
    mutate(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          Cookies.set("token", response.token);
          toast.success(" با موفقیت وارد شدید");
          setIsAuthenticated(true);
        },
        onError: () => {
          setIsAuthenticated(false);
          error.response.data.message === "Invalid credentials"
            ? toast.error("نام کاربری یا رمز عبور اشتباه است")
            : toast.error("خطایی رخ داده است");
        },
      }
    );
    reset();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>بوت کمپ بوتواستارت</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.formTop}>
          <img src={logo} alt="لوگوی بوتواستارت" />
          <p className={styles.formTitle}>فرم ورود </p>
        </div>
        <div>
          <input
            type="text"
            placeholder="نام کاربری "
            {...register("username")}
            autoComplete="username"
          />
          <p className={styles.error}>{errors.username?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="رمز عبور "
            {...register("password")}
            autoComplete="current-password"
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>
        <button type="submit"> ورود </button>
        <NavLink to="/register" className={styles.link}>
          ایجاد حساب کاربری
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
