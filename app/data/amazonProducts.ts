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
export const AMAZON_STORE_URL = "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO";

export const amazonProducts: AmazonProduct[] = [
  {
    id: "amz-lenovo-600",
    asin: "B082L2SYK8",
    brand: "Lenovo",
    shortTitle: "Lenovo 600 Bluetooth 5.0 Silent Mouse: Compact, P...",
    fullName: "Lenovo 600 Bluetooth 5.0 Silent Mouse: Compact, Portable, Quiet Buttons, Adjustable DPI up to 2400, Dual-host Bluetooth 5.0",
    price: 1599,
    mrp: 3050,
    discountPercent: 48,
    rating: 4.4,
    reviewCount: 7292,
    reviewCountFormatted: "7,292",
    image: "/products/accessories/lenovo-600-mouse.png",
    deliveryDate: "FREE delivery Sat, 10 Oct",
    amazonUrl: "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-lenovo-m210",
    asin: "B0CFV5QW98",
    brand: "Lenovo",
    shortTitle: "Lenovo M210 RGB Gaming Wired USB Mouse, Ambid...",
    fullName: "Lenovo M210 RGB Gaming Wired USB Mouse, Ambidextrous, 3200 DPI Optical Sensor, 7 Programmable Buttons, Dynamic RGB Backlight",
    price: 1900,
    mrp: 2800,
    discountPercent: 32,
    rating: 4.3,
    reviewCount: 95,
    reviewCountFormatted: "95",
    image: "/products/accessories/lenovo-m210-mouse.png",
    deliveryDate: "FREE delivery Sat, 10 Oct",
    amazonUrl: "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-meetup",
    asin: "B072JQ98DF",
    brand: "Logitech",
    shortTitle: "Logitech MeetUp HD 100x Optical Zoom Video and...",
    fullName: "Logitech MeetUp HD 100x Optical Zoom Video and Conference Camera System with Ultra-Wide 120° Field of View and Integrated Audio",
    price: 72590,
    mrp: 157000,
    discountPercent: 54,
    rating: 4.3,
    reviewCount: 356,
    reviewCountFormatted: "356",
    image: "/products/accessories/logitech-meetup-cam.png",
    deliveryDate: "FREE delivery Sat, 10 Oct",
    amazonUrl: "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-mx-brio",
    asin: "B0CLW5N44N",
    brand: "Logitech",
    shortTitle: "Logitech MX Brio Ultra HD 4K Streaming Webcam, 1...",
    fullName: "Logitech MX Brio Ultra HD 4K Streaming Webcam, 1080p at 60 fps, Dual Noise Reduction Mics, Show Mode, Privacy Shutter, USB-C",
    price: 24500,
    mrp: 28900,
    discountPercent: 15,
    rating: 4.2,
    reviewCount: 18187,
    reviewCountFormatted: "18,187",
    image: "/products/accessories/logitech-mx-brio.png",
    deliveryDate: "FREE delivery Sat, 10 Oct",
    amazonUrl: "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO",
  },
  {
    id: "amz-logi-mic",
    asin: "B073X3Q54N",
    brand: "Logitech",
    shortTitle: "Logitech Microphone",
    fullName: "Logitech Expansion Mic for MeetUp and Rally Conference Systems, Tabletop Mic Pod with Integrated Mute Button & 6m Cable",
    price: 38100,
    mrp: 53000,
    discountPercent: 28,
    rating: 4.6,
    reviewCount: 154,
    reviewCountFormatted: "154",
    image: "/products/accessories/logitech-mic-pod.png",
    deliveryDate: "FREE delivery Sat, 10 Oct",
    amazonUrl: "https://www.amazon.in/l/27943762031?ie=UTF8&marketplaceID=A21TJRUUN4KGV&product=B072JQ98DF&me=A26NUGXR8IFFOO",
  }
];
