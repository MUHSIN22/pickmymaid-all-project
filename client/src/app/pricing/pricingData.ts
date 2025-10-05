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
    name: 'Basic Plan',
    price: '350',
    validity: '1 Month',
    highlightColor: '#FF4D62',
    buttonGradient: ['45f298','c1fdc9'],
    subTitle: 'Receive 20+ new profiles every 24 hours, Verified by our HR team',
    features: [
      {
        id: crypto.randomUUID(),
        feature: '⁠Full access to all maids contact details, including phone numbers, Email and WhatsApp for one month',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Personal space is provided to manage your shortlist effectively',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: 'Dedicated support from a consultant',
        isAvailable: false
      }
    ]
  },

  {
    id: crypto.randomUUID(),
    type: 1,
    name: 'Standard Plan',
    price: '495',
    buttonGradient: ['937ef3','eaccf8'],
    strikedPrice: 380,
    validity: '2 Months',
    highlightColor: '#9bc502',
    subTitle: 'Receive 20+ new profiles every 24 hours, Verified by our HR team',
    features: [
      {
        id: crypto.randomUUID(),
        feature: '⁠Full access to all maids contact details, including phone numbers, Email and WhatsApp for 2 months',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Personal space is provided to manage your shortlist effectively',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: 'Dedicated support from a consultant',
        isAvailable: false
      }
    ]
  },

  {
    id: crypto.randomUUID(),
    type: 2,
    name: 'Premium Plan',
    price: '899',
    buttonGradient: ['4cc5f8','84f5de'],
    validity: '1 Month support',
    highlightColor: '#FFB932',
    subTitle: 'Receive 20+ new profiles every 24 hours, Verified by our HR team',
    features: [
      {
        id: crypto.randomUUID(),
        feature: 'Dedicated support from a consultant',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature: '⁠Full access to all maids contact details, including phone numbers, Email and WhatsApp for one month',
        isAvailable: true
      },
      {
        id: crypto.randomUUID(),
        feature:
          'Personal space is provided to manage your shortlist effectively',
        isAvailable: true
      }
    ]
  }
];
