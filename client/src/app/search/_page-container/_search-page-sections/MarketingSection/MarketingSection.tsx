// import IconCardSection from '@/components/atoms/MarketingSections/IconCardSection/IconCardSection';
// import ImageCardSection from '@/components/atoms/MarketingSections/ImageCardSection/ImageCardSection';
// import { marketingData } from '@/components/atoms/MarketingSections/marketing.data';
// import MarketingFAQs from '@/components/atoms/MarketingSections/MarketingFaq/MarketingFAQs';
// import ZigZagSection from '@/components/atoms/ZigZagSection/ZigZagSection';
// import { VStack } from '@chakra-ui/react';
// import Helmet from 'react-helmet'

export default function MarketingSection() {
  return (
    <>
      {/* <VStack gap={{ base: '20px', md: '100px' }}>
        {marketingData[category].map((item) => (
          <>
            {item.type === 'zigZag' ? (
              <ZigZagSection
                sectionTitle={item.sectionTitle}
                data={item.data}
              />
            ) : item.type === 'promise' ? (
              <IconCardSection
                sectionTitle={item.sectionTitle}
                data={item.data}
              />
            ) : item.type === 'imageCard' ? (
              <ImageCardSection
                sectionTitle={item.sectionTitle}
                subTitle={item.subTitle}
                data={item.data}
              />
            ) : item.type === 'faq' ? (
              <MarketingFAQs FAQData={item.data} />
            ) : (
              <></>
            )}
          </>
        ))}
      </VStack> */}
    </>
  );
}
