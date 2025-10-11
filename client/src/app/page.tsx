import Banner from "./components/home/Banner";
import About from "./components/home/About";
import FacultiesWrapper from "./components/home/FacultiesWrapper";
import { ProgramsCarousel } from "./components/programs";
import ContactFormPage from "./components/home/ContactUs";
import Results from "./components/home/Results";

export default function Home() {
  return (
    <div className="font-sans">
      <div className="flex flex-col gap-[3rem] md:gap-[5rem]">
        <Banner />
        <About />
        <Results />
        <ProgramsCarousel />
        <FacultiesWrapper />
        <ContactFormPage />
        
      </div>
    </div>
  );
}
