export default function SpecialOrders() {
  const articleClass =
    "relative z-[1] mx-auto my-4 min-h-0 max-w-[900px] overflow-hidden p-[1.35rem_1.4rem_1.22rem] text-left transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 max-md:p-[1.15rem_1.1rem] max-md:text-center";
  const titleClass =
    "mb-2 text-[clamp(1.75rem,3vw,2.8rem)] font-normal text-[var(--gold)]";
  const textClass = "m-0 text-[rgba(255,253,248,0.78)]";
  const priceClass =
    "mt-[0.95rem] inline-block border border-[rgba(198,161,91,0.34)] bg-[rgba(198,161,91,0.18)] px-[0.65rem] py-[0.34rem] text-[0.83rem] font-bold leading-[1.25] tracking-[0.045em] text-[var(--ivory)]";

  return (
    <section
      id="special-orders"
      className="relative min-h-screen px-[clamp(1.25rem,7vw,6rem)] py-[clamp(5rem,8vw,8rem)] text-center text-[var(--ivory)] [scroll-margin-top:82px] max-lg:py-[5.5rem] max-[480px]:py-[4.5rem]"
    >
      <p className="eyebrow mb-4">By Reservation Only</p>
      <h2 className="mb-6 text-[var(--ivory)]">Pre-Requested Traditional Dishes</h2>

      <p className="mx-auto mb-12 max-w-[760px] text-[rgba(255,253,248,0.78)]">
        These dishes require longer preparation and are made only by reservation.
        They are ideal for family gatherings and generous Lebanese tables.
      </p>

      <article className={articleClass}><h3 className={titleClass}>Fweregh</h3><p className={textClass}>Traditional stuffed intestines, cleaned and prepared carefully.</p><span className={priceClass}>Starting from $25</span></article>
      <article className={articleClass}><h3 className={titleClass}>Sayadiyeh</h3><p className={textClass}>Fish and rice cooked with caramelized onions and warm spices.</p><span className={priceClass}>Starting from $30</span></article>
      <article className={articleClass}><h3 className={titleClass}>Stuffed Lamb</h3><p className={textClass}>Whole lamb stuffed with rice, meat, nuts, and spices.</p><span className={priceClass}>Starting from $120</span></article>
      <article className={articleClass}><h3 className={titleClass}>Makloubeh</h3><p className={textClass}>Layered rice dish with meat, vegetables, and spices.</p><span className={priceClass}>Starting from $35</span></article>
      <article className={articleClass}><h3 className={titleClass}>Moghrabieh</h3><p className={textClass}>Lebanese pearl couscous with chicken, chickpeas, onions, and spices.</p><span className={priceClass}>Starting from $28</span></article>
      <article className={articleClass}><h3 className={titleClass}>Ouzi</h3><p className={textClass}>Rice, meat, peas, and nuts served as pastry portions or family trays.</p><span className={priceClass}>Starting from $40</span></article>
    </section>
  );
}
