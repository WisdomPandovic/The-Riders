// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from 'next/link';
import HeroSection from '../components/homeComponent/HeroSection';
import FeaturesSection from '../components/homeComponent/FeaturesSection';
import RideComfortSection from '../components/homeComponent/RideComfortSection';
import ClientReviews from '../components/homeComponent/ClientReviews';
import BlogComponent from '../components/homeComponent/BlogComponent';
import BackgroundTextComponent from '../components/homeComponent/BackgroundTextComponent'

export default function Home() {
  return (
    <main >
      <HeroSection />
      <FeaturesSection/>
      <RideComfortSection/>
      <BackgroundTextComponent/>
      <ClientReviews/>
      <BlogComponent/>    
    </main>
  );
}
