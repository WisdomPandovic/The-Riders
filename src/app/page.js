import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link'
import ProductCard from "./components/ProductCard";
import CreateUserForm from './components/CreateUserForm';
import CreateProductForm from './components/CreateProductForm';
import TestComponent from './components/TestComponent';
import ProductsList from "./components/ProductsList";

export default function Home() {
  return (
    <main className={styles.main}>
     <h2>Hello world</h2>
     <Link href="/users">Users</Link>
     <ProductCard/>
     <CreateUserForm/>
     <CreateProductForm/>
     <TestComponent />
     <ProductsList/>
    </main>
  );
}
