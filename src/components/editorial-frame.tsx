import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  zoom?: boolean;
};

export function EditorialFrame({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority,
  sizes,
  zoom = false,
}: Props) {
  return (
    <figure className={`relative overflow-hidden bg-navy ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        className={`object-cover ${
          zoom
            ? "transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            : ""
        } ${imageClassName ?? ""}`}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-navy/10" />
      {caption ? (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/75 to-transparent px-3.5 pb-3 pt-12">
          <span className="text-[0.62rem] font-medium tracking-[0.18em] text-cream/90 uppercase">
            {caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
