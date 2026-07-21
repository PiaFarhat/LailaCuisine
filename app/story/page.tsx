import type { Metadata } from "next";
import PageBanner from "../components/PageBanner";
import StoryBlock from "../components/StoryBlock";

export const metadata: Metadata = {
  title: "Our Story | Laila Cuisine",
  description: "The family story and Zahle inspiration behind Laila Cuisine.",
};

export default function StoryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="From Zahle, With Love"
        description="A story shaped by family tables, Lebanese traditions, and the warm spirit of Zahle."
        image="/images/ladyofzahle.png"
        imageAlt="Our Lady of Zahle overlooking the city"
        backgroundPosition="left 62%"
      />
      <section
        id="story"
        className="story-section relative grid gap-[clamp(2rem,4vw,3.25rem)] py-[clamp(4rem,7vw,7rem)] [scroll-margin-top:82px]"
      >
        <StoryBlock
          eyebrow="Laila's Story"
          title="A tribute to my grandmother, Laila"
          summary="Laila Cuisine is named after my grandmother, whose table was always filled with family, friends, and homemade Lebanese dishes."
          details="Inspired by her warmth and the traditions of Zahle, we continue her legacy by serving food that brings people together with generosity and care."
          image="/images/about.png"
          imageAlt="Lebanese table inspired by Laila's family recipes"
          imagePosition="right"
          accordionItems={[
            {
              title: "Laila's Story",
              content:
                "Her kitchen carried the rhythm of family visits, simmering dishes, fresh herbs, and recipes remembered by hand rather than written by measure.",
            },
            {
              title: "Family Recipes and Hospitality",
              content:
                "Every plate is shaped by the idea that guests should feel welcomed before the first bite and remembered after the last.",
            },
          ]}
        />
        <StoryBlock
          eyebrow="Zahle and Its Vineyards"
          title="From the vineyards of Zahle to Laila's table"
          summary="Long before the first dish is served, the story begins in Zahle, where vineyards, riverside tables, and family gatherings shape the spirit of Lebanese hospitality."
          details="Overlooking the city, Our Lady of Zahle stands as a quiet guardian while the Berdawni River winds through streets filled with laughter and shared meals."
          image="/images/ladyofzahle.png"
          imageAlt="Our Lady of Zahle and the surrounding city"
          imageObjectPosition="32% 18%"
          imagePosition="left"
          accordionItems={[
            {
              title: "Zahle and Its Vineyards",
              content:
                "Zahle's identity is tied to wine, poetry, mountain air, and long tables where mezze can turn an afternoon into an evening.",
            },
            {
              title: "The Lebanese Table",
              content:
                "The table is built for sharing: bright salads, warm bread, grilled dishes, and small plates that invite conversation.",
            },
          ]}
        />
        <StoryBlock
          eyebrow="The Lebanese Table"
          title="Food made for gathering, not rushing"
          summary="Laila Cuisine celebrates the generosity, traditions, and unforgettable flavors that have made Zahle a heart of Lebanese hospitality."
          details="Our menu follows the rhythm of a family table: mezze to begin, warm plates to share, and special dishes prepared with time and intention."
          image="/images/food.png"
          imageAlt="A generous Lebanese spread prepared for sharing"
          imagePosition="right"
          accordionItems={[
            {
              title: "The Lebanese Table",
              content:
                "The meal is meant to unfold slowly, with flavors crossing the table and every guest finding something familiar or new.",
            },
            {
              title: "Family Recipes and Hospitality",
              content:
                "Pre-requested dishes honor recipes that take longer to prepare and deserve a table ready to gather around them.",
            },
          ]}
        />
      </section>
    </>
  );
}
