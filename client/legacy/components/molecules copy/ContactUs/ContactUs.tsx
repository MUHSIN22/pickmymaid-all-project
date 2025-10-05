import {
  AspectRatio,
  Box,
  Center,
  Grid,
  Hide,
  Image,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import contactSupportImg from '@/assets/images/contact us/support.jpg';
import ContactDetailsCard from '@/components/atoms/Cards/ContactDetailsCard/ContactDetailsCard';
import ContactForm from '@/components/atoms/Forms/ContactForm/ContactForm';
import { getAlternativeText } from '@/utils/altSelector';

export default function ContactUs({
  hideImage = false,
}: {
  hideImage?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Box>
      <Helmet>
        <title>Contact Us | Get in Touch with Pick My Maid Team</title>
        <meta
          name='description'
          content={`Reach out to us today for inquiries, assistance, or to discuss hiring maids and nannies in the UAE. We're here to help you find trusted domestic help.`}
        />
      </Helmet>
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '1.5fr 1fr',
        }}
        gap={4}
      >
        <VStack gap={{ base: 4, sm: 8 }}>
          {hideImage ? (
            <Hide below='sm'>
              <AspectRatio ratio={2 / 1} w='100%'>
                <Image
                  src={contactSupportImg.src}
                  w='100%'
                  h='100%'
                  objectFit='cover'
                  alt={getAlternativeText()}
                />
              </AspectRatio>
            </Hide>
          ) : (
            <AspectRatio ratio={2 / 1} w='100%'>
              <Image
                src={contactSupportImg.src}
                w='100%'
                h='100%'
                objectFit='cover'
                alt={getAlternativeText()}
              />
            </AspectRatio>
          )}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}
            gap={{ base: 2, sm: 4, md: 8 }}
            justifyContent={{
              base: 'space-between',
              sx: 'center',
              lg: 'flex-start',
            }}
            w='100%'
            px='5%'
          >
            <ContactDetailsCard
              title={t('common.location')}
              link='https://maps.app.goo.gl/srnQ1rbhvCoXE4bP8?g_st=iwb'
              text='The Iridium Building, Al Barsha, Dubai, United Arab Emirates'
            />
            <ContactDetailsCard
              title='Opening Hours'
              link=''
              text='Monday to Sunday,<br> 9:00 AM – 10:00 PM'
            />
            <ContactDetailsCard
              title={t('common.email')}
              link='mailto:support@pickmymaid.com'
              text='support@pickmymaid.com'
            />
            <ContactDetailsCard
              title={t('common.callOrWhatsapp')}
              link='tel:+971566369736'
              text='+971 566369736'
            />
          </Grid>
        </VStack>

        <Center px={{ base: '1rem', md: '2rem' }} w='100%'>
          <ContactForm />
        </Center>
      </Grid>
    </Box>
  );
}
