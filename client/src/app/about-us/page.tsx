import Counts from "@/components/molecules/CampaignLanding/Counts/Counts";
import ReviewSection from "@/components/molecules/CampaignLanding/Sections/ReviewSection/ReviewSection";
import ContactUs from "@/components/molecules/ContactUs/ContactUs";
import BannerSection from "./_AboutSections/Banner/BannerSection";
import OurMission from "./_AboutSections/OurMission/OurMission";
import OurTeam from "./_AboutSections/OurTeam/OurTeam";
import MeetTheTeam from "@/components/atoms/MeetTheTeam/MeetTheTeam";


const AboutUs = () => {
  return (
    <div>
      <BannerSection />
      <div className="common-padding">
        <OurTeam />
        <hr className="border border-primary-300" />
        <OurMission />
      </div>
      <Counts />
      <ReviewSection />
      <MeetTheTeam />
      <br />
      <br />
      <ContactUs hideImage />
      <br />
    </div>
  );
};

export default AboutUs;
