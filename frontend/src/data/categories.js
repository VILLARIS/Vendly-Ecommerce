export const departments = [
  {
    slug: "electronics",
    name: "Electronics",
    subcategories: [
      { slug: "smartphones", label: "Smartphones" },
      { slug: "laptops", label: "Laptops" },
      { slug: "tablets", label: "Tablets" },
      { slug: "mobile-accessories", label: "Mobile Accessories" },
    ],
  },
  {
    slug: "fashion",
    name: "Fashion",
    subcategories: [
      { slug: "tops", label: "Tops" },
      { slug: "womens-dresses", label: "Women's Dresses" },
      { slug: "womens-shoes", label: "Women's Shoes" },
      { slug: "womens-bags", label: "Women's Bags" },
      { slug: "womens-watches", label: "Women's Watches" },
      { slug: "womens-jewellery", label: "Jewellery" },
      { slug: "mens-shirts", label: "Men's Shirts" },
      { slug: "mens-shoes", label: "Men's Shoes" },
      { slug: "mens-watches", label: "Men's Watches" },
      { slug: "sunglasses", label: "Sunglasses" },
    ],
  },
  {
    slug: "home",
    name: "Home & Living",
    subcategories: [
      { slug: "furniture", label: "Furniture" },
      { slug: "home-decoration", label: "Home Decoration" },
      { slug: "kitchen-accessories", label: "Kitchen Accessories" },
    ],
  },
  {
    slug: "beauty",
    name: "Beauty & Care",
    subcategories: [
      { slug: "beauty", label: "Beauty" },
      { slug: "fragrances", label: "Fragrances" },
      { slug: "skin-care", label: "Skin Care" },
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    subcategories: [{ slug: "sports-accessories", label: "Accessories" }],
  },
  {
    slug: "groceries",
    name: "Groceries",
    subcategories: [{ slug: "groceries", label: "Groceries" }],
  },
  {
    slug: "automotive",
    name: "Automotive",
    subcategories: [
      { slug: "vehicle", label: "Vehicles" },
      { slug: "motorcycle", label: "Motorcycle" },
    ],
  },
];

export const findDepartment = (slug) =>
  departments.find((department) => department.slug === slug) ?? null;

export const departmentOfCategory = (categorySlug) =>
  departments.find((department) =>
    department.subcategories.some((sub) => sub.slug === categorySlug),
  ) ?? null;

export const subLabelOf = (department, subcategorySlug) =>
  department?.subcategories.find((sub) => sub.slug === subcategorySlug)?.label ??
  subcategorySlug;