import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav>
      {/* <Image src="/logo.png" width={128} height={72} alt="" /> */}
      <div className="logo">
        <p>TEA-COMMERCE</p>
      </div>
      <div className="nav-links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/about"><a>About</a></Link>
        <Link href="/teas"><a>Tea Shop</a></Link>
      </div>
    </nav>
  );
}
 
export default Navbar;