import browserListing from "@/assets/images/Tips/browse listing.webp";
import filterCandidate from "@/assets/images/Tips/filter candidates.webp";
import conductInterview from "@/assets/images/Tips/conduct interviews.webp";
import basicInfo from "@/assets/images/Tips/basic info.webp";
import workHistory from "@/assets/images/Tips/work history.webp";
import attitude from "@/assets/images/Tips/atitude and personality.webp";
import decisionMaking from "@/assets/images/Tips/decision making.webp";
import keyPoints from "@/assets/images/Tips/key points.webp";

export const tips: {
  index: number;
  heading: string;
  description: string;
  icon: any;
}[] = [
  {
    index: 1,
    heading: "Browse Listings",
    description:
      "Explore available maid or nanny profiles on Pickmymaid based on your specific need (eg., childcare, cleaning, live-in/live-out preference).",
    icon: browserListing,
  },
  {
    index: 2,
    heading: "Filter Candidates",
    description:
      "Customise your search by filtering candidates based on experience, location, skills, availability to match your requirements.",
    icon: filterCandidate,
  },
  {
    index: 3,
    heading: "Conduct Interviews",
    description:
      "Conduct Interviews: Ask relevant questions to understand their work history, expectation, and how they handle various household situations, ensuring they align with your needs.",
    icon: conductInterview,
  },
];

