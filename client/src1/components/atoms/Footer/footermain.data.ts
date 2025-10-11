import { IFooterLink } from '../../../types/components/Footer/footer.types';

/* These code exports an array of objects that implement the `IFooterLink` interface. Each object
represents a quick link that can be displayed in a website's footer. The `IFooterLink` interface
defines the properties that each object in the array must have, which are `title` and `path`. The
`title` property represents the text that will be displayed for the quick link, and the `path`
property represents the URL that the quick link will lead to when clicked. */
export const quickLink: IFooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: 'Find Jobs',
    path: '/find-job'
  },
  {
    id: crypto.randomUUID(),
    title: 'Home',
    path: '/'
  },
  {
    id: crypto.randomUUID(),
    title: 'Hiring Tips',
    path: '/hiring-tips'
  },
  // {
  //   id: crypto.randomUUID(),
  //   title: 'Blogs',
  //   path: '/blogs'
  // },
  {
    id: crypto.randomUUID(),
    title: 'Find Workers',
    path: '/search'
  },
  {
    id: crypto.randomUUID(),
    title: 'Press Appearance',
    path: '/press-appearance'
  },
  {
    id: crypto.randomUUID(),
    title: 'Contact Us',
    path: '/contact-us'
  },
  {
    id: crypto.randomUUID(),
    title: 'Terms and conditions',
    path: '/terms-and-conditions'
  },
  {
    id: crypto.randomUUID(),
    title: 'Privacy Policy',
    path: '/privacy-policy'
  },
];

export const findWorkers: IFooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: 'Maid',
    path: '/search/service/maids-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Nanny',
    path: '/search/service/nannies-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Caregiver',
    path: '/search/service/caregiver-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Private Nurse',
    path: '/search/service/private-nurse-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Private Tutor',
    path: '/search/service/private-tutor-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Driver',
    path: '/search/service/driver-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Postpartum Care',
    path: '/search/service/pospartum-care-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'Cook',
    path: '/search/service/cook-available-in-uae'
  }
];
