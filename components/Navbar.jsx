import Link from 'next/link';
import Image from 'next/image';
import useStore from '../store';

const Navbar = () => {
  const cartItems = useStore((state) => state.cartItems.length);

  return (
    <nav>
      <div className="logo">
        <p>TEA-COMMERCE</p>
      </div>
      <div className="nav-links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/teas"><a>Tea Shop</a></Link>
        <Link href="/cart"><a>Cart<p>{cartItems}</p></a></Link>
      </div>
    </nav>
  );
}
 
export default Navbar;