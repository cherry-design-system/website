import { Badge } from "@cherry-design-system/react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/site";
import { InstallSnippet } from "./InstallSnippet";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Badge variant="outline" dot className={styles.badge}>
        New in {site.version} · Zero runtime
      </Badge>
      <h1 id="hero-title" className={styles.title}>
        One color in.
        <br /> A design system out.
      </h1>
      <p className={styles.lead}>{site.shortDescription}</p>
      <div className={styles.ctas}>
        <ButtonLink
          size="lg"
          href={site.links.docs}
          trailingIcon={<ArrowRight />}
        >
          Get started
        </ButtonLink>
        <ButtonLink size="lg" variant="outline" href="#components">
          Browse components
        </ButtonLink>
      </div>
      <InstallSnippet location="hero" className={styles.install} />
    </section>
  );
}
