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
    <figure
      className={`relative overflow-hidden bg-navy ${className ?? ""}`}
      style={{
        backgroundColor: "#101722",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Photo also sits as CSS background so the frame never flashes empty. */}
      <img
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        fetchPriority={priority ? "high" : "low"}
        decoding={priority ? "sync" : "async"}
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover ${imageClassName ?? ""}`}
        onError={(event) => {
          event.currentTarget.style.opacity = "0";
        }}
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
