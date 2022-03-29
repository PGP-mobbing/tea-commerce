import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../sanity';

const TeaCard = ({response}) => {
return (
<div className="tea-card">
  <Image src={urlFor(response.image).url()} alt={response.title} width={100} height={100}/>
  <h3>{response.title}</h3>
  <p>{response.tagline}</p>
  <Link href={`/teas/${response.slug.current}`}>
    Click here
  </Link>
 </div>
)
}

export default TeaCard;