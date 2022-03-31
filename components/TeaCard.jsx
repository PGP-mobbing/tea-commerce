import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity";
import styles from "../styles/Teas.module.css";
import useStore from "../store";

const TeaCard = ({ response }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className={styles.tea_card}>
      <Image
        src={urlFor(response.image).url()}
        alt={response.title}
        width={100}
        height={100}
      />
      <h3>{response.title}</h3>
      <p>{response.tagline}</p>
      <div className={styles.btn_see_more}>
        <Link href={`/teas/${response.slug.current}`}>See more</Link>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(response);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default TeaCard;
