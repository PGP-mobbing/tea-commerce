import { sanityClient, urlFor } from '../../lib/sanity/client';
import TeaCard from '../../components/TeaCard.jsx';
import styles from "../../styles/Teas.module.css";

const Teas = ({properties}) => {
  return (
    <div className={styles.container}>
      <h1>Teas</h1>
      <div className={styles.teas_container}>{properties.map((property, i) => <TeaCard key={i} response={property} />)}</div>
    </div>
  )
}

export const getStaticProps = async() =>{
  const query = '*[_type == "tea"]'
  const properties = await sanityClient.fetch(query);
  return {
    props: {
      properties
    }
  }
}

export default Teas;