export const questions = [
  {
    title: "A - Basic Information",
    image: basicInfo,
    basicQstns: (
      <>
        1. Can you share a bit about your background and what led you to choose
        this profession? <br />
        2. What types of games or educational activities do you find most
        effective when caring for children? <br />
        3. What motivates you to continue working in childcare or housekeeping?{" "}
        <br />
        4. What aspects of being a nanny/maid do you find most rewarding, and
        what challenges do you face? <br />
        5. How do you feel about caring for pets or helping with pet-related
        tasks? <br />
      </>
    ),
    expandQstns: (
      <>
        6. What are your personal hobbies or interests outside of work? <br />
        7. What is your stance on smoking and alcohol consumption, especially
        around children? <br />
        8. Do you practice any particular beliefs or values that influence how
        you approach family care? <br />
        9. In your past experiences, what additional household tasks have you
        found fulfilling while caring for children? Are there tasks you're not
        comfortable doing? <br />
        10. Are there any medical conditions or allergies that we should be
        aware of for safety purposes? <br />
        11. What are some of the life lessons you have learned from your
        experiences as a nanny/maid? <br />
        12. How do you manage work-life balance, especially in a demanding
        household environment? <br />
        13. What kind of environment do you think is most conducive to a child's
        development? <br />
        14. Have you ever had to deal with a stressful situation while on the
        job? How did you handle it? <br />
        15. How do you like to maintain a positive and nurturing atmosphere in
        the household? <br />
        16. Do you have any certifications or training that would enhance your
        role as a nanny or maid? <br />
        17. What methods do you use to communicate effectively with both
        children and parents? <br />
        18. How do you handle disagreements with parents about childcare
        routines or household management? <br />
        19. In your view, what qualities make a great nanny/maid? <br />
        20. What is one thing you wish families understood about your role?{" "}
        <br />
      </>
    ),
  },
  {
    title: "B - Work History",
    image: workHistory,
    basicQstns: (
      <>
        1. What inspired you to pursue a career as a nanny or maid, and how has
        your journey been? <br />
        2. Can you describe your experience with different age groups? Which age
        group do you find most enjoyable to work with and why? <br />
        3. What previous roles or jobs have you held that contribute to your
        qualifications as a nanny or maid? <br />
        4. Do you have any specialized training or skills related to childcare,
        such as early childhood education? <br />
        5. How do you prioritize and manage your responsibilities when caring
        for multiple children or running a household? <br />
      </>
    ),
    expandQstns: (
      <>
        6. Can you provide an example of how you've handled an emergency
        situation, such as a child getting hurt? <br />
        7. What is your approach to managing children's behavior and setting
        boundaries? <br />
        8. How do you keep children engaged and active throughout the day?{" "}
        <br />
        9. Can you explain your methodology for preparing healthy meals for
        children? <br />
        10. What strategies do you use to communicate effectively with parents
        about their children's needs? <br />
        11. How do you adapt your care style to suit different family dynamics
        or parenting philosophies? <br />
        12. What safety protocols do you follow to ensure children are protected
        during daily activities? <br />
        13. How do you handle conflicts or disagreements between siblings when
        supervising them? <br />
        14. Have you ever created a structured schedule or daily routine for
        children? If so, what did it include? <br />
        15. What types of household management tasks are you comfortable
        handling in addition to childcare? <br />
        16. How do you stay organized when managing household chores, errands,
        and child care? <br />
        17. What do you consider the most essential skills for effectively
        caring for children? <br />
        18. How do you approach introducing new activities or learning
        experiences into a child's daily routine? <br />
        19. What experience do you have with special needs children, if any?{" "}
        <br />
        20. How do you keep updated with best practices for child care, safety,
        and nutrition? <br />
      </>
    ),
  },
  {
    title: "C - Attitude and Personality",
    image: attitude,
    basicQstns: (
      <>
        1. What qualities do you think are essential for building a positive
        relationship with children? <br />
        2. How do you envision your ideal working environment, and what role
        does communication play in it? <br />
        3. What aspects of childcare or housekeeping do you find most
        fulfilling, and why? <br />
        4. How do you respond to constructive criticism about your caregiving
        techniques or household responsibilities? <br />
        5. What strategies do you use to adapt to feedback from parents while
        maintaining your own style? <br />
      </>
    ),
    expandQstns: (
      <>
        6. How do you engage children who are hesitant or shy to participate in
        activities? <br />
        7. What types of behaviors from parents or children would challenge your
        patience, and how would you handle them? <br />
        8. Can you share an experience where you successfully navigated a
        challenging house rule? <br />
        9. How do you recharge after a long day of work while ensuring you’re
        ready for the next day? <br />
        10. What does discipline mean to you, and how do you implement it in
        your interactions with children? <br />
        11. How do you stay motivated during particularly busy or difficult
        days? <br />
        12. What techniques do you use to foster a sense of independence in
        children while ensuring their safety? <br />
        13. How would you approach a situation where a child is upset and
        refuses to talk? <br />
        14. What role do you think humor plays in working with children and
        maintaining a positive atmosphere? <br />
        15. How do you handle situations where a child refuses to follow
        instructions or routines? <br />
        16. What do you believe is the most important lesson you can teach a
        child during your time with them? <br />
        17. How do you ensure that children feel heard and respected in
        challenging situations? <br />
        18. What type of feedback do you appreciate most from parents, and how
        do you apply it to your work? <br />
        19. How do you approach setting expectations and boundaries for children
        in your care? <br />
        20. What do you think makes a great partnership between caregivers and
        families? <br />
      </>
    ),
  },
  {
    title: "D - Decision Making",
    image: decisionMaking,
    basicQstns: (
      <>
        1. If the child refuses to eat, how would you handle it? <br />
        2. If the baby gets injured while playing, what would be your first
        reaction? <br />
        3. How do you handle conflicts with other staff or family members?{" "}
        <br />
        4. What would you do if you’re running late to work or cannot make it on
        a particular day? <br />
      </>
    ),
    expandQstns: null,
  },
  {
    title: "E - Key Points",
    image: keyPoints,
    basicQstns: (
      <>
        1. Are you available to work full-time/part-time/live-in/live-out?{" "}
        <br />
        2. Are you comfortable traveling with the family if required? <br />
        3. Do you have any dietary restrictions or cultural considerations we
        should respect? <br />
        4. Do you have references from previous employers? <br />
        5. What is your expected salary? <br />
      </>
    ),
    expandQstns: null,
  },
];
