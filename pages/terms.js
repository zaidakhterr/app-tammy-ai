import Container from "@/components/Container";

const Terms = () => {
  return (
    <Container className="prose prose-neutral !max-w-4xl py-8 dark:prose-invert">
      <h1>Terms of Service</h1>

      <p>
        Welcome to Tammy AI (hereinafter referred to as “Tammy AI”, “we”, “us”,
        or “our”). Tammy AI provides a service to summarize English narrated
        videos from YouTube (hereinafter referred to as “Service”). This Service
        is made available to you on our website, www.tammy.ai (hereinafter
        referred to as “Site”), as well as on our Chrome extension and mobile
        applications (hereinafter referred to as “Application”).
      </p>
      <p>
        By using the Service, you agree to be bound by these Terms of Service
        (hereinafter referred to as “Terms”), which constitute a binding legal
        agreement between you and Tammy AI. Please read these Terms carefully.
        If you do not agree to these Terms, you may not use the Service.
      </p>

      <p>
        Tammy AI reserves the right to update and change these Terms from time
        to time without prior notice. Any new features that augment or enhance
        the current Service, including the release of new tools and resources,
        shall be subject to these Terms. Continued use of the Service after any
        such changes shall constitute your consent to such changes.
      </p>

      {/* Acceptance of Terms*/}
      <h2> Acceptance of Terms</h2>
      <p>
        By using our service, you agree to be bound by these terms and
        conditions. If you do not agree to these terms and conditions, you
        should not use our service.
      </p>

      {/* Use of Service */}
      <h2>Use of Service</h2>
      <p>
        You may not use our service to generate summaries of YouTube videos that
        contain illegal or offensive content.
      </p>

      {/* Intellectual Property Rights*/}
      <h2>Intellectual Property Rights</h2>
      <p>
        Our service is protected by intellectual property laws. All rights,
        title, and interest in and to our service, including all copyrights,
        trademarks, and other intellectual property rights, are owned by us.
      </p>

      {/*User Content  */}
      <h2>User Content</h2>
      <p>
        By using our service, you grant us a non-exclusive, royalty-free,
        perpetual, irrevocable, and fully sub-licensable right to use,
        reproduce, modify, adapt, publish, translate, create derivative works
        from, distribute, and display any content that you submit to us through
        our service.
      </p>

      {/* Free Plan Users*/}
      <h2>Free Plan Users</h2>
      <p>
        For users of the free plan, you agree that usage of the service is
        subject to the limitations and restrictions as outlined on the Pricing &
        Subscription page. In exchange for use of the Service, you agree to view
        third-party ads. Tammy AI does not have control over the content of the
        ads served, and will not be held liable for the display of ads that are
        considered offensive or inappropriate by the user. It is important to
        note that the Service is provided "as is".
      </p>

      {/* Paid Plan Users */}
      <h2>Paid Plan Users</h2>
      <p>
        Users For paid plan users, you agree to using the Service based on the
        subscription rate as mentioned in the Pricing & Subscription page and
        subject to the restrictions and limitations as outlined in the Pricing &
        Subscription page. The Service is provided “as is”.
      </p>

      {/* Governing Law */}
      <h2>Governing Law</h2>
      <p>
        These Terms shall be governed by and interpreted in accordance with the
        laws of Singapore, and you hereby submit to the exclusive jurisdiction
        of the courts of Singapore.
      </p>

      {/* Limitation of Liability
       */}
      <h2>Limitation of Liability</h2>
      <p>
        We are not responsible for any damages that may arise from your use of
        our service, including but not limited to direct, indirect, incidental,
        punitive, and consequential damages.
      </p>

      {/* Disclaimer of Warranties
       */}
      <h2>Disclaimer of Warranties</h2>
      <p>
        We make no warranty that our service will meet your requirements, or
        that our service will be uninterrupted, timely, secure, or error-free.
        We make no warranty that the results that may be obtained from the use
        of our service will be accurate or reliable
      </p>

      {/* Modification of Terms
       */}
      <h2>Modification of Terms</h2>
      <p>
        We reserve the right to modify these terms and conditions at any time,
        without notice. Your continued use of our service after any changes to
        these terms and conditions will constitute your acceptance of the
        modified terms and conditions.
      </p>

      {/* Contact
       */}
      <h2>Contact</h2>
      <p>
        If you have any questions or concerns regarding these Terms, please
        contact us via our contact us page. Tammy AI Pte. Ltd. 2 Venture Drive,
        #13-24 VIsion Exchange Singapore (608526)
      </p>
    </Container>
  );
};

export default Terms;
