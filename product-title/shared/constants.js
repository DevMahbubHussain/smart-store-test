/**
 * Shared Constants for Showcase Blocks
 * 
 * Common constants used across product-grid and product-carousel blocks
 */

/**
 * Default query configuration
 * Note: perPage can be overridden by individual blocks (8 for grid, 6 for carousel)
 */
export const DEFAULT_QUERY_BASE = {
  pages: 0,
  offset: 0,
  postType: "product",
  order: "asc",
  orderBy: "title",
  search: "",
  exclude: [],
  inherit: false,
  taxQuery: {},
  featured: false,
  woocommerceOnSale: false,
  woocommerceStockStatus: ["instock", "outofstock", "onbackorder"],
  woocommerceHandPickedProducts: [],
  priceRange: undefined,
  filterable: false,
  // Advanced filtering defaults
  filterByCategories: [],
  filterByTags: [],
  filterByBrands: [],
  filterByAttributes: [],
  filterBySKUs: [],
  // Query Builder defaults
  filterProductBy: "latest",
  filterByDate: "all",
  // Common filtering defaults
  productType: [],
  includeProducts: [],
  excludeProducts: [],
  excludeCategories: [],
  excludeAuthor: [],
  outOfStockProducts: false,
  hideOnSaleProducts: false,
  hideFreeProducts: false,
  productsWithoutThumb: false,
  showHiddenProducts: false,
  noResultFoundLabel: "No Products Found",
};

/**
 * Default advanced options (identical for all showcase blocks)
 */
export const DEFAULT_ADVANCED_OPTIONS = {
  hideOnDesktop: false,
  hideOnTablet: false,
  hideOnMobile: false,
  enablePreloader: false,
  customCSSClass: "",
  customCSSID: "",
  ariaLabel: "",
  skipToContent: false,
};

/**
 * Default advanced style (identical for all showcase blocks)
 */
export const DEFAULT_ADVANCED_STYLE = {
  background: {},
  border: {},
  borderRadius: {},
  boxShadow: {},
  padding: {},
  margin: {},
};

/**
 * Default dimensions (identical for all showcase blocks)
 */
export const DEFAULT_DIMENSIONS = {
  widthType: "fill", // WidthOptions.FILL
};
