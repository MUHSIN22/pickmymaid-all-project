import { useEffect, useRef, useState } from 'react';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { animate, useMotionValue } from 'framer-motion';
import { countData } from './Counts.data';
import bgImage from '@/assets/images/campaign/count_bg.png';
import { commonPadding } from '@/components/atoms/styles';

export default function Counts() {
  const controlsRefs = [
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
    useRef<HTMLHeadingElement>(null),
  ] as any;
  const animValues = countData.map(() => useMotionValue(0));
  const animationControls = useRef<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust the threshold as needed
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (controlsRefs[0].current) {
      observer.observe(controlsRefs[0].current);
    }

    return () => {
      if (controlsRefs[0].current) {
        observer.unobserve(controlsRefs[0].current);
      }
    };
  }, []);

  const formatCount = (value: number): string => {
    if (value === 3) {
      return `${value.toFixed(0)}k+`;
    } else {
      return `${value.toFixed(0)}+`;
    }
  };

  useEffect(() => {
    if (isVisible) {
      animationControls.current = countData.map((data, index) => {
        return animate(animValues[index], data.count || 0, {
          duration: 1,
          onUpdate: (value) => {
            if (controlsRefs[index].current) {
              controlsRefs[index].current.textContent = formatCount(value);
            }
          },
        });
      });
    } else {
      animationControls.current.forEach((control) => control.stop());
    }

    return () => {
      animationControls.current.forEach((control) => control.stop());
    };
  }, [isVisible, animValues, countData]);

  return (
    <VStack
      py={{ base: '4rem', md: '6rem' }}
      gap={{ base: '2rem', md: '5rem' }}
      w='100%'
      sx={commonPadding}
      style={{
        background: `url('${bgImage?.src}')`,
        backgroundSize: 'cover',
      }}
    >
      <Heading
        variant='sectionTitle'
        as='h1'
        maxW={{ base: '100%', md: '70%', xl: '60%' }}
        textAlign='center'
      >
        Are You Seeking For Your Next Nanny, Full / Part-time Housemaid in
        Dubai?
      </Heading>
      <HStack
        flexDirection={{ base: 'column', md: 'row' }}
        w={{ base: '100%', md: '60%', xl: '55%' }}
        gap='2rem'
        justifyContent='space-between'
      >
        {countData.map((items, index) => (
          <VStack key={items.count}>
            <Heading
              ref={controlsRefs[index]}
              fontSize={{ base: '3.5rem', md: '2.8rem', xl: '3.3rem' }}
              color='#FF6F51'
            >
              {formatCount(animValues[index].get())}
            </Heading>
            <Text
              fontSize={{ base: '1.5rem', md: '1rem', xl: '1.3rem' }}
              fontWeight='500'
            >
              {items.head}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
}
