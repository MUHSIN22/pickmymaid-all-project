import vector1 from '@/assets/images/how/h1.png';
import vector2 from '@/assets/images/how/h2.png';
import vector3 from '@/assets/images/how/h3.png';
import number1 from '@/assets/images/how/1.svg';
import number2 from '@/assets/images/how/2.svg';
import number3 from '@/assets/images/how/3.svg';

export const howItWorksData: {
  id: string;
  number: any;
  vector: any;
  title: string;
  description: string;
}[] = [
  {
    id: crypto.randomUUID(),
    number: number1,
    vector: vector1,
    title: 'Search',
    description: 'Browse through 900+ profiles of nannies and maids in the UAE, complete with detailed information, right here.'
  },
  {
    id: crypto.randomUUID(),
    number: number2,
    vector: vector2,
    title: 'Register to access details of available maids',
    description: 'Get started with the interview process by selecting a package that grants you access to detailed information about the available maids.'
  },
  {
    id: crypto.randomUUID(),
    number: number3,
    vector: vector3,
    title: 'Hire',
    description: 'Communicate your requirements directly with the maid or nanny, come to a mutual agreement, and proceed to hire her for the position.'
  }
];
