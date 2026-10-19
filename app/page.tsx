import AboutPreview from "@/components/home/AboutPreview";
import ActivitiesPreview from "@/components/activities/ActivitiesPreview";
import Hero from "@/components/home/Hero";
import RegistrationCTA from "@/components/home/RegistrationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />

      <ActivitiesPreview />

      <AboutPreview />

      <RegistrationCTA />
    </>
  );
}
