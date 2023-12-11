import GoBackArrow from '_components/GoBackArrow';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Sirge | Privacy Policy',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="grow px-6 py-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h2 className="h2 mb-4 flex items-center">
          <GoBackArrow />
          Privacy Policy
        </h2>
        <div className="widget-container text-page p-5">
          <p className="mb-3">
            This Privacy Policy explains how Sirge.IO LLC (&lsquo;Sirge&rsquo;,
            or &lsquo;we&rsquo;, &lsquo; &rsquo;us&lsquo; &rsquo; or &lsquo;
            &rsquo;our&lsquo; &rsquo;) handles personal information that we
            collect through our website at Sirge.io (the &lsquo;Site&rsquo;);
          </p>
          <p className="mb-3">
            Sirge respects your privacy rights and is committed to transparency
            in how we collect, use and share your personal information. If you
            have additional questions or require more information about our
            Privacy Policy, do not hesitate to contact us.
          </p>
          <p className="mb-6">
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
          <h5 className="h5 mb-3">Sirge&#39;s Service and Customer Data</h5>
          <p className="mb-3">
            Registered users of the Service (&lsquo;Customers&rsquo;) are users
            with businesses that use it to collect and manage information about
            their own users (&quot;Customer Data&quot;), including information
            about how they interact with the Customer&#39;s websites,
            applications, services and designated third-party partners
            (&quot;Customer Services&quot;). Customers also use the Service to
            more efficiently route Customer Data to Sirge to control how
            Customer Data is managed between these services and third parties
            where applicable.
          </p>
          <p>
            Customer Data may include, without limitation, information about the
            identity of Customer users (such as full name, postal address,
            e-mail address, IP address and phone number), as well as information
            about the pages users visit, the features they use, and the actions
            they take while using Customer Services. This Privacy Policy does
            not apply to Customer Data or to Customer Services, and we are not
            responsible for our Customers&#39; handling of Customer Data. Our
            Customers have their own policies regarding the collection, use and
            disclosure of your personal information. To learn about how a
            particular Customer handles your personal information, we encourage
            you to read the Customer&#39;s privacy policy. Our use of Customer
            Data provided by our Customers in connection with our Service is
            subject to the written agreement between Sirge and Customer. We do
            not share or sell Customer Data to third parties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
