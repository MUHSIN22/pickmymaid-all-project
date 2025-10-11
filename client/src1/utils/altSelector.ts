const altTexts = [
    'maid dubai',
'maid service dubai',
'part time maid dubai',
'dubai full time maid',
'maid cc dubai',
'dubai house maid',
'elite maid dubai',
'indian maid',
'dubai best maid',
'cheap maid dubai',
'daily maid dubai',
'urban maid',
'hourly maid dubai',
'pink maid dubai',
'smart maid dubai',
'ethiopian maid dubai',
'sri lankan maid dubai',
'offer maid dubai',
'city maid dubai',
'monthly maid dubai',
'professional maid dubai',
'ready maid dubai',
'mary poppins maid dubai',
'residential maid dubai',
'right maid dubai',
'nepali maid dubai',
'supermaid dubai',
'day maid dubai',
'muslim maid dubai',
'find housemaid dubai',
]

export const getAlternativeText = () => {
    const {length} = altTexts;
    const randomIndex = Math.floor(Math.random() * length)
    const selectedAlt = altTexts[randomIndex];
    return selectedAlt;
}