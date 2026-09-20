import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Plane,
  CircleHelp,
} from "lucide-react";

export const contactCards = [
  {
    title: "Email Support",
    description: "We'll respond within 24 hours.",
    value: "support@easytrip.com",
    icon: Mail,
  },
  {
    title: "Call Us",
    description: "Available every day.",
    value: "+855 12 345 678",
    icon: Phone,
  },
  {
    title: "Head Office",
    description: "Visit our travel office.",
    value: "Phnom Penh, Cambodia",
    icon: MapPin,
  },
  {
    title: "Live Chat",
    description: "Chat with our travel experts anytime.",
    value: "Available 24/7",
    icon: MessageCircle,
  },
];

export const faqItems = [
  {
    question: "How can I cancel my booking?",
    answer:
      "You can cancel eligible bookings directly from your EasyTrip account under 'My Bookings'.",
    icon: ShieldCheck,
  },
  {
    question: "Do you offer free cancellation?",
    answer:
      "Many hotels and tours offer free cancellation before the deadline shown during booking.",
    icon: Plane,
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We support Visa, MasterCard, ABA, Apple Pay, Google Pay, and major international payment methods.",
    icon: CreditCard,
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact us through live chat, phone, or email anytime, 24 hours a day.",
    icon: CircleHelp,
  },
];