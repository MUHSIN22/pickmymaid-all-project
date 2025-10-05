import { ISideNavList } from '../../../types/components/sideNav/sideNav.types';
import {
  RiBookReadFill,
  RiDashboardFill,
  RiFileList3Fill,
  // RiDashboardFill,
  // RiFileList3Fill,
  // RiSecurePaymentFill,
  RiTeamFill,
} from 'react-icons/ri';
import {
  MdEditDocument,
  MdManageAccounts,
  MdSupportAgent,
  MdVerified,
} from 'react-icons/md';

import { BiFileFind } from 'react-icons/bi';

export const sideNavList: ISideNavList[] = [
  {
    id: crypto.randomUUID(),
    title: 'Dashboard',
    path: '/',
    icon: <RiDashboardFill />,
  },
  {
    id: crypto.randomUUID(),
    title: 'Job Applications',
    path: '/job-applications',
    icon: <MdEditDocument />,
  },
  {
    id: crypto.randomUUID(),
    title: 'Approved Maid',
    path: '/approved-maid',
    icon: <MdVerified />,
  },
  {
    id: crypto.randomUUID(),
    title: 'Manage Maids',
    path: '/manage-maids',
    icon: <MdManageAccounts />,
  },
  {
    id: crypto.randomUUID(),
    title: 'Manage Team',
    path: '/manage-team',
    icon: <RiTeamFill />,
    isProtected: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Find A Job',
    path: '/find-a-job',
    icon: <BiFileFind />,
  },
  {
    id: crypto.randomUUID(),
    title: 'Contact Support',
    path: '/contact-support',
    icon: <MdSupportAgent />,
    isProtected: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Customers',
    path: '/manage-customers',
    icon: <RiFileList3Fill />,
    isProtected: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Payments',
    path: '/payments',
    icon: <RiFileList3Fill />,
    isProtected: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Manage Blogs',
    path: '/manage-blogs',
    icon: <RiBookReadFill />,
    isProtected: true,
  },
  // {
  //   id: crypto.randomUUID(),
  //   title: 'Payments',
  //   path: '/manage-payments',
  //   icon: <RiSecurePaymentFill />,
  // },
];
