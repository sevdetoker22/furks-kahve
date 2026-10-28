"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { getTastingNotes } from "@/lib/products/presentation";
import type { Product } from "@/lib/supabase/products";
import { CoffeeDetailCard } from "./coffee-detail-card";
import { CoffeeImage } from "./coffee-image";
import styles from "./coffee-catalog.module.css";

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
}

function revealDetailIfNeeded(panel: HTMLDivElement | null) {
  if (!panel) return;
  const rect = panel.getBoundingClientRect();
  const navbarBottom =
    document.querySelector("header")?.getBoundingClientRect().bottom ?? 80;
  // Only reveal the beginning of an offscreen panel, below the sticky navbar.
  if (rect.top > window.innerHeight - 140 || rect.top < navbarBottom) {
    window.scrollTo({
      top: window.scrollY + rect.top - navbarBottom - 24,
      behavior: scrollBehavior(),
    });
  }
}

function CarouselArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={
          direction === "left"
            ? "M19 12H5m6-6-6 6 6 6"
            : "M5 12h14m-6-6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoffeeCarousel({
  products,
  initialSelectedCoffeeId = "",
}: {
  products: Product[];
  initialSelectedCoffeeId?: string;
}) {
  const initialProduct =
    products.find(
      (product) => String(product.id) === initialSelectedCoffeeId,
    ) ?? null;
  const [selectedCoffeeId, setSelectedCoffeeId] = useState<
    Product["id"] | null
  >(initialProduct?.id ?? null);
  const [displayedProduct, setDisplayedProduct] = useState<Product | null>(
    initialProduct,
  );
  const [edges, setEdges] = useState({
    start: true,
    end: products.length <= 1,
  });
  const carouselRef = useRef<HTMLUListElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef(false);
  const selectedButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const initialIndex = products.findIndex(
      (product) => String(product.id) === initialSelectedCoffeeId,
    );
    if (initialIndex < 0) return;

    const frame = requestAnimationFrame(() => {
      const carousel = carouselRef.current;
      const item = carousel?.children[initialIndex] as HTMLElement | undefined;
      if (!carousel || !item) return;
      selectedButtonRef.current = item.querySelector("button");
      if (item.offsetLeft + item.offsetWidth > carousel.clientWidth) {
        carousel.scrollTo({ left: item.offsetLeft, behavior: "instant" });
      }
      revealDetailIfNeeded(detailRef.current);
    });
    return () => cancelAnimationFrame(frame);
  }, [initialSelectedCoffeeId, products]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const updateEdges = () => {
      const next = {
        start: carousel.scrollLeft <= 4,
        end:
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth - 2,
      };
      setEdges((current) =>
        current.start === next.start && current.end === next.end
          ? current
          : next,
      );
    };
    const frame = requestAnimationFrame(updateEdges);
    carousel.addEventListener("scroll", updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(carousel);
    return () => {
      cancelAnimationFrame(frame);
      carousel.removeEventListener("scroll", updateEdges);
      observer.disconnect();
    };
  }, []);

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const first = carousel.children[0] as HTMLElement | undefined;
    const second = carousel.children[1] as HTMLElement | undefined;
    const step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : carousel.clientWidth;
    carousel.scrollBy({ left: direction * step, behavior: scrollBehavior() });
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Escape" && selectedCoffeeId !== null) {
      event.preventDefault();
      closeDetail();
      return;
    }
    let targetIndex: number;
    switch (event.key) {
      case "ArrowLeft":
        targetIndex = Math.max(0, index - 1);
        break;
      case "ArrowRight":
        targetIndex = Math.min(products.length - 1, index + 1);
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = products.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const carousel = carouselRef.current;
    const item = carousel?.children[targetIndex] as HTMLElement | undefined;
    if (!carousel || !item) return;
    item.querySelector("button")?.focus({ preventScroll: true });
    const left = item.offsetLeft;
    if (left < carousel.scrollLeft) {
      carousel.scrollTo({ left, behavior: scrollBehavior() });
    } else if (
      left + item.offsetWidth >
      carousel.scrollLeft + carousel.clientWidth
    ) {
      carousel.scrollTo({
        left: left + item.offsetWidth - carousel.clientWidth,
        behavior: scrollBehavior(),
      });
    }
  }

  function selectProduct(product: Product, button: HTMLButtonElement) {
    if (selectedCoffeeId === product.id) {
      setSelectedCoffeeId(null);
      openingRef.current = false;
      return;
    }
    openingRef.current = selectedCoffeeId === null;
    selectedButtonRef.current = button;
    setDisplayedProduct(product);
    setSelectedCoffeeId(product.id);
  }

  function closeDetail() {
    setSelectedCoffeeId(null);
    openingRef.current = false;
    selectedButtonRef.current?.focus({ preventScroll: true });
  }

  function finishDetailTransition() {
    if (selectedCoffeeId === null) {
      setDisplayedProduct(null);
      return;
    }
    if (!openingRef.current) return;
    openingRef.current = false;
    revealDetailIfNeeded(detailRef.current);
  }

  return (
    <>
      <section className={styles.catalog} aria-label="Kahve kataloğu">
        <div className={styles.catalogToolbar}>
          <p>
            <span>{String(products.length).padStart(2, "0")}</span> kahve ·
            Senin seçimin
          </p>
          <div className={styles.arrows}>
            <button
              type="button"
              aria-label="Önceki kahveler"
              aria-controls="coffee-carousel"
              disabled={edges.start}
              onClick={() => moveCarousel(-1)}
            >
              <CarouselArrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Sonraki kahveler"
              aria-controls="coffee-carousel"
              disabled={edges.end}
              onClick={() => moveCarousel(1)}
            >
              <CarouselArrow direction="right" />
            </button>
          </div>
        </div>
        <ul id="coffee-carousel" ref={carouselRef} className={styles.carousel}>
          {products.map((product, index) => (
            <li key={product.id} className={styles.carouselItem}>
              <button
                type="button"
                className={styles.coffeeButton}
                aria-label={`${product.name} detayları`}
                aria-expanded={selectedCoffeeId === product.id}
                aria-controls="coffee-detail"
                onClick={(event) => selectProduct(product, event.currentTarget)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className={styles.catalogImage}>
                  <CoffeeImage product={product} eager={index < 4} />
                </span>
                <span className={styles.coffeeName}>{product.name}</span>
                <span className={styles.selectionLine} aria-hidden="true" />
                <span className={styles.preview} aria-hidden="true">
                  <span>
                    {getTastingNotes(product.tasting_notes).join(" · ")}
                  </span>
                  <span>{product.roast_level} kavurma</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.catalogHint}>
          <span>Bir kahve seç, hikâyesini keşfet.</span>
          <span>
            Kaydırarak keşfet <CarouselArrow direction="right" />
          </span>
        </div>
      </section>
      <div
        id="coffee-detail"
        ref={detailRef}
        className={styles.detailReveal}
        data-open={selectedCoffeeId !== null}
        inert={selectedCoffeeId === null}
        onTransitionEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === "grid-template-rows"
          )
            finishDetailTransition();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeDetail();
          }
        }}
      >
        <div className={styles.detailClip}>
          {displayedProduct && (
            <CoffeeDetailCard
              product={displayedProduct}
              onClose={closeDetail}
            />
          )}
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {selectedCoffeeId !== null && displayedProduct
          ? `${displayedProduct.name} detayları açıldı.`
          : "Kahve detayları kapalı."}
      </p>
    </>
  );
}
