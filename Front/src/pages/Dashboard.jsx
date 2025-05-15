import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { CiSearch } from "react-icons/ci";
import { BsPersonCircle } from "react-icons/bs";
import styles from "../components/Dashboard.module.css";
import img from "../assets/images/setting-3.png";
import { IoIosLogOut } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { UseProducts } from "../hooks/queries";
import CreateProduct from "../components/CreateProduct";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/pagination";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const { isLoading, data, isError, error } = UseProducts({
    name: searchKey,
    page: page,
  });
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState();
  const [editProductId, setEditProductId] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const totalPage = data?.totalPages || 0;

  useEffect(() => {
    console.log(data);
    if (isError) {
      toast.error("خطایی رخ داد مجدد تلاش کنید");
    }
  }, [isError, error]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CiSearch size={24} />
        <input
          type="search"
          placeholder=" جستجو کالا"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className={styles.headersprof}>
          <BsPersonCircle size={35} />
          <div>
            <h5>pouyaf98</h5>
            <p>مدیر</p>
          </div>
        </div>
        <div className={styles.headerslog}>
          <IoIosLogOut
            className={styles.logout}
            size={25}
            onClick={() => setIsAuthenticated(false)}
          />
          <p>خروج</p>
        </div>
      </div>
      <div className={styles.addproduct}>
        <div>
          <img src={img} alt="مدیریت کالا" />
          <p>مدیریت کالا</p>
        </div>{" "}
        <button type="submit" onClick={() => setShowModal(true)}>
          افزودن محصول{" "}
        </button>
        {showModal && (
          <Modal
            OnClose={() => setShowModal(false)}
            modal={{ isEditModal, setIsEditModal, setShowModal, editProductId }}
          />
        )}
      </div>
      <div className={styles.productManagement}>
        {isLoading ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr className={styles.tabelHeader}>
                <th> نام کالا</th>
                <th> موجودی </th>
                <th> قیمت</th>
                <th> شناسه کالا </th>
                <th className={styles.options}></th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => {
                return (
                  <CreateProduct
                    key={item.id}
                    value={item}
                    delOpt={{ setShowDelModal }}
                    setId={{ setDeleteProductId, setEditProductId }}
                    modal={{ setIsEditModal, setShowModal }}
                  />
                );
              })}
            </tbody>
          </table>
        )}
        {showDelModal && (
          <DeleteModal value={{ setShowDelModal, deleteProductId }} />
        )}
      </div>
      <Pagination value={{page , setPage, totalPage }} />
    </div>
  );
}

export default Dashboard;
