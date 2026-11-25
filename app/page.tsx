import { JsonLd } from "@/components/JsonLd";
import { Backdrop } from "@/components/landing/Backdrop";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { ProductShot } from "@/components/landing/ProductShot";
import { Showcase } from "@/components/landing/Showcase";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { faqSchema, softwareSchema } from "@/lib/seo/schemas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        <Backdrop />
        <SiteHeader />
        <main id="main" tabIndex={-1} className={styles.main}>
          <Hero />
          <ProductShot />
          <Features />
          <Showcase />
        </main>
      </div>
      <SiteFooter />
      <JsonLd data={softwareSchema()} />
      <JsonLd data={faqSchema()} />
    </>
  );
}
