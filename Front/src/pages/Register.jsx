import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import logo from "../assets/images/Union.png";
import styles from "../components/Register.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { UseRegisterUser } from "../hooks/queries";
import { useNavigate } from "react-router-dom";

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
  ConfirmPassword: yup
    .string()
    .required("تایید رمز عبور الزامی است")
    .oneOf([yup.ref("password")], " با رمز عبور وارد شده مطابقت ندارد"),
});

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { mutate, error } = UseRegisterUser();

  const onSubmit = (data) => {
    const { ConfirmPassword, ...finalData } = data;
    console.log(finalData);
    mutate(finalData, {
      onSuccess: () => {
        toast.success(" ثبت نام با موفقیت انجام شد");
        navigate("/Login");
      },
      onError: () => {
        error?.response?.data?.message === "User already exists"
          ? toast.error("این نام کاربری قبلاً ثبت شده است ")
          : toast.error("خطایی رخ داده است ، لطفاً دوباره تلاش کنید ");
      },
    });
    reset();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>بوت کمپ بوتواستارت</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.formTop}>
          <img src={logo} alt="لوگوی بوتواستارت" />
          <p className={styles.formTitle}>فرم ثبت نام </p>
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
            autoComplete="new-password"
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>
        <div>
          <input
            type="password"
            placeholder="تکرار رمز عبور"
            {...register("ConfirmPassword")}
            autoComplete="new-password"
          />
          <p className={styles.error}>{errors.ConfirmPassword?.message}</p>
        </div>
        <button type="submit"> ثبت نام </button>
        <NavLink to="/Login" className={styles.link}>
          حساب کاربری دارید ؟
        </NavLink>
      </form>
    </div>
  );
}

export default Register;
