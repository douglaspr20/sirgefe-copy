// 'use client';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import GoBackArrow from '_components/GoBackArrow';

export const metadata: Metadata = {
  title: 'Sirge | Terms and Conditions',
};

const TermsConditionsPage = async () => {
  return (
    <div className="grow px-6 py-4 overflow-y-auto h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="h2 mb-4 flex items-center">
          <GoBackArrow />
          Terms and Conditions
        </h2>
        <div className="widget-container text-page p-5">
          <h5 className="h5 mb-3">Last Updated: November 27, 2021</h5>
          <p className="mb-3">
            These terms and conditions outline the rules and regulations for the
            use of Sirge&apos;s Website, located at www.sirge.io.
          </p>
          <p className="mb-3">
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Sirge if you do not agree to any
            or all of the terms and conditions stated on this page.
          </p>
          <p className="mb-3">
            The following terminology applies to these Terms and Conditions:
            &quot;Customer&quot;, &quot;You&quot; and &quot;Your&quot; refers to
            you, the person log on this website and compliant to the
            Company&lsquo;s terms and conditions. &ldquo;The Company&rdquo;,
            &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and
            &quot;Us&quot;, &quot;Sirge&quot; refers to our Company Sirge.IO
            LLC., a Texas Limited Liability Company with a place of business at
            5049 Edwards Ranch Road, Suite 400, Forth Worth, TX 76109.
            &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to
            both the Client and ourselves. Any use of the above terminology or
            other words in the singular, plural, capitalization and/or he/she or
            they, are taken as interchangeable and therefore as referring to
            same.
          </p>
          <p className="mb-6">
            When we refer to &quot;Services&quot; in these Terms and Conditions,
            we mean products and services provided by us or our affiliates as
            applicable and as is. Trial basis or free products or services can
            have limitations set by us and are non negotiable. You agree to the
            terms of the services you subscribe to or order via an &quot;Order
            Form&quot;.
          </p>
          <h5 className="h5 mb-3">Security and Data</h5>
          <p className="mb-3">
            We employ security measures across our platform. The security of
            your data and of your customers is important to us. Despite our best
            efforts to stay compliant with laws and staying up to date with
            security protocols, by accessing Sirge, you agree to use our
            platform as is and at your discretion and you waive your right to
            bring any claims against us. All data travels over https.
          </p>
          <p className="mb-3">
            You may use our tracking script on your website to track your
            website visitors and campaigns. Data is passed to us via a script
            and over https and is securly stored. With the script on your site
            we make no warranties that it is without faults. When integrated on
            websites or apps that may or may not include other scripts from
            third parties, scripts, stylesheets or code can collide, hindering
            functionality or designs of websites. As such we are not liable for
            any issues that may arise from the use of our script on any of your
            websites or apps. If you run into issues with using or implementing
            the script please contact customer support as we will be glad to
            help you.
          </p>
          <p className="mb-3">
            It is important to keep personal information confidential at all
            times. By using and having an account on Sirge you may view personal
            information collected from your website or app visitors within
            limits of applicable laws. By using Sirge you are also responsible
            for the ethical use and the security of the data of your customers.
            By this we mean never to share access to your Sirge account with
            unauthorized users or leaving your account signed in, in public
            places. Sirge and its employees will never share or sell your
            customer data. If we notice any breaches of security we will inform
            you and reserve the right to place limitations or a block on your
            account without warning until an invetsigation has been conducted if
            applicable. If the result of an investigation determines that you
            have shared your login information with others, your account may be
            flagged for termination at our discretion without refund.
          </p>
          <p className="mb-6">
            We will not be held liable for any loss or damages arising from the
            unauthorized use of your account and scripts associated with your
            account.
          </p>
          <h5 className="h5 mb-3">Cookies</h5>
          <p className="mb-3">
            We employ the use of cookies. By accessing Sirge, you agree to use
            cookies in agreement with the Sirge&apos;s Privacy Policy.
          </p>
          <p className="mb-6">
            Most interactive websites use cookies to let us retrieve the
            user&#39;s details for each visit. Cookies are used by our website
            to enable the functionality of certain areas to make it easier for
            people visiting our website. Some of our affiliate/advertising
            partners may also use cookies.
          </p>
          <h5 className="h5 mb-3">License</h5>
          <p className="mb-3">
            Unless otherwise stated, Sirge and/or its licensors own the
            intellectual property rights for all material on Sirge. All
            intellectual property rights are reserved. You may access our
            services for your own personal or professional use, subjected to
            restrictions set in these terms and conditions.
          </p>
          <h6 className="font-semibold text-header">You must not: </h6>
          <ul className="list-disc pl-3 mb-3">
            <li>Republish material from Sirge</li>
            <li>Sell, rent or sub-license material from Sirge</li>
            <li>Reproduce, duplicate or copy material from Sirge</li>
            <li>Redistribute content from Sirge</li>
          </ul>
          <p className="mb-3">
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Sirge does not filter, edit, publish or review Comments prior to
            their presence on the website. Comments do not reflect the views and
            opinions of Sirge, its agents and/or affiliates. Comments reflect
            the views and opinions of the person who post their views and
            opinions. To the extent permitted by applicable laws, Sirge shall
            not be liable for the Comments or for any liability, damages or
            expenses caused and/or suffered as a result of any use of and/or
            posting of and/or appearance of the Comments on this website.
          </p>
          <p className="mb-3">
            Sirge reserves the right to monitor all Comments and to remove any
            Comments which can be considered inappropriate, offensive or causes
            breach of these Terms and Conditions.
          </p>
          <h6 className="font-semibold">You warrant and represent that:</h6>
          <ul className="list-disc pl-3 mb-3">
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
          </ul>
          <p className="mb-3">
            You hereby grant Sirge a non-exclusive license to use, reproduce,
            edit and authorize others to use, reproduce and edit any of your
            Comments in any and all forms, formats or media.
          </p>
          <ul className="list-disc pl-3 mb-6">
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>
              By use of any other description of our Website being linked to
              that makes sense within the context and format of content on the
              linking party&#39;s site.
            </li>
          </ul>
          <h5 className="h5 mb-3">Content</h5>
          <p className="mb-6">
            Without prior approval and written permission, you may not create
            frames around our Webpages that alter in any way the visual
            presentation or appearance of our Website. No use of Sirge&apos;s
            logo, corporate name or other artwork will be allowed.
          </p>
          <h5 className="h5 mb-3">Content Liability</h5>
          <p className="mb-6">
            We shall not be held responsible for any content or that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </p>
          <h5 className="h5 mb-3">Your Privacy</h5>
          <p className="mb-6">
            Please read{' '}
            <Link href="/privacy-policy" className="link">
              Privacy Policy
            </Link>
          </p>
          <h5 className="h5 mb-3">Reservation of Rights</h5>
          <p>
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amend these terms and conditions and it&#39;s linking policy at any
            time. By continuously linking to our Website, you agree to be bound
            to and follow these linking terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
