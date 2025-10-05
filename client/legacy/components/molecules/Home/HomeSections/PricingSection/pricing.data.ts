import { IPricingCardData } from '@/types/components/pricingSection/pricingSection.types';

export const pricingData: IPricingCardData[] = [
  // {
  //   id: crypto.randomUUID(),
  //   type: 3,
  //   name: 'home.pricing.special.name',
  //   price: 'home.pricing.special.price',
  //   validity: '2 Weeks',
  //   highlightColor: '#FF4D62',
  //   buttonGradient: ['45f298','c1fdc9'],
  //   subTitle: 'home.pricing.features.recieveProfile',
  //   features: [
  //     {
  //       id: crypto.randomUUID(),
  //       feature: 'home.pricing.features.accessOneMonth',
  //       isAvailable: true
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       feature:
  //         'home.pricing.features.personalSpace',
  //       isAvailable: true
  //     },
  //     {
  //       id: crypto.randomUUID(),
  //       feature: 'home.pricing.features.dedicatedSupport',
  //       isAvailable: false
  //     }
  //   ]
  // },
  {
    id: crypto.randomUUID(),
    type: 0,
    name: 'home.pricing.basic.name',
    price: 'home.pricing.basic.price',
    validity: '1 Month',
    highlightColor: '#FF4D62',
    buttonGradient: ['45f298','c1fdc9'],
    subTitle: 'home.pricing.features.recieveProfile',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.accessOneMonth',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'home.pricing.features.personalSpace',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.dedicatedSupport',
        isAvailable: false
      }
    ]
  },

  {
    id: crypto.randomUUID(),
    type: 1,
    name: 'home.pricing.standard.name',
    price: 'home.pricing.standard.price',
    buttonGradient: ['937ef3','eaccf8'],
    strikedPrice: 380,
    validity: '2 Months',
    highlightColor: '#9bc502',
    subTitle: 'home.pricing.features.recieveProfile',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.accessTwoMonth',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'home.pricing.features.personalSpace',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.dedicatedSupport',
        isAvailable: false
      }
    ]
  },

  {
    id: crypto.randomUUID(),
    type: 2,
    name: 'home.pricing.premium.name',
    price: 'home.pricing.premium.price',
    buttonGradient: ['4cc5f8','84f5de'],
    validity: '1 Month support',
    highlightColor: '#FFB932',
    subTitle: 'home.pricing.features.recieveProfile',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.dedicatedSupport',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: 'home.pricing.features.accessOneMonth',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'home.pricing.features.personalSpace',
        isAvailable: true
      }
    ]
  }
];
