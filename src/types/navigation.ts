export interface Website {
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  websites: Website[];
  icon?: string;
}

export interface NavigationData {
  categories: Category[];
}