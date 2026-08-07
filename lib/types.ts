export type Locale = "sq" | "en";

export type LocalizedString = {
  sq: string;
  en: string;
};

export type ServiceItem = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  order: number;
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: LocalizedString;
  order: number;
};

export type SiteContent = {
  services: ServiceItem[];
  gallery: GalleryItem[];
};
