import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import CreateUserForm from './components/CreateUserForm';
import CreateProductForm from './components/CreateProductForm';
import TestComponent from './components/TestComponent';
import ProductsList from "./components/ProductsList";
import Nav from "../app/components/Nav"

export default function Home() {
  return (
    <main >
     <Nav/>
     <CreateUserForm/>
     <CreateProductForm/>
     <TestComponent />
     <ProductsList/>
    </main>
  );
}
