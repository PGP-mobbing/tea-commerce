import { sanityClient, urlFor } from "../../sanity"

const Tea = ({props}) => {
return (
  <div>
    <h1>{props.title}</h1>
  </div>  
)
}

export const getStaticPaths = async() => {
  const query = '*[_type == "tea"]'
  const properties = await sanityClient.fetch(query);
  const paths = properties.map(property => ({
    params: {
      slug: property.slug.current
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async(context) =>{
  const query = `*[_type == "tea" && slug.current == "${context.params.slug}"]`
  const properties = await sanityClient.fetch(query);
  return {
    props: {
      props: properties[0],
    }
  }
}

export default Tea;