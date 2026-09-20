import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import OfficeLocation from "./officeLocation";
import FAQ from "./FAQ";

export default function Contact() {
  return (
    <main className="overflow-hidden bg-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <OfficeLocation />
      <FAQ />
    </main>
  );
}
