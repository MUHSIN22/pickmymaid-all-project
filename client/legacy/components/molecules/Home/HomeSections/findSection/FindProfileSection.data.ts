import { IFindProfileCategories } from '@/types/components/FindProfileSection/findProfileSection.types';

import care from '@/assets/images/campaign/counts/care.webp'
import driver from '@/assets/images/campaign/counts/driver.webp'
import nannie from '@/assets/images/campaign/counts/nannie.webp'
import nurse from '@/assets/images/campaign/counts/nurse.webp'
import tutor from '@/assets/images/campaign/counts/tutor.webp'
import yellow from '@/assets/images/campaign/counts/yellow.webp'
import caregiver from '@/assets/images/campaign/counts/caregiver.webp'
import pink from '@/assets/images/campaign/counts/pink.webp'


export const profileCategories: IFindProfileCategories[] = [
    {
        id: crypto.randomUUID(),
        image: yellow,
        category: 'common.categories.maids',
        noOfProfiles: 40,
        numberKey: 'Maid'
    },
    {
        id: crypto.randomUUID(),
        image: nannie,
        category: 'common.categories.nanny',
        noOfProfiles: 20,
        numberKey: 'Nanny'
    },
    {
        id: crypto.randomUUID(),
        image: caregiver,
        category: 'common.categories.caregiver',
        noOfProfiles: 21,
        numberKey: 'Caregiver'
    },
    {
        id: crypto.randomUUID(),
        image: driver,
        category: 'common.categories.driver',
        noOfProfiles: 21,
        numberKey: 'Driver'
    },
  
    {
        id: crypto.randomUUID(),
        image: tutor,
        category: 'common.categories.private_tutor',
        noOfProfiles: 2,
        numberKey: 'Private Tutor'
    },
    {
        id: crypto.randomUUID(),
        image: nurse,
        category: 'common.categories.private_nurse',
        noOfProfiles: 1,
        numberKey: 'Private Nurse'
    },
    {
        id: crypto.randomUUID(),
        image: care,
        category: 'common.categories.postpartum_care',
        noOfProfiles: 32,
        numberKey: 'Postpartum care'
    },
    {
        id: crypto.randomUUID(),
        image: pink,
        category: 'common.categories.cook',
        noOfProfiles: 21,
        numberKey: 'Cook'
    }
]