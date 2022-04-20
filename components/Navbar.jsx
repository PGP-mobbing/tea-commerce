import Link from 'next/link';

const Navbar = () => {

  return (
    <nav>
      <div className="logo">
        <p>TEA-COMMERCE</p>
      </div>
      <div className="nav-links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/teas"><a>Tea Shop</a></Link>
        {/* <Link href="/cart"><a>Cart ()</a></Link> */}
      </div>
    </nav>
  );
}
 
export default Navbar;