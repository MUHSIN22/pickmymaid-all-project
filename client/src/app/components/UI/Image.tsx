import clsx from "clsx";
import NextImage from "next/image";

const Image = ({
  src,
  alt,
  parentClass,
  noLazy = false,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  parentClass?: string;
  noLazy?: boolean;
  className?: string;
  priority?: boolean;
}) => {
  return (
    <div className={clsx("relative overflow-hidden", parentClass)}>
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
        objectFit="cover"
        loading={noLazy ? "eager" : "lazy"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
};

export default Image;
