import Image from "next/image";
import Link from "next/link";
import styles from "./home-hero.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-brand-title">
      <div className={styles.layout}>
        <div className={styles.brand}>
          <p className={styles.brandLocation}>
            Kadıköy, Moda <span aria-hidden="true">/</span> 2019
          </p>

          <div className={styles.identity}>
            <Image
              src="/icon.svg"
              width={256}
              height={256}
              alt=""
              className={styles.emblem}
            />
            <h1 id="home-brand-title" className={styles.brandName}>
              Furks Kahve
            </h1>
            <p className={styles.brandSignature}>Moda Roastery</p>
          </div>

          <div className={styles.statement}>
            <p className={styles.brandDescription}>
              Moda’da küçük partiler halinde,
              <br />
              sipariş üzerine kavrulan kahve.
            </p>
          </div>

          <div className={styles.actions}>
            <Link href="/kahvelerimiz" className={styles.primaryAction}>
              Kahvelerimizi Gör <ArrowIcon />
            </Link>
            <Link href="/toptan" className={styles.secondaryAction}>
              Toptan Teklif Al
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <Image
          src="/images/hero/furks-moda-storefront.webp"
          alt="Furks Kahve için hazırlanmış, Moda’da sıcak ışıklı bir kahve dükkânını temsil eden görsel"
          fill
          preload
          sizes="(max-width: 899px) 100vw, 74vw"
          className={styles.storefront}
        />
      </div>
    </section>
  );
}
