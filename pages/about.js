import styles from "../styles/About.module.css";
import Link from "next/link";

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About</h1>
      <h3>We believe every tea has a story... </h3>
      <p>
        The history of tea dates back to ancient China, almost 5,000 years ago. According to legend, in 2732 B.C. Emperor Shen Nung discovered tea when leaves from a wild tree blew into his pot of boiling water. He was immediately interested in the pleasant scent of the resulting brew, and drank some. Legend says the Emperor described a warm feeling as he drank the intriguing brew, as if the liquid was investigating every part of his body.
        Shen Nung named the brew &quot;ch&apos;a&quot;, the Chinese character meaning to check or investigate. In 200 B.C. a Han Dynasty Emperor ruled that when referring to tea, a special written character must be used illustrating wooden branches, grass, and a man between the two. This written character, also pronounced &quot;ch&apos;a&quot; symbolized the way tea brought humankind into balance with nature for the Chinese culture.
      </p>
      <h3>Let&apos;s go discover your <Link href="/teas"> story </Link>... </h3>
    </div>
  );
}

export default About;