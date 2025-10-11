import Image from "next/image";
import React from "react";

const Results = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Results
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto">
            <div className="w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/results/results.jpg"
                alt="Bhatia Calicut Results"
                width={1200}
                height={480}
                priority
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </div>

            <div className="mt-6 text-center text-gray-600">
              <p className="text-lg md:text-xl">
                We take pride in our student&apos;s outstanding achievements and
                consistent results.
              </p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Results;
