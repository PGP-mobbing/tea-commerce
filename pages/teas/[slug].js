import { sanityClient, urlFor } from "../../lib/sanity/client";
import Image from "next/image";
import styles from "../../styles/Teas.module.css";

const Tea = ({ props }) => {

  return (
    <div className={styles.tea_container}>
      <h1>{props.title}</h1>
      <Image src={urlFor(props.image).url()} alt="" width={100} height={100} />
      <p>{props.tagline}</p>
      <p>{props.stock} left</p>
      <p>{props.price} kr</p>
      <p>{props.details.description}</p>
      <p>{props.details.intructions}</p>
      {props.details.ingredients.map((ingredient, i) => <p key={i}>{ingredient}</p>
      )}
      <p>{props.details.caffeine} mcg </p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = '*[_type == "tea"]';
  const properties = await sanityClient.fetch(query);
  const paths = properties.map((property) => ({
    params: {
      slug: property.slug.current,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const query = `*[_type == "tea" && slug.current == "${context.params.slug}"]`;
  const properties = await sanityClient.fetch(query);
  return {
    props: {
      props: properties[0],
    },
  };
};

export default Tea;
