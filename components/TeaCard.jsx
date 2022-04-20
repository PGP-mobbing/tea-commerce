import Image from "next/image";
import Link from "next/link";

import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

import { urlFor } from "../lib/sanity/client";
import styles from "../styles/Teas.module.css";

const TeaCard = ({ product }) => {
  const { addItem } = useShoppingCart();
 
  return (
    <div className={styles.tea_card}>
      <Image
        src={urlFor(product.image).url()}
        alt={product.title}
        width={100}
        height={100}
      />
      <h3>{product.title}</h3>
      <p>{product.tagline}</p>
      <p>{formatCurrencyString({ value: product.price*100, currency: "nok"})}</p>
      <div className={styles.btn_see_more}>
        <Link href={`/teas/${product.slug.current}`}>See more</Link>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default TeaCard;
