"use client";

import Image from "next/image";
import { useId, useState } from "react";
import Container from "./Container";

type AccordionItem = {
  title: string;
  content: string;
};

type StoryBlockProps = {
  eyebrow: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  imagePosition: "left" | "right";
  accordionItems: AccordionItem[];
};

export default function StoryBlock({
  eyebrow,
  title,
  summary,
  details,
  image,
  imageAlt,
  imageObjectPosition = "center",
  imagePosition,
  accordionItems,
}: StoryBlockProps) {
  const id = useId();
  const [openItem, setOpenItem] = useState(0);
  const imageFirst = imagePosition === "left";

  return (
    <Container>
      <div className="story-block-grid grid grid-cols-2 items-center gap-[clamp(1.5rem,3.6vw,3.5rem)] max-md:grid-cols-1">
        <div className={imageFirst ? "md:order-1" : "md:order-2"}>
          <Image
            src={image}
            alt={imageAlt}
            width={1200}
            height={820}
            className="story-image relative h-full max-h-none min-h-0 w-full object-cover"
            style={{ objectPosition: imageObjectPosition }}
          />
        </div>

        <article
          className={[
            "story-panel relative overflow-hidden p-[clamp(1.35rem,2.4vw,2rem)]",
            imageFirst ? "md:order-2" : "md:order-1",
          ].join(" ")}
        >
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="mb-5">{title}</h2>
          <p>{summary}</p>
          <p>{details}</p>

          <div className="mt-6 grid gap-3">
            {accordionItems.map((item, index) => {
              const isOpen = openItem === index;
              const buttonId = `${id}-trigger-${index}`;
              const panelId = `${id}-panel-${index}`;

              return (
                <div
                  key={item.title}
                  className="border border-[rgba(198,161,91,0.38)] bg-[rgba(255,253,248,0.5)]"
                >
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left text-[0.92rem] font-bold uppercase tracking-[0.08em] text-[var(--burgundy)]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenItem(isOpen ? -1 : index)}
                  >
                    <span>{item.title}</span>
                    <span className="text-[1.35rem] leading-none" aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={[
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 px-4 pb-4 text-[0.96rem] leading-[1.75] text-[rgba(43,33,24,0.74)]">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </Container>
  );
}
