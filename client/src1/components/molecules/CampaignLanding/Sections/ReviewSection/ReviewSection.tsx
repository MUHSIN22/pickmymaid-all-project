import reviewBg from "@/assets/images/campaign/reviewBg.svg";
import googleImage from "@/assets/images/4 star review.png";
import { reviews } from "./reviews.data";
import ReviewCard from "../../../../atoms/Cards/ReviewCard/ReviewCard";

export default function ReviewSection() {
  return (
    <div
      className="
        flex flex-col items-center
        py-12 md:py-20
        gap-4 sm:gap-16
        w-full px-4 md:px-8
        relative
      "
      style={{
        backgroundImage: `url('${reviewBg?.src}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Title + Subtitle */}
      <div className="flex flex-col items-center">
        <h2
          className="
            font-extrabold text-black
            text-[1.4rem] sm:text-[2rem] xl:text-[2.6rem]
            text-center
          "
        >
          Testimonial from our users
        </h2>
        <p
          className="
            text-black text-center
            text-[1rem] sm:text-[1.2rem]
            font-medium
          "
        >
          Register Now - Get Access to 1500+ Maids profiles who&apos;re ready
          join
        </p>
      </div>

      {/* Google Rating Image */}
      <div
        className="
          relative md:absolute
          top-0 lg:top-20
          left-0 lg:left-8 2xl:left-32
          w-32 md:w-40
          aspect-[1300/415]
        "
      >
        <img
          loading="lazy"
          src={googleImage.src}
          alt="Google rating"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Reviews Grid */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 lg:gap-8
          w-full
        "
      >
        {reviews.map((review, index) => (
          <ReviewCard
            text={review.text}
            name={review.name}
            title={review.type}
            image={review?.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
