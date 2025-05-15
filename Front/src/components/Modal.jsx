import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UseAddProduct } from "../hooks/queries";
import { toast } from "react-toastify";
import styles from "./Modal.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { UseEditProduct } from "../hooks/queries";

const schema = yup.object().shape({
  name: yup.string().required(" نام کالا الزامی است"),
  quantity: yup
    .number()
    .required(" تعداد کالا الزامی است")
    .integer()
    .typeError()
    .positive(" حداقل موجودی یک عدد است"),
  price: yup
    .number()
    .required("قیمت محصول الزامی است")
    .typeError()
    .positive("قیمت را به درستی وارد نمایید "),
});

function Modal({ modal }) {
  const queryclient = useQueryClient();
  const { isEditModal, setIsEditModal, setShowModal , editProductId } = modal;
  const OnClose = () => {
    setShowModal(false);
    setIsEditModal(false);
  };

  const { mutate } = isEditModal ? UseEditProduct() : UseAddProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(editProductId)
    isEditModal ?   mutate({id : editProductId , data} , {
      onSuccess: () => {
        toast.success(" اطلاعات محصول با موفقیت ویرایش شد ");
        queryclient.invalidateQueries(["products"]);
        OnClose();
      },
      onError: (error) => {
        error.response.data.message === "Invalid or expired token"
          ? toast.error("لطفا از حساب کاربری خود خارج شده و مجدد وارد شوید ")
          : toast.error("خطایی رخ داده است ");
      },
    }) :
    mutate(data, {
      onSuccess: () => {
        toast.success(" محصول با موفقیت افزوده شد ");
        queryclient.invalidateQueries(["products"]);
        OnClose();
      },
      onError: (error) => {
        error.response.data.message === "Invalid or expired token"
          ? toast.error("لطفا از حساب کاربری خود خارج شده و مجدد وارد شوید ")
          : toast.error("خطایی رخ داده است ");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formbox}>
        {isEditModal ? <h2>ویرایش اطلاعات</h2> : <h2>ایجاد محصول جدید</h2>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputBox}>
            <label htmlFor="name">نام کالا</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="نام کالا"
            />
            <p className={styles.error}>{errors.name?.message}</p>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="quantity"> تعداد </label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
              placeholder="تعداد موجودی"
            />
            <p className={styles.error}>{errors.quantity?.message}</p>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="price"> قیمت </label>
            <input
              type="number"
              id="price"
              {...register("price")}
              placeholder="قیمت"
            />
            <p className={styles.error}>{errors.price?.message}</p>
          </div>
          <div>
            {isEditModal ? (
              <button type="submit">ثبت اطلاعات جدید </button>
            ) : (
              <button type="submit">ایجاد</button>
            )}
            <button type="button" className={styles.cancelBtn} onClick={OnClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
