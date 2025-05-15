import styles from "./CreateProduct.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function CreateProduct({ value , delOpt , setId , modal}) {
  const { name, quantity, price, id } = value;
  const {setShowDelModal} = delOpt
  const {setDeleteProductId , setEditProductId} = setId
  const {setIsEditModal , setShowModal} = modal
  const deleteHandler = () => {
    setDeleteProductId(id)
    setShowDelModal(true);
  };

  const editHandler = () => {
    setEditProductId(id)
    setShowModal(true);
    setIsEditModal(true)
  }

  return (
    <tr className={styles.tabelLine}>
      <td> {name} </td>
      <td> {quantity} </td>
      <td> {price} هزار تومان</td>
      <td> {id} </td>
      <td className={styles.options}>
        <FaRegEdit color="#4ADE80" size={20} style={{ cursor: "pointer" }}  onClick={editHandler} />
        <RiDeleteBin6Line
          color="#F43F5E"
          size={20}
          style={{ cursor: "pointer" }}
          onClick={deleteHandler}
        />
      </td>
    </tr>
  );
}

export default CreateProduct;
