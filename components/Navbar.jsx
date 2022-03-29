import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav>
      <Image src="/logo.png" width={128} height={72} alt="" />
      <div className="logo">
        <h1>TEA COMMERCE</h1>
      </div>
      <Link href="/"><a>Home</a></Link>
      <Link href="/about"><a>About</a></Link>
      <Link href="/teas"><a>Tea Shop</a></Link>
    </nav>
  );
}
 
export default Navbar;