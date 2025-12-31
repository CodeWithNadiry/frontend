import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useAuthContext } from "../../../../context/AuthContext";
import { formatPKR } from "../../../../utils/formatter";
import { useModalContext } from "../../../../context/ModalContext";
import { useProductContext } from "../../../../context/ProductContext";

const ProductCard = ({ data, onAddToCart }) => {
  const {
    _id,
    name,
    price,
    regularPrice,
    savings,
    description,
    image,
    isSale,
    collection,
    slug,
  } = data;

  const { isAdmin } = useAuthContext();
  const { openModal } = useModalContext();
  const fetchAllProducts = useProductContext().fetchAllProducts;
  const navigate = useNavigate();

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    const result = onAddToCart(data);

    if (result.ok) {
      openModal("cart");
    } else {
      if (result.reason === "NOT_AUTH") navigate("/auth/login");
      if (result.reason === "ADMIN") alert("Admins cannot add items to cart");
    }
  }

  function handleQuickView(e) {
    e.preventDefault();
    e.stopPropagation();
    openModal("quickview", data);
  }

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/admin/products/edit/${_id}`);
  }

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://backend-production-fccb.up.railway.app/admin/products/${_id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to delete product");

      fetchAllProducts();
      alert("Product deleted successfully.");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <article className={styles.card}>

      {/* Add / Edit Button */}
      <button
        className={styles.addToCartButton}
        onClick={isAdmin ? handleEdit : handleAddToCart}
      >
        {isAdmin ? <FiEdit size={20} title="Edit product" /> : <FiPlus size={20} title="Add to cart" />}
      </button>

      {/* Quick View / Delete Button */}
      <button
        className={styles.quickViewButton}
        onClick={isAdmin ? handleDelete : handleQuickView}
      >
        {isAdmin ? <FiTrash2 size={20} title="Delete product" /> : <FiEye size={20} title="Quick view" />}
      </button>

      {/* Card Click (Normal Navigation) */}
      <Link
        to={`/collections/${collection}/products/${slug}`}
        className={styles.linkWrapper}
      >
        <div className={styles.imageContainer}>
          {isSale && <span className={styles.saleBadge}>SALE</span>}
          <img
            src={image ? `https://backend-production-fccb.up.railway.app/${image}` : "/placeholder.png"}
            alt={name}
            className={styles.productImage}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>
            {name} {description}
          </p>
          <div className={styles.pricing}>
            <div className={styles.priceCurrent}>
              {formatPKR(price)}
              {regularPrice && (
                <span className={styles.priceOriginal}>
                  {formatPKR(regularPrice)}
                </span>
              )}
            </div>
            {savings && (
              <span className={styles.priceSavings}>
                Save {formatPKR(savings)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;