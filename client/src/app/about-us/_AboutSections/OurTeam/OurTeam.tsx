import ImageSrc from '@/assets/images/About/our mission image.webp';
import { getAlternativeText } from '@/utils/altSelector';
import { useTranslation } from '@/lib/hooks/useTranslation';

const OurTeam = () => {
  return (
    <div className="py-20 grid gap-[15px]">
      <h1
        className="
          text-left 
          text-primary-300
          mb-[10px] 
          font-extrabold 
          text-[1.4rem] 
          sm:text-[2rem] 
          xl:text-[2.6rem]
        "
      >
        Our Team & what we do
      </h1>

      <div
        className="
          flex flex-col sm:flex-row 
          gap-[30px] sm:gap-[50px] 
          h-full
        "
      >
        <div className="flex flex-col justify-start gap-0 sm:gap-[60px]">
          <p
            className="
              text-[#595959] 
              text-[0.8rem] sm:text-[0.9rem] md:text-[1rem] 
              mt-[5px]
            "
          >
            We connect UAE families with trusted maids and nannies. We function collaboratively with a community of experienced and skilled caregivers and household helpers. With years of industry experience, we understand every family's unique needs and expectations. We minimize your efforts and let you find qualified and pre-screened candidates. Our team ensures that all helpers have undergone thorough background checks, prioritizing trust. With personalized service and a commitment to excellence, we find you the perfect household helper, making your life easier and more enjoyable. Our platform is SHAMS registered and allows nannies and maids to register in our database. We select them and add their profiles to our website after accurate filtering. Families who are looking for trustworthy and caring maid service can browse our database and find suitable matches according to availability, location, monthly pay, etc. We follow all the newest rules and regulations for hiring nannies and maids in the UAE. However, we don't directly handle their hiring and sponsorship. If necessary, we can provide you with contact information for companies we have worked with that can assist you in that process.
          </p>
        </div>

        <img
          className="
            h-full 
            w-full sm:w-[40vw] 
            object-cover object-left
          "
          src={ImageSrc.src}
          alt={getAlternativeText()}
        />
      </div>
    </div>
  );
};

export default OurTeam;
