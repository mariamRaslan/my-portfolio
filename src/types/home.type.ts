export interface IHomeCarousel {
  id: number;
  title: string;
  description: string;
  service: { id: number };
  image_url: string;
  mobile_image_url: string;
  reports_count: string;
  certificates_count: string;
  partners_count: string;
  clients_count: string;
}
export interface IHomeServices {
  id: number;
  name: string;
  image: string;
}
export interface IHomeCertificate {
  id: number;
  name: string;
  image_url: string;
  created_at:string
}
export interface IHomeAbout {
  name: string;
  title: string;
  description: string;
  values: {
    text: string;
    icon_url: string;
  }[];
  video_url: string;
}

export interface IHomesStats {
  id: number;
  name: string;
  number: number;
  icon_url: string;
}

export interface IContact {
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
}