export type MenuItem = {
  name: string;
  description: string;
  price: string;
  image?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
};

export type MenuCategory = {
  id: string;
  label: string;
  heading: string;
  note?: string;
  items: MenuItem[];
};

export type SpecialOrderItem = {
  title: string;
  description: string;
  price: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "cold-mezze",
    label: "Cold Mezze",
    heading: "Cold Mezze",
    items: [
      {
        name: "Hummus",
        description: "Chickpea dip with tahini, lemon, and olive oil.",
        price: "$4",
        image: {
          src: "/images/homos.png",
          alt: "Hummus topped with olive oil and Lebanese garnish",
        },
      },
      {
        name: "Baba Ghanouj",
        description: "Smoky eggplant with tahini, garlic, lemon, and olive oil.",
        price: "$4",
      },
      {
        name: "Labneh",
        description: "Fresh strained yogurt with olive oil and dried mint.",
        price: "$3",
      },
      {
        name: "Tabbouleh",
        description: "Parsley, tomato, bulgur, lemon, and olive oil.",
        price: "$5",
        image: {
          src: "/images/tabouleh.png",
          alt: "Fresh tabbouleh salad with parsley and tomatoes",
        },
      },
      {
        name: "Fattoush",
        description:
          "Fresh vegetables, toasted bread, sumac, and pomegranate dressing.",
        price: "$5",
      },
      {
        name: "Wara2 Aarish B Zeit",
        description: "Vegetarian grape leaves with rice, herbs, and olive oil.",
        price: "$7",
      },
      {
        name: "Kebbeh Nayyeh",
        description: "Fresh raw kebbeh served with mint, onions, and olive oil.",
        price: "$12",
      },
    ],
  },
  {
    id: "hot-mezze",
    label: "Hot Mezze",
    heading: "Hot Mezze",
    items: [
      {
        name: "Ra2a2at Jebneh",
        description: "Crispy cheese rolls served hot.",
        price: "6 pcs - $7",
      },
      {
        name: "Sambousik Lahme",
        description: "Fried pastries filled with seasoned minced meat.",
        price: "6 pcs - $7",
      },
      {
        name: "Sambousik Jebneh",
        description: "Fried pastries filled with melted cheese.",
        price: "6 pcs - $7",
      },
      {
        name: "Kebbeh Krass",
        description: "Fried bulgur shells stuffed with spiced meat and onions.",
        price: "6 pcs - $8",
        image: {
          src: "/images/kebbeh kras.png",
          alt: "Crisp fried kebbeh krass served on a plate",
        },
      },
      {
        name: "Batata Harra",
        description: "Spicy potatoes with garlic, coriander, and chili.",
        price: "$5",
      },
      {
        name: "Jawaneh",
        description: "Chicken wings with garlic, lemon, and coriander.",
        price: "$8",
      },
    ],
  },
  {
    id: "mashawi",
    label: "Mashawi",
    heading: "Mashawi by Kilo",
    note: "Available starting from 1/2 kg.",
    items: [
      {
        name: "Chicken Tawook",
        description: "Marinated grilled chicken skewers with garlic sauce.",
        price: "1/2 kg $12 - 1 kg $22",
        image: {
          src: "/images/Tawook.png",
          alt: "Grilled chicken tawook skewers with Lebanese sides",
        },
      },
      {
        name: "Kafta",
        description:
          "Grilled minced meat with parsley, onions, and Lebanese spices.",
        price: "1/2 kg $13 - 1 kg $24",
      },
      {
        name: "Lahme Meshwiye",
        description: "Grilled meat skewers served with grilled vegetables.",
        price: "1/2 kg $18 - 1 kg $34",
      },
      {
        name: "Mixed Grill",
        description: "A generous mix of tawook, kafta, and grilled meat.",
        price: "1/2 kg $17 - 1 kg $32",
      },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    heading: "Seafood",
    items: [
      {
        name: "Grilled Fish",
        description: "Fresh fish grilled with lemon, olive oil, and herbs.",
        price: "Market price",
      },
      {
        name: "Fried Fish",
        description: "Crispy fried fish served with tarator and salad.",
        price: "Market price",
      },
      {
        name: "Grilled Shrimps",
        description: "Shrimps grilled with garlic, lemon, and Lebanese spices.",
        price: "$22",
        image: {
          src: "/images/grilled shrimps.png",
          alt: "Grilled shrimps with lemon and Lebanese seasoning",
        },
      },
      {
        name: "Fried Calamari",
        description: "Golden calamari rings served with lemon and sauce.",
        price: "$18",
      },
    ],
  },
  {
    id: "lebanese-dishes",
    label: "Lebanese Main Dishes",
    heading: "Lebanese Main Dishes",
    items: [
      {
        name: "Djej aa Riz",
        description: "Chicken and rice served with nuts and warm spices.",
        price: "$18",
        image: {
          src: "/images/djej aa rez.png",
          alt: "Djej aa riz chicken and rice with toasted nuts",
        },
      },
      {
        name: "Wara2 Aarish bi Lahme",
        description: "Grape leaves stuffed with rice and meat, cooked slowly.",
        price: "$14",
      },
      {
        name: "Kousa Mehshi",
        description: "Zucchini stuffed with rice and meat in tomato sauce.",
        price: "$15",
      },
      {
        name: "Mloukhieh",
        description: "Lebanese stew served with rice and chicken.",
        price: "$16",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    heading: "Desserts & Fruits",
    items: [
      {
        name: "Meghle",
        description: "Rice pudding with cinnamon, coconut, and nuts.",
        price: "$5",
      },
      {
        name: "Atayef",
        description: "Stuffed pancakes with cream or walnuts.",
        price: "$6",
      },
      {
        name: "Baklava",
        description: "Layered pastry with nuts and syrup.",
        price: "$6",
      },
      {
        name: "Seasonal Fruits",
        description: "Fresh fruit plate served Lebanese-style after the meal.",
        price: "$8",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    heading: "Drinks",
    items: [
      {
        name: "Water",
        description: "Served on the house.",
        price: "Free",
      },
      {
        name: "Soft Drinks",
        description: "Cola, 7UP, Pepsi, Mirinda, and classic soft drinks.",
        price: "$2",
      },
      {
        name: "Jallab",
        description: "Traditional Lebanese drink served with pine nuts.",
        price: "$4",
      },
      {
        name: "Ayran",
        description: "Cold yogurt drink served fresh.",
        price: "$3",
      },
      {
        name: "Fresh Lemonade",
        description: "Fresh lemon juice with mint.",
        price: "$4",
      },
      {
        name: "Ahwe",
        description: "Traditional Lebanese coffee served after food.",
        price: "$2",
      },
      {
        name: "Arak",
        description: "Traditional Lebanese anise drink served with mezze.",
        price: "Glass $4 - Bottle $18",
      },
      {
        name: "Beer",
        description: "Served chilled with grills and seafood.",
        price: "$4",
      },
      {
        name: "Whiskey",
        description: "Classic spirit available for guests.",
        price: "Glass $6 - Bottle $45",
      },
    ],
  },
];

export const specialOrderItems: SpecialOrderItem[] = [
  {
    title: "Fweregh",
    description: "Traditional stuffed intestines, cleaned and prepared carefully.",
    price: "Starting from $25",
  },
  {
    title: "Sayadiyeh",
    description: "Fish and rice cooked with caramelized onions and warm spices.",
    price: "Starting from $30",
  },
  {
    title: "Stuffed Lamb",
    description: "Whole lamb stuffed with rice, meat, nuts, and spices.",
    price: "Starting from $120",
  },
  {
    title: "Makloubeh",
    description: "Layered rice dish with meat, vegetables, and spices.",
    price: "Starting from $35",
  },
  {
    title: "Moghrabieh",
    description: "Lebanese pearl couscous with chicken, chickpeas, onions, and spices.",
    price: "Starting from $28",
  },
  {
    title: "Ouzi",
    description: "Rice, meat, peas, and nuts served as pastry portions or family trays.",
    price: "Starting from $40",
  },
];

export const featuredMenuItemNames = [
  "Hummus",
  "Tabbouleh",
  "Kebbeh Krass",
  "Chicken Tawook",
  "Grilled Shrimps",
  "Djej aa Riz",
] as const;

export const getFeaturedMenuItems = () => {
  const itemsByName = new Map(
    menuCategories.flatMap((category) =>
      category.items.map((item) => [item.name, item] as const),
    ),
  );

  return featuredMenuItemNames.flatMap((name) => {
    const item = itemsByName.get(name);
    return item ? [item] : [];
  });
};
