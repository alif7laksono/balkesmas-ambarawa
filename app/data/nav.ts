// types/nav.ts
export interface NavLink {
  name: string;
  href: string;
  subLinks?: NavLink[]; // opsional
}
