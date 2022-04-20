 import { sanityClient } from '../../lib/sanity/client';

import Cart from "../../components/Cart";
import CartSummary from "../../components/CartSummary";

import TeaCard from '../../components/TeaCard';
import styles from "../../styles/Teas.module.css";

const Teas = ({products}) => {
  
  return (
    <div className={styles.container}>
      <h1>Teas</h1>
      <Cart className={styles.teas_container}>
        {products.map((product, i) => <TeaCard key={i} product={product} />)}
        <CartSummary />
      </Cart>
    </div>
  )
}

export const getStaticProps = async() =>{
  const query = '*[_type == "tea"]'
  const products = await sanityClient.fetch(query);
  return {
    props: {
      products
    }
  }
}

export default Teas;