import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-prose">
      <h1 className="display mb-8 text-[clamp(3rem,6vw,5rem)]">Privacy Policy</h1>
      <p>
        At ZenithWave Capital Limited (“Company,” “we,” “our,” or “us”), we are committed to protecting
        your privacy and handling your personal data responsibly. This Privacy Policy explains how we
        collect, use, store, and protect your information when you use our services, including training
        programs and investment-related activities.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong>Personal Details</strong> – Name, contact details (email, phone number), date of birth, and address.</li>
        <li><strong>Payment Information</strong> – Bank details, payment history, and billing information for processing transactions.</li>
        <li><strong>Training &amp; Account Data</strong> – Enrollment details, course progress, assessments, and feedback.</li>
        <li><strong>Technical Data</strong> – IP addresses, device information, and website usage analytics.</li>
        <li><strong>Communication Data</strong> – Emails, messages, and feedback submitted through our platform.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and manage our training programs and services.</li>
        <li>To process payments and maintain financial records.</li>
        <li>To communicate important updates, including course changes, promotions, and policy updates.</li>
        <li>To improve our website, services, and user experience.</li>
        <li>To comply with legal, regulatory, and tax obligations.</li>
        <li>To protect our rights and prevent fraudulent activities.</li>
      </ul>

      <h2>3. How We Share Your Information</h2>
      <p>We do not sell your personal information. However, we may share your information with:</p>
      <ul>
        <li>Authorized service providers (e.g. LMS, payment gateways) who support our platform operations.</li>
        <li>Regulatory authorities, if required by applicable laws and regulations.</li>
        <li>Our legal or financial advisors when needed for business or legal obligations.</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>
        We retain your data only as long as necessary to fulfill the purposes for which it was collected,
        including any legal, accounting, or reporting requirements.
      </p>

      <h2>5. Your Data Rights</h2>
      <ul>
        <li><strong>Access</strong> – You may request a copy of the personal data we hold about you.</li>
        <li><strong>Correction</strong> – You can request corrections to your personal data.</li>
        <li><strong>Deletion</strong> – You can request the deletion of your data in certain circumstances.</li>
        <li><strong>Objection</strong> – You can object to data processing for direct marketing purposes.</li>
      </ul>

      <h2>6. Cookies and Tracking</h2>
      <p>
        We use cookies and similar tracking technologies to enhance user experience, analyze traffic, and
        deliver targeted content. You can control cookie preferences through your browser settings.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement technical and organizational measures to secure your personal data. However, no
        online platform is 100% secure. We encourage you to use strong passwords and protect your account
        details.
      </p>

      <h2>8. International Transfers</h2>
      <p>
        If we transfer your data internationally, we ensure adequate safeguards are in place to protect
        your information in compliance with data protection laws.
      </p>

      <h2>9. Children’s Privacy</h2>
      <p>
        Our services are not intended for children under the age of 16. We do not knowingly collect
        personal data from children.
      </p>

      <h2>10. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy occasionally. Any changes will be posted on this page with an
        updated effective date.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions or requests regarding your privacy or this policy, you may contact us at{" "}
        <a href={`mailto:${site.emails.compliance}`}>{site.emails.compliance}</a>.
      </p>
    </div>
  );
}
