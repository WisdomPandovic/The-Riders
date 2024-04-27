import Link from "next/link";

function Nav() {
  return (
    <div className="navbar">
      <div className="nav">
        <div>
          <h3>NEXT JS</h3>
        </div>
        <div className="nav_links">
          <Link href="/">Home</Link>
          <Link href="/users">Users</Link>
          <Link href="/product">Product</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}
export default Nav;
