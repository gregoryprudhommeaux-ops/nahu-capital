type Props = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function EditorialFrame({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority,
}: Props) {
  return (
    <figure className={`editorial-frame ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        draggable={false}
        className={imageClassName}
      />
      {caption ? (
        <figcaption>
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
