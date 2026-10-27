import { getTastingImage, getTastingNotes } from "@/lib/products/presentation";
import { ImageViewport } from "./coffee-image";
import styles from "./coffee-catalog.module.css";

export function CoffeeTastingNotes({ notes }: { notes: string }) {
  return (
    <ul className={styles.tastingNotes}>
      {getTastingNotes(notes).map((note, index) => {
        const image = getTastingImage(note);

        return (
          <li key={`${note}-${index}`}>
            <span className={styles.tastingImage} aria-hidden="true">
              {image ? (
                <ImageViewport
                  image={image}
                  alt=""
                  sizes={`${image.width}px`}
                  maxHeight={65}
                />
              ) : (
                <svg
                  viewBox="0 0 60 60"
                  className="size-10 text-leaf"
                  fill="none"
                >
                  <path
                    d="M17 44C8 20 26 11 46 13c2 20-8 37-29 31Zm0 0 22-23"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <span>{note}</span>
          </li>
        );
      })}
    </ul>
  );
}
