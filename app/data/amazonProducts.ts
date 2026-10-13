export interface AmazonProduct {
  id: string;
  asin: string;
  brand: string;
  shortTitle: string;
  fullName: string;
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  reviewCountFormatted: string;
  image: string;
  deliveryDate: string;
  amazonUrl: string;
}

export const AMAZON_SELLER_ID = "A26NUGXR8IFFOO";
export const AMAZON_MARKETPLACE_ID = "A21TJRUUN4KGV";
export const AMAZON_STORE_URL = "https://www.amazon.in/s?me=A26NUGXR8IFFOO&marketplaceID=A21TJRUUN4KGV";

export const amazonProducts: AmazonProduct[] = [
  {
    id: "amz-lenovo-600",
    asin: "B08LW31NQ6",
    brand: "Lenovo",
    shortTitle: "Lenovo 600 Bluetooth 5.0 Silent Mouse: Compact, P...",
    fullName: "Lenovo 600 Bluetooth 5.0 Silent Mouse: Compact, Portable, Quiet Buttons, Adjustable DPI up to 2400, Dual-host Bluetooth 5.0",
    price: 1780,
    mrp: 3050,
    discountPercent: 42,
    rating: 4.4,
    reviewCount: 7292,
    reviewCountFormatted: "7,292",
    image: "/products/accessories/lenovo-600-mouse.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B08LW31NQ6?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-lenovo-m210",
    asin: "B0CPPX196S",
    brand: "Lenovo",
    shortTitle: "Lenovo M210 RGB Gaming Wired USB Mouse, Ambid...",
    fullName: "Lenovo M210 RGB Gaming Wired USB Mouse, Ambidextrous, 8000 DPI Optical Sensor, 7 Programmable Buttons, Dynamic RGB Backlight",
    price: 1900,
    mrp: 2800,
    discountPercent: 32,
    rating: 4.3,
    reviewCount: 97,
    reviewCountFormatted: "97",
    image: "/products/accessories/lenovo-m210-mouse.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B0CPPX196S?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-bcc950",
    asin: "B0080IA1J4",
    brand: "Logitech",
    shortTitle: "Logitech BCC950 ConferenceCam - Digital, Black",
    fullName: "Logitech BCC950 ConferenceCam - All-In-One HD 1080p Video and Audio Conferencing System with Motorized Pan/Tilt/Zoom & Speakerphone",
    price: 25980,
    mrp: 32000,
    discountPercent: 19,
    rating: 4.4,
    reviewCount: 1518,
    reviewCountFormatted: "1,518",
    image: "/products/accessories/logitech-bcc950.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B0080IA1J4?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-meetup",
    asin: "B072JQ98DF",
    brand: "Logitech",
    shortTitle: "Logitech MeetUp HD 100x Optical Zoom Video and...",
    fullName: "Logitech MeetUp HD 100x Optical Zoom Video and Conference Camera System with Ultra-Wide 120° Field of View and Integrated Audio",
    price: 72365,
    mrp: 157000,
    discountPercent: 54,
    rating: 4.3,
    reviewCount: 356,
    reviewCountFormatted: "356",
    image: "/products/accessories/logitech-meetup-cam.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B072JQ98DF?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-meetup-bundle",
    asin: "B072Q88NZC",
    brand: "Logitech",
    shortTitle: "Logitech MeetUp & Expansion Mic System Bundle...",
    fullName: "Logitech 960-001201 MeetUp and Expansion Mic HD Video and Audio Conferencing System Bundle for Small Meeting Rooms",
    price: 110490,
    mrp: 178000,
    discountPercent: 38,
    rating: 4.2,
    reviewCount: 116,
    reviewCountFormatted: "116",
    image: "/products/accessories/logitech-meetup-bundle.jpg",
    deliveryDate: "FREE delivery Friday",
    amazonUrl: "https://www.amazon.in/dp/B072Q88NZC?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-mx-brio",
    asin: "B0BFJ4CRKD",
    brand: "Logitech",
    shortTitle: "Logitech MX Brio Ultra HD 4K Streaming Webcam, 1...",
    fullName: "Logitech MX Brio Ultra HD 4K Streaming Webcam, 1080p at 60 fps, Dual Noise Reduction Mics, Show Mode, Privacy Shutter, USB-C",
    price: 24995,
    mrp: 28900,
    discountPercent: 14,
    rating: 4.2,
    reviewCount: 18187,
    reviewCountFormatted: "18,187",
    image: "/products/accessories/logitech-mx-brio.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B0BFJ4CRKD?me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-mic",
    asin: "B072R4BL6S",
    brand: "Logitech",
    shortTitle: "Logitech Microphone (Expansion Tabletop Mic Pod)",
    fullName: "Logitech Expansion Mic for MeetUp and Rally Conference Systems, Tabletop Mic Pod with Integrated Mute Button & 6m Cable",
    price: 38090,
    mrp: 53000,
    discountPercent: 28,
    rating: 4.6,
    reviewCount: 154,
    reviewCountFormatted: "154",
    image: "/products/accessories/logitech-mic-pod.png",
    deliveryDate: "FREE delivery Tomorrow",
    amazonUrl: "https://www.amazon.in/dp/B072R4BL6S?me=A26NUGXR8IFFOO",
  },
];
