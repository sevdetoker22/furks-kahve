import Image from "next/image";
import Link from "next/link";
import styles from "./why-furks.module.css";

const reasons = [
  {
    title: "Sipariş üzerine kavrum",
    description:
      "Kahveyi sipariş geldikten sonra kavuruyoruz; rafta bekletmiyoruz.",
    image: "/images/why-furks/roasted-beans.webp",
  },
  {
    title: "Şeffaf kaynak",
    description: "Kökeni belli, özenle seçilmiş çekirdeklerle çalışıyoruz.",
    image: "/images/why-furks/coffee-branch.webp",
  },
  {
    title: "İzlenebilir kahve",
    description:
      "Her kahvenin hangi çiftlikten ve hangi hasattan geldiğini biliyoruz.",
    image: "/images/why-furks/coffee-cup.webp",
  },
  {
    title: "Yanınızda destek",
    description:
      "Toptan müşterilerimize makine ayarı, reçete ve barista eğitimi desteği sağlıyoruz.",
    image: "/images/why-furks/coffee-tamper.webp",
  },
];

function ReasonRow({ reason }: { reason: (typeof reasons)[number] }) {
  return (
    <li className={styles.reason}>
      <div className={styles.artwork} aria-hidden="true">
        <Image
          src={reason.image}
          alt=""
          fill
          sizes="(max-width: 639px) 96px, (max-width: 1023px) 144px, 192px"
          className={styles.reasonImage}
        />
      </div>
      <div className={styles.reasonCopy}>
        <span className={styles.accent} aria-hidden="true" />
        <h3 className={styles.reasonTitle}>{reason.title}</h3>
        <p className={styles.reasonDescription}>{reason.description}</p>
      </div>
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
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Neden Furks?
          </p>
          <h2 id="why-furks-heading" className={styles.heading}>
            <span>Tazeliği</span>{" "}
            <span>şansa</span>{" "}
            <span>bırakmıyoruz.</span>
          </h2>
          <p className={styles.description}>
            İyi kahvenin yalnızca çekirdekle değil; doğru kavurma, şeffaf kaynak
            ve sürekli destekle mümkün olduğuna inanıyoruz.
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
          <div className={styles.botanical} aria-hidden="true">
            <Image
              src="/images/why-furks/coffee-botanical.webp"
              alt=""
              width={720}
              height={720}
              sizes="(max-width: 1023px) 1px, 600px"
              className={styles.botanicalImage}
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
