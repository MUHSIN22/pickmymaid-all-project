'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
        </div>
      </div>
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3 text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProgramsCarousel: React.FC = () => {
  // NEET PG focused programs data
  const programs = [
    {
      id: 1,
      title: 'Live 360°',
      description: 'All Live Classes + Marrow Qbank & Test Series + Digital Workbooks. Includes live classes for all 19 subjects, test & discussion classes, and comprehensive study materials.',
      image: '/images/programs/testanddiscussion_bhatia_programs.jpeg',
      
    },
    {
      id: 2,
title: 'Live T&D',
      description: 'Live T&D Classes + Marrow Qbank & Test Series + Digital OneShot Workbook. Perfect for last-mile revision and MCQ practice with recorded sessions and test series.',
      image: '/images/programs/live.jpeg',
      
    },
    {
      id: 3,
      title: 'Face to Face',
      description: '7-8 months of 100% in-person classes, 4-5 days/week. Includes hardcopy workbooks, test series, mentorship, and digital resources. Residential programs available.',
      image: '/images/programs/facetoface.jpeg',
      
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Programs
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Since 1996, Bhatia Calicut has been a beacon has excellence in NEET PG/NEXT preparation,
            offering unparalleled mentorship guidance to aspiring medical proffessionals
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}

            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={programs.length > 3}
            className="programs-swiper pb-16"
          >
            {programs.map((program) => (
              <SwiperSlide key={program.id} className="h-auto mb-[2rem]">

                <ProgramCard {...program} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination !relative !bottom-0 !mt-8"></div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Book for free consultation
          </button>
        </div>
      </div>

      <style jsx global>{`
        .programs-swiper .swiper-slide {
          height: auto;
        }
        
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: #cbd5e0;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: #3b82f6;
          transform: scale(1.2);
        }
        
        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default ProgramsCarousel;