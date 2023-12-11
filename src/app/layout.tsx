import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../css/base.css';
import '../css/globals.css';
import '../css/icons.css';

import awsConfig from '@graphql/aws-config';
import { Amplify } from 'aws-amplify';
import IntercomWrapper from '_components/IntercomWrapper';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import NextNProgressBarProvider from '_components/NextProgressBar.client';
// import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sirge',
  description: 'Sirge App',
  applicationName: `&nbsp;`,
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon.ico`,
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon-16x16.png`,
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon-32x32.png`,
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon-96x96.png`,
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon-128.png`,
        sizes: '128x128',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon-196x196.png`,
        sizes: '196x196',
        type: 'image/png',
      },
    ],
    shortcut: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/favicon.ico`,
    apple: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-72x72.png`,
        sizes: '72x72',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-144x144.png`,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-60x60.png`,
        sizes: '60x60',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-120x120.png`,
        sizes: '120x120',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-76x76.png`,
        sizes: '76x76',
        type: 'image/png',
      },
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/icons/apple-touch-icon-152x152.png`,
        sizes: '152x152',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sirge - The Ultimate Conversion Data Platform',
    description:
      'Sirge allows you to track your campaigns, website visits and analyze customer behaviour with conversion data and customer profile - all from one dashboard.',
    site: '@Sirge_io',
    siteId: '1400701986706755588',
    creator: '@nextjs',
    creatorId: '1467726470533754880',
    images: [
      `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/other/sirge-opengraph-512.png`,
    ],
  },
  openGraph: {
    title: 'Sirge - The Ultimate Conversion Data Platform',
    description:
      'Sirge allows you to track your campaigns, website visits and analyze customer behaviour with conversion data and customer profile - all from one dashboard.',
    url: 'https://sirge.io',
    siteName: 'Sirge',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/misc-assets/other/sirge-opengraph-512.png`,
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

Amplify.configure({
  ...awsConfig,
  ssr: true,
});

type LayoutProps = {
  children: React.ReactNode;
};

const RootLayout = async ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={`bg-bodyColor ${poppins.className}`}>
        <IntercomWrapper>
          <NextNProgressBarProvider>{children}</NextNProgressBarProvider>
        </IntercomWrapper>
      </body>

      <Script
        async
        defer
        crossOrigin="anonymous"
        src={`https://s3.pstatp.com/tiktok/tiktok-sdk/v2/tiktok-sdk.min.js`}
      />
      <Script
        async
        defer
        src={`https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css`}
      />
      {/* <noscript suppressHydrationWarning={true}>
        <Image
          height="1"
          alt=""
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_REACTPIXEL_INIT}&ev=PageView&noscript=1`}
        />
      </noscript> */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.NEXT_PUBLIC_REACTPIXEL_INIT});
          `,
        }}
      />
      <Script
        async
        src="https://cdn.tolt.io/tolt.js"
        data-tolt="ff612499-f15d-4632-8aa8-cf65b597849c"
      />
    </html>
  );
};

export default RootLayout;
