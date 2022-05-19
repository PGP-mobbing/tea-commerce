import Link from 'next/link';
import { useSnipcart } from "use-snipcart";

const Navbar = () => {
  const { cart = {} } = useSnipcart();
  return (
    <nav>
      <div className="logo">
        <p>TEA-COMMERCE</p>
      </div>
      <div className="nav-links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/teas"><a>Tea Shop</a></Link>
        <p>
        <a className="snipcart-checkout">
           
            <p>{cart.subtotal?.toFixed(2)} NOK</p>
          </a>
        </p>
        {/* <Link href="/cart"><a>Cart ()</a></Link> */}
      </div>
    </nav>
  );
}
 
export default Navbar;