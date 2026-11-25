import {
  Card,
  CardDescription,
  CardIcon,
  CardTitle,
} from "@cherry-design-system/react";
import { Palette, Sparkles, Zap } from "lucide-react";
import { features } from "@/lib/content";
import styles from "./Features.module.css";

const icons = {
  theming: <Palette />,
  "ai-kit": <Sparkles />,
  "plain-css": <Zap />,
} as const;

export function Features() {
  return (
    <section className={styles.features} aria-labelledby="features-title">
      <h2 id="features-title" className="visually-hidden">
        Why cherry
      </h2>
      {features.map((feature) => (
        <Card
          key={feature.id}
          id={feature.id}
          variant="elevated"
          className={styles.box}
        >
          <CardIcon>{icons[feature.id]}</CardIcon>
          <CardTitle level={3}>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </Card>
      ))}
    </section>
  );
}
