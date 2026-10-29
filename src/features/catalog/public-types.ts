export type PublicProductSort =
  | "newest"
  | "name_asc"
  | "price_asc"
  | "price_desc";

export type PublicProductFilters = {
  q: string;
  selections: Record<string, string[]>;
  sort: PublicProductSort;
  page: number;
  pageSize: number;
};

export type PublicFilterGroup = {
  id: string;
  key: string;
  label: string;
  type: "MULTI_SELECT" | "SINGLE_SELECT";
  options: {
    id: string;
    label: string;
    slug: string;
  }[];
};

export type PublicProductFilterGroup = {
  key: string;
  label: string;
  options: {
    id: string;
    label: string;
    slug: string;
  }[];
};

export type PublicProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  filterGroups: PublicProductFilterGroup[];
};

export type PublicProductList = {
  items: PublicProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
