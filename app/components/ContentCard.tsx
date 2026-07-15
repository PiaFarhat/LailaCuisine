type ContentCardProps = {
  title: string;
  description: string;
  meta?: string;
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  metaClassName?: string;
  headingLevel?: "h3" | "h4";
};

const defaultCardClass =
  "relative z-[1] min-h-[145px] overflow-hidden p-[1.35rem_1.4rem_1.22rem] transition-[transform,border-color,box-shadow] duration-[260ms] ease-out max-md:min-h-0 max-md:p-[1.15rem_1.1rem]";
const defaultTitleClass =
  "mb-2 text-[1.2rem] font-medium leading-[1.25] text-[var(--burgundy)] max-[480px]:text-[1.12rem]";
const defaultTextClass =
  "m-0 text-[0.96rem] leading-[1.65] text-[rgba(43,33,24,0.76)]";
const defaultMetaClass =
  "mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.16)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--wine)]";

export default function ContentCard({
  title,
  description,
  meta,
  className = defaultCardClass,
  titleClassName = defaultTitleClass,
  textClassName = defaultTextClass,
  metaClassName = defaultMetaClass,
  headingLevel = "h4",
}: ContentCardProps) {
  const heading =
    headingLevel === "h3" ? (
      <h3 className={titleClassName}>{title}</h3>
    ) : (
      <h4 className={titleClassName}>{title}</h4>
    );

  return (
    <article className={className}>
      {heading}
      <p className={textClassName}>{description}</p>
      {meta && <span className={metaClassName}>{meta}</span>}
    </article>
  );
}
