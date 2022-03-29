import { sanityClient, urlFor } from '../../sanity'
import TeaCard from '../../components/TeaCard.jsx'

const Teas = ({properties}) => {
  return (
    <div>
      <h1>Teas</h1>
      <div>{properties.map((property, i) => <TeaCard key={i} response={property} />)}</div>
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