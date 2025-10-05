import { IFooterLink } from '@/types/components/Footer/footer.types';

/* These code exports an array of objects that implement the `IFooterLink` interface. Each object
represents a quick link that can be displayed in a website's footer. The `IFooterLink` interface
defines the properties that each object in the array must have, which are `title` and `path`. The
`title` property represents the text that will be displayed for the quick link, and the `path`
property represents the URL that the quick link will lead to when clicked. */
export const quickLink: IFooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.findJob',
    path: '/find-job'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.home',
    path: '/'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.hiringTips',
    path: '/hiring-tips'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.blogs',
    path: '/blogs'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.findWorkers',
    path: '/search'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.pressAppearance',
    path: '/press-appearance'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.contactUs',
    path: '/contact-us'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.termsAndConditions',
    path: '/terms-and-conditions'
  },
  {
    id: crypto.randomUUID(),
    title: 'footer.supportLinks.privacyPolicy',
    path: '/privacy-policy'
  },
];

export const findWorkers: IFooterLink[] = [
  {
    id: crypto.randomUUID(),
    title: 'common.categories.maids',
    path: '/search/service/maids-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.nanny',
    path: '/search/service/nannies-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.caregiver',
    path: '/search/service/caregiver-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.private_nurse',
    path: '/search/service/private-nurse-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.private_tutor',
    path: '/search/service/private-tutor-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.driver',
    path: '/search/service/driver-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.postpartum_care',
    path: '/search/service/pospartum-care-available-in-uae'
  },
  {
    id: crypto.randomUUID(),
    title: 'common.categories.cook',
    path: '/search/service/cook-available-in-uae'
  }
];
