import Image from "next/image";
import Link from "next/link";
import styles from "./why-furks.module.css";

const reasons = [
  {
    title: "Sipariş üzerine kavrum",
    description:
      "Sipariş geldikten sonra kavuruyoruz; rafta bekletmiyoruz.",
  },
  {
    title: "Şeffaf ve izlenebilir kaynak",
    description:
      "Özenle seçtiğimiz her çekirdeğin kökenini ve hasadını biliyoruz.",
  },
  {
    title: "Yanınızda destek",
    description:
      "Makine ayarı, reçete ve barista eğitimiyle işletmenizin yanındayız.",
  },
];

function ReasonRow({ reason }: { reason: (typeof reasons)[number] }) {
  return (
    <li className={styles.reason}>
      <span className={styles.accent} aria-hidden="true" />
      <h3 className={styles.reasonTitle}>{reason.title}</h3>
      <p className={styles.reasonDescription}>{reason.description}</p>
    </li>
  );
}

export function WhyFurks() {
  return (
    <section
      id="neden-furks"
      aria-labelledby="why-furks-heading"
      className={styles.section}
    >
      <div className={styles.layout}>
        <div className={styles.intro}>
          <h2 id="why-furks-heading" className={styles.heading}>
            Neden Furks?
          </h2>
          <p className={styles.tagline}>Tazeliği şansa bırakmıyoruz.</p>
          <p className={styles.description}>
            2019’da Moda’da beş kiloluk bir kavurma makinesiyle başladık.
            Bugün altı kişilik ekibimizle kırktan fazla işletmeye ulaşıyoruz.
            İlk günkü kuralımız aynı: sipariş gelmeden kavurmuyoruz.
          </p>
          <Link href="/hikayemiz" className={styles.storyLink}>
            Hikâyemizi keşfet
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h15m-6-7 7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <div className={styles.decoration} aria-hidden="true">
            <Image
              src="/images/why-furks/coffee-sack.webp"
              alt=""
              width={1942}
              height={809}
              sizes="(max-width: 1023px) 1px, (max-width: 1476px) 39vw, 576px"
              className={styles.sackImage}
            />
          </div>
        </div>

        <ul className={styles.reasons}>
          {reasons.map((reason) => (
            <ReasonRow key={reason.title} reason={reason} />
          ))}
        </ul>
      </div>
    </section>
  );
}
