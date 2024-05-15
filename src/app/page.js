import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import HeroSection from '../app/components/homeComponent/HeroSection';
import FeaturesSection from '../app/components/homeComponent/FeaturesSection';
import RideComfortSection from '../app/components/homeComponent/RideComfortSection';
import ClientReviews from '../app/components/homeComponent/ClientReviews';
import BlogComponent from '../app/components/homeComponent/BlogComponent';
import BackgroundTextComponent from '../app/components/homeComponent/BackgroundTextComponent'

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
