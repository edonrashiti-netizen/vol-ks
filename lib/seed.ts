import type { SiteContent } from "./types";

export const seedContent: SiteContent = {
  services: [
    {
      id: "svc-1",
      title: {
        sq: "Diagnostikim i avancuar",
        en: "Advanced diagnostics",
      },
      description: {
        sq: "Diagnostikim profesional me pajisje moderne për çdo problem të automjetit Volvo.",
        en: "Professional diagnostics with modern equipment for every Volvo issue.",
      },
      order: 0,
    },
    {
      id: "svc-2",
      title: {
        sq: "Mirëmbajtje periodike",
        en: "Periodic maintenance",
      },
      description: {
        sq: "Servis i rregullt sipas rekomandimeve të prodhuesit për jetëgjatësi dhe performancë.",
        en: "Scheduled service per manufacturer guidelines for longevity and performance.",
      },
      order: 1,
    },
    {
      id: "svc-3",
      title: {
        sq: "Servis i motorit",
        en: "Engine service",
      },
      description: {
        sq: "Riparim dhe mirëmbajtje e motorit me kujdes të specializuar për Volvo.",
        en: "Engine repair and care with Volvo-specialized expertise.",
      },
      order: 2,
    },
    {
      id: "svc-4",
      title: {
        sq: "Sistemi i frenave",
        en: "Brake system",
      },
      description: {
        sq: "Kontroll, riparim dhe ndërrim i frenave për siguri maksimale.",
        en: "Inspection, repair, and replacement for maximum braking safety.",
      },
      order: 3,
    },
    {
      id: "svc-5",
      title: {
        sq: "Pezullimi dhe drejtimi",
        en: "Suspension & steering",
      },
      description: {
        sq: "Diagnostikim dhe riparim i pezullimit dhe sistemit të drejtimit.",
        en: "Diagnostics and repair of suspension and steering systems.",
      },
      order: 4,
    },
    {
      id: "svc-6",
      title: {
        sq: "Klimatizimi",
        en: "Air conditioning",
      },
      description: {
        sq: "Servis i sistemit të klimës për komoditet në çdo stinë.",
        en: "Climate system service for comfort in every season.",
      },
      order: 5,
    },
    {
      id: "svc-7",
      title: {
        sq: "Sistemi elektrik",
        en: "Electrical systems",
      },
      description: {
        sq: "Kontroll dhe riparim i sistemeve elektrike dhe elektronikës së automjetit.",
        en: "Inspection and repair of vehicle electrical and electronic systems.",
      },
      order: 6,
    },
    {
      id: "svc-8",
      title: {
        sq: "Inspektim para udhëtimit",
        en: "Pre-trip inspection",
      },
      description: {
        sq: "Kontroll i plotë para udhëtimit për qetësi dhe siguri në rrugë.",
        en: "Full pre-trip check for peace of mind on the road.",
      },
      order: 7,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      src: "/gallery/1.png",
      alt: {
        sq: "Ekspertizë e dedikuar për Volvo",
        en: "Dedicated Volvo expertise",
      },
      order: 0,
    },
    {
      id: "gal-2",
      src: "/gallery/2.png",
      alt: {
        sq: "Jepi veturës kujdesin që meriton",
        en: "Give your car the care it deserves",
      },
      order: 1,
    },
    {
      id: "gal-3",
      src: "/gallery/3.png",
      alt: {
        sq: "Diagnostikim i avancuar",
        en: "Advanced diagnostics",
      },
      order: 2,
    },
    {
      id: "gal-4",
      src: "/gallery/4.png",
      alt: {
        sq: "Siguria familjare",
        en: "Family safety",
      },
      order: 3,
    },
    {
      id: "gal-5",
      src: "/gallery/5.png",
      alt: {
        sq: "Inovacionet e sigurisë Volvo",
        en: "Volvo safety innovations",
      },
      order: 4,
    },
    {
      id: "gal-6",
      src: "/gallery/6.png",
      alt: {
        sq: "Historia e rripit të sigurisë",
        en: "Seatbelt heritage",
      },
      order: 5,
    },
    {
      id: "gal-7",
      src: "/gallery/7.png",
      alt: {
        sq: "Servisi që bën diferencën",
        en: "Service that makes the difference",
      },
      order: 6,
    },
    {
      id: "gal-8",
      src: "/gallery/8.png",
      alt: {
        sq: "Për sigurinë dhe komoditetin tuaj",
        en: "For your safety and comfort",
      },
      order: 7,
    },
    {
      id: "gal-9",
      src: "/gallery/9.png",
      alt: {
        sq: "Adresa më e sigurtë për Volvo",
        en: "The safest address for Volvo",
      },
      order: 8,
    },
  ],
};

export const SITE = {
  name: "VOL-KS Service",
  phone: "+383 44 288 158",
  phoneHref: "tel:+38344288158",
  email: "",
  location: {
    sq: "Fushë Kosovë, Uglarë",
    en: "Fushë Kosovë, Uglarë",
  },
  hours: {
    sq: "E hënë – E shtunë, 08:00 – 17:00",
    en: "Monday – Saturday, 08:00 – 17:00",
  },
  facebook: "https://www.facebook.com/volvksservice/",
  instagram: "https://www.instagram.com/vol_ks_service/",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2936.011195151879!2d21.108544675690933!3d42.61871857117003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549df791df6c49%3A0x69fba821d073de5a!2sVOL-KS%20Service!5e0!3m2!1sen!2s!4v1786134951573!5m2!1sen!2s",
  mapsLink: "https://maps.google.com/?q=VOL-KS+Service+Fushë+Kosovë",
} as const;
