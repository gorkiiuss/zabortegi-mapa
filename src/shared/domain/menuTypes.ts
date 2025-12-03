export interface MenuItem {
  label: string;
  action: () => void;
  disabled?: boolean;
  isActive?: boolean;
}

export interface MenuSection {
  id: string;
  label: string;
  items: MenuItem[];
}
