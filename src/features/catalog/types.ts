export type AdminProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type AdminFilterType = "MULTI_SELECT" | "SINGLE_SELECT";

export type AdminProductSort =
  | "updated_desc"
  | "name_asc"
  | "price_asc"
  | "price_desc";

export type AdminProductFilters = {
  q: string;
  status: AdminProductStatus | "ALL";
  tag: string;
  sort: AdminProductSort;
  page: number;
  pageSize: number;
};

export type ProductTag = {
  id: string;
  label: string;
  slug: string;
};

export type AdminProductRow = {
  id: string;
  name: string;
  slug: string;
  price: number;
  status: AdminProductStatus;
  updatedAt: Date;
  tags: ProductTag[];
};

export type AdminProductList = {
  items: AdminProductRow[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ProductOptionGroup = {
  id: string;
  key: string;
  label: string;
  type: AdminFilterType;
  isSystem: boolean;
  isActive: boolean;
  options: {
    id: string;
    label: string;
    slug: string;
    isActive: boolean;
  }[];
};

export type ProductFormValues = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  status: AdminProductStatus;
  optionIds: string[];
};

export type FilterGroupRow = {
  id: string;
  key: string;
  label: string;
  type: AdminFilterType;
  isSystem: boolean;
  isActive: boolean;
  sortOrder: number;
  optionCount: number;
};

export type FilterOptionRow = {
  id: string;
  label: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
};

export type FilterGroupDetail = FilterGroupRow & {
  options: FilterOptionRow[];
};

export type FilterOptionSummary = {
  id: string;
  label: string;
  slug: string;
};

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};
