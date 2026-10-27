type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <span className="flex items-center gap-2.5" aria-hidden="true">
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19" fill="#2B1D14" />
        <path
          d="M28.8 11.2c-4.1-4.15-11.7-3.34-15.9 1.72-4.17 5.03-3.6 12.36 1.2 16.32 4.82 3.98 11.66 2.2 14.98-3.57 3.03-5.27 3.08-11.05-.28-14.47Z"
          fill="#C8642B"
        />
        <path
          d="M26.8 10.9c-5.25 3.7-8.3 9.77-7.9 18.1M15.5 19.1h7.2"
          stroke="#F5EDE0"
          strokeWidth="2.05"
          strokeLinecap="round"
        />
        <circle cx="31.2" cy="9" r="1.45" fill="#E58A50" />
      </svg>

      <span className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap font-display text-[1.35rem] font-bold leading-none tracking-[-0.045em] text-espresso sm:text-2xl">
          Furks Kahve<span className="text-roast">.</span>
        </span>
        {!compact ? (
          <span className="mt-1 whitespace-nowrap text-[0.5rem] font-bold uppercase leading-none tracking-[0.24em] text-espresso/45">
            Moda Roastery
          </span>
        ) : null}
      </span>
    </span>
  );
}
