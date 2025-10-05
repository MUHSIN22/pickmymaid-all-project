"use client";
import angel from "@/assets/images/Teams/Angel photo-comp.webp";
import yasmin from "@/assets/images/Teams/Yasmine-comp.webp";
import samjhana from "@/assets/images/Teams/Samjhana photo-comp.webp";

const teamDetails = [
  {
    name: "Angel - HR & Administration Manager | Dedicated Client Support",
    details: (
      <span>
        Angel, our <strong>HR & Administration Manager</strong>, plays a vital
        role in managing recruitment, staff coordination, and ensuring smooth
        operations. She carefully selects maids and nannies to meet our high
        service standards.
        <br /> <br /> In addition to HR, Angel also handles dedicated client
        support, guiding families through the hiring process and ensuring they
        find the perfect maid or nanny. Her expertise, professionalism, and
        client-focused approach make her an essential part of our team.
      </span>
    ),
    image: angel?.src,
  },
  {
    name: "Samjhana - HR Specialist",
    details: (
      <span>
        Samjhana, our <strong>HR Specialist</strong>, plays a key role in
        recruiting, screening, and selecting skilled maids and nannies to ensure
        top-quality service for our clients. <br />
        <br /> With expertise in human resources and a keen eye for talent,
        Samjhana ensures that every candidate meets our high standards of
        professionalism and reliability. She is dedicated to creating a smooth
        hiring process for both employees and clients, making sure families get
        the best care and support.
      </span>
    ),
    image: samjhana?.src,
  },
  {
    name: "Yasmin - HR Assistant",
    details: (
      <span>
        Yasmin, <strong>HR Assistant</strong>, focuses on recruiting and
        communicating directly with maids, guiding them through the hiring
        process and ensuring they meet our high standards. <br />
        <br /> Fluent in Arabic, Yasmin plays a key role in interviewing, and
        supporting maids, making sure they are well-prepared for their roles.
        Her expertise helps maintain a smooth and efficient recruitment process,
        ensuring our clients receive skilled and reliable household staff.
      </span>
    ),
    image: yasmin?.src,
  },
];

export default teamDetails;
