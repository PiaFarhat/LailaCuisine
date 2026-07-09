import Image from "next/image";

export default function Menu() {
  const separatorImageClass =
    "relative z-[2] mx-auto mt-[clamp(2.2rem,4.5vw,4rem)] mb-[clamp(1.5rem,2.7vw,2.4rem)] h-[clamp(118px,16vw,220px)] w-[min(100%,1240px)] max-w-[calc(100%_-_2.5rem)] border border-[rgba(198,161,91,0.34)] object-cover object-center opacity-95 shadow-[0_18px_56px_rgba(77,16,39,0.1),inset_0_0_0_1px_rgba(255,253,248,0.25)] [filter:saturate(0.96)_contrast(0.98)] max-md:my-[2.1rem_1.2rem] max-md:h-[clamp(92px,22vw,132px)] max-md:w-full max-md:max-w-full max-md:border-x-0 max-[480px]:h-[88px]";
  const menuSectionClass =
    "relative z-[2] mx-auto grid w-[min(1120px,calc(100%_-_2.5rem))] grid-cols-2 gap-[clamp(0.9rem,1.5vw,1.2rem)] overflow-hidden p-[clamp(1.35rem,3vw,2.6rem)] text-left [scroll-margin-top:92px] max-lg:grid-cols-1 max-md:w-[calc(100%_-_2rem)] max-md:p-5 max-[480px]:w-[calc(100%_-_1.5rem)] max-[480px]:p-4";
  const menuHeadingClass =
    "relative z-[1] col-span-full pb-[1.1rem] text-center";
  const menuNoteClass = "relative z-[1] col-span-full text-center";
  const itemClass =
    "relative z-[1] min-h-[145px] overflow-hidden p-[1.35rem_1.4rem_1.22rem] transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 max-md:min-h-0 max-md:p-[1.15rem_1.1rem]";
  const itemTitleClass =
    "mb-2 text-[1.2rem] font-medium leading-[1.25] text-[var(--burgundy)] max-[480px]:text-[1.12rem]";
  const itemTextClass =
    "m-0 text-[0.96rem] leading-[1.65] text-[rgba(43,33,24,0.76)]";
  const priceClass =
    "mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.16)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--wine)]";

  return (
    <section
      id="menu"
      className="relative isolate overflow-hidden px-0 py-[clamp(5rem,8vw,8rem)] text-center [scroll-margin-top:82px] max-lg:py-[5.5rem] max-[480px]:py-[4.5rem]"
    >
      <p className="eyebrow relative z-[2] mb-4 px-[clamp(1.25rem,7vw,6rem)]">
        Generous Lebanese Table
      </p>
      <h2 className="relative z-[2] mb-5 px-[clamp(1.25rem,7vw,6rem)]">
        Menu
      </h2>

      <nav
        className="menu-categories relative z-[2] mx-auto mb-[clamp(1.7rem,3vw,2.6rem)] flex w-[min(1040px,calc(100%_-_2.5rem))] flex-wrap justify-center gap-[0.55rem] overflow-hidden p-[0.85rem] max-md:w-[calc(100%_-_1.5rem)] max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:p-3 max-md:[overscroll-behavior-x:contain] max-md:[scrollbar-width:thin]"
        aria-label="Menu categories"
      >
        <a href="#cold-mezze">Cold Mezze</a>
        <a href="#hot-mezze">Hot Mezze</a>
        <a href="#mashawi">Mashawi</a>
        <a href="#seafood">Seafood</a>
        <a href="#lebanese-dishes">Lebanese Dishes</a>
        <a href="#desserts">Desserts</a>
        <a href="#drinks">Drinks</a>
      </nav>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="cold-mezze" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Cold Mezze</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Hummus</h4><p className={itemTextClass}>Chickpea dip with tahini, lemon, and olive oil.</p><span className={priceClass}>$4</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Baba Ghanouj</h4><p className={itemTextClass}>Smoky eggplant with tahini, garlic, lemon, and olive oil.</p><span className={priceClass}>$4</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Labneh</h4><p className={itemTextClass}>Fresh strained yogurt with olive oil and dried mint.</p><span className={priceClass}>$3</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Tabbouleh</h4><p className={itemTextClass}>Parsley, tomato, bulgur, lemon, and olive oil.</p><span className={priceClass}>$5</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Fattoush</h4><p className={itemTextClass}>Fresh vegetables, toasted bread, sumac, and pomegranate dressing.</p><span className={priceClass}>$5</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Wara2 Aarish B Zeit</h4><p className={itemTextClass}>Vegetarian grape leaves with rice, herbs, and olive oil.</p><span className={priceClass}>$7</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Kebbeh Nayyeh</h4><p className={itemTextClass}>Fresh raw kebbeh served with mint, onions, and olive oil.</p><span className={priceClass}>$12</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="hot-mezze" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Hot Mezze</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Ra2a2at Jebneh</h4><p className={itemTextClass}>Crispy cheese rolls served hot.</p><span className={priceClass}>6 pcs - $7</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Sambousik Lahme</h4><p className={itemTextClass}>Fried pastries filled with seasoned minced meat.</p><span className={priceClass}>6 pcs - $7</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Sambousik Jebneh</h4><p className={itemTextClass}>Fried pastries filled with melted cheese.</p><span className={priceClass}>6 pcs - $7</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Kebbeh Krass</h4><p className={itemTextClass}>Fried bulgur shells stuffed with spiced meat and onions.</p><span className={priceClass}>6 pcs - $8</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Batata Harra</h4><p className={itemTextClass}>Spicy potatoes with garlic, coriander, and chili.</p><span className={priceClass}>$5</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Jawaneh</h4><p className={itemTextClass}>Chicken wings with garlic, lemon, and coriander.</p><span className={priceClass}>$8</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="mashawi" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Mashawi by Kilo</h3>
        <p className={menuNoteClass}>Available starting from 1/2 kg.</p>

        <article className={itemClass}><h4 className={itemTitleClass}>Chicken Tawook</h4><p className={itemTextClass}>Marinated grilled chicken skewers with garlic sauce.</p><span className={priceClass}>1/2 kg $12 - 1 kg $22</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Kafta</h4><p className={itemTextClass}>Grilled minced meat with parsley, onions, and Lebanese spices.</p><span className={priceClass}>1/2 kg $13 - 1 kg $24</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Lahme Meshwiye</h4><p className={itemTextClass}>Grilled meat skewers served with grilled vegetables.</p><span className={priceClass}>1/2 kg $18 - 1 kg $34</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Mixed Grill</h4><p className={itemTextClass}>A generous mix of tawook, kafta, and grilled meat.</p><span className={priceClass}>1/2 kg $17 - 1 kg $32</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="seafood" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Seafood</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Grilled Fish</h4><p className={itemTextClass}>Fresh fish grilled with lemon, olive oil, and herbs.</p><span className={priceClass}>Market price</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Fried Fish</h4><p className={itemTextClass}>Crispy fried fish served with tarator and salad.</p><span className={priceClass}>Market price</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Grilled Shrimps</h4><p className={itemTextClass}>Shrimps grilled with garlic, lemon, and Lebanese spices.</p><span className={priceClass}>$22</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Fried Calamari</h4><p className={itemTextClass}>Golden calamari rings served with lemon and sauce.</p><span className={priceClass}>$18</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="lebanese-dishes" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Lebanese Main Dishes</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Djej aa Riz</h4><p className={itemTextClass}>Chicken and rice served with nuts and warm spices.</p><span className={priceClass}>$18</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Wara2 Aarish bi Lahme</h4><p className={itemTextClass}>Grape leaves stuffed with rice and meat, cooked slowly.</p><span className={priceClass}>$14</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Kousa Mehshi</h4><p className={itemTextClass}>Zucchini stuffed with rice and meat in tomato sauce.</p><span className={priceClass}>$15</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Mloukhieh</h4><p className={itemTextClass}>Lebanese stew served with rice and chicken.</p><span className={priceClass}>$16</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="desserts" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Desserts & Fruits</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Meghle</h4><p className={itemTextClass}>Rice pudding with cinnamon, coconut, and nuts.</p><span className={priceClass}>$5</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Atayef</h4><p className={itemTextClass}>Stuffed pancakes with cream or walnuts.</p><span className={priceClass}>$6</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Baklava</h4><p className={itemTextClass}>Layered pastry with nuts and syrup.</p><span className={priceClass}>$6</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Seasonal Fruits</h4><p className={itemTextClass}>Fresh fruit plate served Lebanese-style after the meal.</p><span className={priceClass}>$8</span></article>
      </section>

      <Image src="/images/menu.png" alt="" width={1200} height={250} className={separatorImageClass} />

      <section id="drinks" className={menuSectionClass}>
        <h3 className={menuHeadingClass}>Drinks</h3>

        <article className={itemClass}><h4 className={itemTitleClass}>Water</h4><p className={itemTextClass}>Served on the house.</p><span className={priceClass}>Free</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Soft Drinks</h4><p className={itemTextClass}>Cola, 7UP, Pepsi, Mirinda, and classic soft drinks.</p><span className={priceClass}>$2</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Jallab</h4><p className={itemTextClass}>Traditional Lebanese drink served with pine nuts.</p><span className={priceClass}>$4</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Ayran</h4><p className={itemTextClass}>Cold yogurt drink served fresh.</p><span className={priceClass}>$3</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Fresh Lemonade</h4><p className={itemTextClass}>Fresh lemon juice with mint.</p><span className={priceClass}>$4</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Ahwe</h4><p className={itemTextClass}>Traditional Lebanese coffee served after food.</p><span className={priceClass}>$2</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Arak</h4><p className={itemTextClass}>Traditional Lebanese anise drink served with mezze.</p><span className={priceClass}>Glass $4 - Bottle $18</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Beer</h4><p className={itemTextClass}>Served chilled with grills and seafood.</p><span className={priceClass}>$4</span></article>
        <article className={itemClass}><h4 className={itemTitleClass}>Whiskey</h4><p className={itemTextClass}>Classic spirit available for guests.</p><span className={priceClass}>Glass $6 - Bottle $45</span></article>
      </section>
    </section>
  );
}
