type Props = {
  className?: string;
  variant?: "horizontal" | "stacked" | "monogram" | "wordmark";
};

const sizes = {
  horizontal: { width: 390, height: 83 },
  stacked: { width: 212, height: 145 },
  monogram: { width: 84, height: 80 },
  wordmark: { width: 319, height: 87 },
} as const;

export function BrandLogo({ className, variant = "horizontal" }: Props) {
  const size = sizes[variant];
  return (
    <img
      src={`/brand/logo-${variant}.svg`}
      alt="NAHU Capital"
      width={size.width}
      height={size.height}
      className={className}
      draggable={false}
    />
  );
}
