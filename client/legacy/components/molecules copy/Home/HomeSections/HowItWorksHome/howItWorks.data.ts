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
    title: 'home.working.search.title',
    description: 'home.working.search.description'
  },
  {
    id: crypto.randomUUID(),
    number: number2,
    vector: vector2,
    title: 'home.working.register.title',
    description: 'home.working.register.description'
  },
  {
    id: crypto.randomUUID(),
    number: number3,
    vector: vector3,
    title: 'home.working.hire.title',
    description: 'home.working.hire.description'
  }
];
