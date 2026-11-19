import { MaskTitle } from "@/components/Hero";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <div className="legal-prose">
      <MaskTitle className="mb-8 text-[clamp(2.8rem,6vw,5rem)]">Terms and Conditions</MaskTitle>

      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using any part of our services, you agree to be bound by these Terms and Conditions.
        If you do not agree to all the terms and conditions, then you may not access the website or use any
        services.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old to register and use the services. By registering, you confirm that
        you meet the eligibility criteria.
      </p>

      <h2>3. Account Responsibilities</h2>
      <ul>
        <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        <li>Any activity under your account will be considered as your action.</li>
        <li>You agree to notify us immediately of any unauthorized use of your account.</li>
      </ul>

      <h2>4. Use of Services</h2>
      <p>
        You agree not to misuse the services. This includes unauthorized access, interference with the
        services, or violation of any applicable laws.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, materials, and trademarks on our site are the property of ZenithWave Capital or its
        licensors. Unauthorized use is strictly prohibited.
      </p>

      <h2>6. Termination</h2>
      <p>
        We may suspend or terminate your access if you breach these terms. Upon termination, your right to
        use the service will cease immediately.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        In no event shall ZenithWave Capital be liable for any indirect, incidental, or consequential damages
        arising from the use or inability to use the services.
      </p>

      <h2>8. Governing Law</h2>
      <p>These terms shall be governed by and construed in accordance with the laws of England and Wales.</p>

      <h2>9. Contact</h2>
      <p>
        For questions or concerns regarding these Terms &amp; Conditions, please contact us at{" "}
        <a href={`mailto:${site.emails.compliance}`}>{site.emails.compliance}</a>.
      </p>
    </div>
  );
}
