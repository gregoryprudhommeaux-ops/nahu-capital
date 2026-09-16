import type { Locale } from "@/i18n/config";

type FlagProps = {
  locale: Locale;
  title: string;
  size?: "sm" | "md";
};

export function Flag({ locale, title, size = "md" }: FlagProps) {
  const sm = size === "sm";
  return (
    <span
      className={`flag-mark inline-flex overflow-hidden rounded-[1px] ring-1 ring-navy/10 ${
        sm ? "h-3 w-[1.15rem]" : "h-3.5 w-[1.35rem]"
      }`}
      title={title}
      style={{ width: sm ? 18 : 22, height: sm ? 12 : 14 }}
    >
      <svg
        viewBox="0 0 21 15"
        width={sm ? 18 : 22}
        height={sm ? 12 : 14}
        className="flag-svg h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {flagGraphic(locale)}
      </svg>
    </span>
  );
}

function flagGraphic(locale: Locale) {
  switch (locale) {
    case "es":
      return (
        <>
          <rect width="7" height="15" fill="#006847" />
          <rect x="7" width="7" height="15" fill="#fff" />
          <rect x="14" width="7" height="15" fill="#CE1126" />
          <g transform="translate(10.5 7.5)">
            <ellipse rx="1.7" ry="2" fill="#8B5A2B" />
            <path d="M0 -1.8 L0.5 0.4 L0 1.6 L-0.5 0.4 Z" fill="#2D5A27" />
          </g>
        </>
      );
    case "en":
      return (
        <>
          <rect width="21" height="15" fill="#BF0A30" />
          <rect y="1.15" width="21" height="1.15" fill="#fff" />
          <rect y="3.46" width="21" height="1.15" fill="#fff" />
          <rect y="5.77" width="21" height="1.15" fill="#fff" />
          <rect y="8.08" width="21" height="1.15" fill="#fff" />
          <rect y="10.38" width="21" height="1.15" fill="#fff" />
          <rect y="12.69" width="21" height="1.15" fill="#fff" />
          <rect width="9.5" height="8.08" fill="#002868" />
        </>
      );
    case "fr":
      return (
        <>
          <rect width="7" height="15" fill="#002395" />
          <rect x="7" width="7" height="15" fill="#fff" />
          <rect x="14" width="7" height="15" fill="#ED2939" />
        </>
      );
    case "pt":
      return (
        <>
          <rect width="21" height="15" fill="#009B3A" />
          <polygon points="10.5,1.6 18.6,7.5 10.5,13.4 2.4,7.5" fill="#FEDD00" />
          <circle cx="10.5" cy="7.5" r="3.1" fill="#002776" />
        </>
      );
    case "zh":
      return (
        <>
          <rect width="21" height="15" fill="#DE2910" />
          <polygon
            points="4.2,3.2 4.9,5.3 7.1,5.3 5.3,6.6 6,8.7 4.2,7.4 2.4,8.7 3.1,6.6 1.3,5.3 3.5,5.3"
            fill="#FFDE00"
          />
          <circle cx="8.6" cy="2.8" r="0.55" fill="#FFDE00" />
          <circle cx="10.2" cy="4.2" r="0.55" fill="#FFDE00" />
          <circle cx="10.2" cy="6.2" r="0.55" fill="#FFDE00" />
          <circle cx="8.6" cy="7.4" r="0.55" fill="#FFDE00" />
        </>
      );
  }
}
