import { Box, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactElement, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FcBriefcase, FcTreeStructure, FcLineChart, FcMultipleDevices, FcBullish } from 'react-icons/fc';

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  const controls = useAnimation();
  const cardRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      controls.start({ scale: 1 });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0 }}
      animate={controls}
      transition={{ duration: 0.4 }}
    >
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        style={{
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.2s ease-in-out',
        }}
        whileHover={{ boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)' }}
      >
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}
          >
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md">{heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {description}
            </Text>
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default function gridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Features
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          CodeLineLogger is a free and open-source extension that is available for download from the Visual Studio Code Marketplace.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Effortless Line Logging'}
            icon={<Icon as={FcTreeStructure} w={10} h={10} />}
            description={
              'With a simple keyboard shortcut, you can wrap the selected line of code in a log statement, making debugging and analysis easier.'          
            }
            href={'#'}
          />
          <Card
            heading={'Smart Log Statements'}
            icon={<Icon as={FcMultipleDevices} w={10} h={10} />}
            description={
              'Depending on the language and context, CodeLineLogger intelligently adds log statements specific to each language'
            }
            href={'#'}
          />
          <Card
            heading={'Semicolon Handling'}
            icon={<Icon as={FcBriefcase} w={10} h={10} />}
            description={
              "The extension takes care of adding or omitting semicolons at the end of log statements based on the language's syntax conventions."
            }
            href={'#'}
          />
          <Card
            heading={'Multi-Language Support'}
            icon={<Icon as={FcLineChart} w={10} h={10} />}
            description={
              'CodeLineLogger supports multiple programming languages, including JavaScript, Python, Java, C#, Ruby, PHP, Go, Swift, Kotlin, C/C++, Rust, TypeScript, Lua, PowerShell, and Perl.'              
            }
            href={'#'}
          />
          
          
          <Card
            heading={'Selective Logging'}
            icon={<Icon as={FcBullish} w={10} h={10} />}
            description={
              'CodeLineLogger detects if the selected line is a function or object and adjusts the log statement accordingly, omitting quotes for non-string values.'
            }
            href={'#'}
          />
          
        </Flex>
      </Container>
    </Box>
  );
}
