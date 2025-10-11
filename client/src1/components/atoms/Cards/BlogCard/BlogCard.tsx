"use client";
// import rrd
import { useRouter } from "next/navigation";
import { IBlogCard } from "../../../../types/features/blogs/blogs.types";
import Image from "../../NextImageWrapper/Image";
import Button from "../../../ui/Button";

/* This is a functional component called `BlogCard` that takes in a prop called `data` of type
`IBlogCard`. It renders a `Card` component from the Chakra UI library with an image, title,
description, and a "Read More" button. The `useNavigate` hook from the `react-router-dom` library is
used to navigate to a specific blog post when the button is clicked. The component is exported as
the default export of the module, which means it can be imported with any name in other modules. */
export default function BlogCard({ data }: { data: IBlogCard }) {
  const router = useRouter();

  return (
    <div className="w-[100%] h-auto rounded-md [box-shadow:0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.06)] overflow-hidden">
      <Image
        parentClass="w-[100%] aspect-[2/1] object-cover object-center"
        alt={data.title}
        src={`https://api.pickmymaid.com/${data.thumbnail}`}
      />
      <div className="flex flex-col gap-[0.5rem] p-[0.5rem] sm:p-[1rem]">
        {data.editedDate && (
          <p className="text-[0.7rem] sm:text-sm font-[500]">
            Last updated on{" "}
            <strong>{new Date(data.editedDate).toLocaleDateString()}</strong>
          </p>
        )}

        <h3 className="heading-card leading-snug line-clamp-2">{data.title}</h3>

        <p className="text-description leading-snug text-justify font-[500] text-[0.8rem] sm:text-md line-clamp-2">
          {data.description}
        </p>

        <Button
          onClick={() => router.push(`/blog/${data.blogID}`)}
          className="btn-outlined mt-auto text-[0.8rem] sm:text-[1rem]"
        >
          Read More
        </Button>
      </div>
    </div>
    // <Card w="100%" overflow="hidden">
    //   <AspectRatio ratio={2 / 1}>
    //     <Image
    //       src={`https://api.pickmymaid.com/${data.thumbnail}`}
    //       alt={data.title}
    //       h="100%"
    //       w="100%"
    //       objectFit="cover"
    //       objectPosition="center"
    //     />
    //   </AspectRatio>

    //   <CardBody
    //     display="flex"
    //     flexDirection="column"
    //     gap="0.5rem"
    //     p={["0.5rem", "1rem"]}
    //   >
    //     {data.editedDate && (
    //       <Text fontSize={{ base: "x-small", sm: "sm" }} fontWeight="500">
    //         Last updated on{" "}
    //         <strong>{new Date(data.editedDate).toLocaleDateString()}</strong>
    //       </Text>
    //     )}

    //     <Heading variant="card" noOfLines={2}>
    //       {data.title}
    //     </Heading>

    //     <Text
    //       noOfLines={2}
    //       fontSize={{ base: "0.8rem", sm: "md" }}
    //       fontWeight="500"
    //       variant="description"
    //       textAlign="justify"
    //     >
    //       {data.description}
    //     </Text>

    //     <Button
    //       onClick={() => router.push(`/blogs/${data.blogID}`)}
    //       variant="outlined"
    //       marginTop="auto"
    //       fontSize={{ base: "0.8rem", sm: "1rem" }}
    //     >
    //       Read More
    //     </Button>
    //   </CardBody>
    // </Card>
  );
}
