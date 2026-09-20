import {
  ShieldCheck,
  BadgeDollarSign,
  Globe2,
  CreditCard,
  Headset,
  Plane,
} from "lucide-react";

export const features = [
  {
    title: "Secure Booking",
    description:
      "Your personal information and reservations are protected with secure booking technology.",
    icon: ShieldCheck,
  },
  {
    title: "Best Price Guarantee",
    description:
      "Find great travel deals and competitive prices for your next adventure.",
    icon: BadgeDollarSign,
  },
  {
    title: "Worldwide Destinations",
    description:
      "Discover amazing destinations and experiences across the world.",
    icon: Globe2,
  },
  {
    title: "Easy Payment",
    description:
      "Enjoy a simple and convenient payment experience for your bookings.",
    icon: CreditCard,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Get assistance whenever you need it before, during, or after your trip.",
    icon: Headset,
  },
  {
    title: "Flexible Flight Booking",
    description:
      "Find flexible flight options that fit your travel plans and schedule.",
    icon: Plane,
  },
];

export const locations = [
  {
    id: "cambodia",
    country: "Cambodia",
    flag: "🇰🇭",
    image: "/location/Cambodia.jpg",
    description:
      "Ancient temples, tropical islands, Khmer culture, and beautiful beaches.",
    cities: ["Phnom Penh", "Siem Reap", "Kampot", "Koh Rong"],
    path: "/destination/cambodia",
  },

  {
    id: "japan",
    country: "Japan",
    flag: "🇯🇵",
    image: "/location/Japan.jpg",
    description:
      "Cherry blossoms, mountains, modern cities, and traditional culture.",
    cities: ["Tokyo", "Kyoto", "Osaka", "Hokkaido"],
    path: "/destination/japan",
  },

  {
    id: "korea",
    country: "South Korea",
    flag: "🇰🇷",
    image: "/location/Korea.jpg",
    description: "K-culture, shopping, food, nightlife, and beautiful beaches.",
    cities: ["Seoul", "Busan", "Jeju", "Incheon"],
    path: "/destination/korea",
  },

  {
    id: "usa",
    country: "United States",
    flag: "🇺🇸",
    image: "/location/US.jpg",
    description:
      "Iconic cities, national parks, beaches, technology, and entertainment.",
    cities: ["New York", "Los Angeles", "San Francisco", "Seattle"],
    path: "/destination/usa",
  },

  {
    id: "china",
    country: "China",
    flag: "🇨🇳",
    image: "/location/China.jpg",
    description:
      "Ancient history, futuristic skylines, mountains, and incredible cuisine.",
    cities: ["Beijing", "Shanghai", "Chengdu", "Hangzhou"],
    path: "/destination/china",
  },
];

export const destinations = [
  {
    id: 1,
    country: "Japan",
    city: "Tokyo",
    image: "/destinations/tokyo.jpg",
    rating: "4.9",
    price: "$89",
    path: "/destination/japan",
  },

  {
    id: 2,
    country: "South Korea",
    city: "Seoul",
    image: "/destinations/seoul.jpg",
    rating: "4.8",
    price: "$75",
    path: "/destination/korea",
  },

  {
    id: 3,
    country: "Cambodia",
    city: "Siem Reap",
    image: "/destinations/sr.jpg",
    rating: "4.9",
    price: "$45",
    path: "/destination/cambodia",
  },

  {
    id: 4,
    country: "United States",
    city: "New York",
    image: "/destinations/nyc.jpg",
    rating: "4.7",
    price: "$129",
    path: "/destination/usa",
  },

  {
    id: 5,
    country: "China",
    city: "Shanghai",
    image: "/destinations/shanghai.jpg",
    rating: "4.8",
    price: "$69",
    path: "/destination/china",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sokha Chan",
    country: "Cambodia",
    avatar: "/users/user1.jpg",
    review:
      "EasyTrip made planning my trip incredibly simple. The booking process was smooth and everything was easy to understand.",
  },

  {
    id: 2,
    name: "Min-jun Kim",
    country: "South Korea",
    avatar: "/users/user2.png",
    review:
      "I found a great hotel in Seoul through EasyTrip. The website looks beautiful and the booking experience was excellent.",
  },

  {
    id: 3,
    name: "Yuki Tanaka",
    country: "Japan",
    avatar: "/users/user3.jpg",
    review:
      "EasyTrip helped me organize my trip quickly. I especially liked how easy it was to explore different destinations.",
  },
];
