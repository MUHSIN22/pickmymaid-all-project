import {
  AspectRatio,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchFeaturedMaids } from "@/lib/features/maid/maidAction";
import Image from "../../../../src/components/atoms/NextImageWrapper/Image";

export default function BlogMaidsList() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { featuredMaid } = useAppSelector((state) => state?.maid);

  useEffect(() => {
    if (!featuredMaid || featuredMaid?.length === 0) {
      dispatch(fetchFeaturedMaids(null));
    }
  }, []);

  return (
    <Card pos="relative">
      <CardHeader pb={0}>
        <Heading variant="card">Handpicked profiles for you</Heading>
      </CardHeader>
      <CardBody>
        <VStack>
          {featuredMaid?.slice(0, 5).map((maid) => (
            <Flex
              key={maid?.id}
              w="100%"
              gap={2}
              cursor="pointer"
              onClick={() => router.push(`/maid/${maid?.id}`)}
              boxShadow="0px 0px 10px rgba(0,0,0,0.05)"
              p={2}
            >
              <Image
                src={maid.profile}
                w="5rem"
                alt="pickmymaid maid"
                aspectRatio={1 / 1}
                style={{ borderRadius: "4px" }}
              />
              <VStack flexShrink={10} alignItems="flex-start" gap={0}>
                <Heading variant="smaller">{maid?.name}</Heading>
                <HStack>
                  <Text variant="description">
                    {maid.nationality} | {maid.option} | {maid.experience} Years
                    Experience
                  </Text>
                </HStack>
              </VStack>
            </Flex>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
