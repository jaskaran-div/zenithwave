import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund Policy" };

// NOTE: The original page contained the placeholders "[Company Email]" and "[X] days".
// They have been filled with the support email and 14 days (matching clause 2) — please confirm.
const Email = () => <a href={`mailto:${site.emails.support}`}>{site.emails.support}</a>;

export default function RefundPolicyPage() {
  return (
    <div className="legal-prose">
      <p>
        This Refund Policy outlines the terms and conditions under which refunds may be issued for training
        programs provided by ZenithWave Capital Limited (“Company”, “we”, “our”, or “us”). By enrolling in
        our training program, you (“Student”, “you”) acknowledge and agree to this policy.
      </p>

      <h2>1. General Refund Policy</h2>
      <ul>
        <li>All payments made for training programs are non-refundable, except as explicitly stated in this policy.</li>
        <li>Refund requests must be submitted in writing to <Email /> within the specified time frame.</li>
      </ul>

      <h2>2. Cancellation &amp; Refund Eligibility</h2>
      <p>
        Students may cancel their enrollment within 14 days of registration for a full or partial refund,
        subject to the terms below.
      </p>
      <ul>
        <li><strong>Cancellation within 14 days:</strong> Eligible for a full refund (minus any processing fees if applicable).</li>
        <li><strong>Cancellation after 14 days but before training access begins:</strong> Eligible for a partial refund, deducting administrative costs.</li>
        <li><strong>Cancellation after training has commenced:</strong> No refund will be issued.</li>
        <li>Refunds cannot be provided once a student has accessed course materials or attended live sessions.</li>
        <li>Fees paid for third-party certifications or exams are non-refundable.</li>
      </ul>

      <h2>3. Refund Processing</h2>
      <ul>
        <li>Refunds will be issued using the original payment method within 5 business days of approval.</li>
        <li>Students must provide accurate payment details for refund processing.</li>
        <li>Any bank charges, transfer fees, or third-party processing fees will be deducted from the refund amount.</li>
      </ul>

      <h2>4. Training Cancellation by the Company</h2>
      <p>
        If the Company cancels a training session due to unforeseen circumstances, students will be offered
        the choice of:
      </p>
      <ul>
        <li>A full refund of the course fee, or</li>
        <li>Enrollment in a future training session at no extra cost.</li>
      </ul>

      <h2>5. Lock-in Period &amp; Early Termination Fees</h2>
      <ul>
        <li>If the training program involves a lock-in period, students may not request a refund after this period begins.</li>
        <li>If an Investor (as per a separate agreement) wishes to terminate their investment early, a 20% early termination fee will apply.</li>
      </ul>

      <h2>6. Exceptions &amp; Dispute Resolution</h2>
      <ul>
        <li>Refund requests based on dissatisfaction with the training content are not eligible unless the Company fails to deliver the agreed curriculum.</li>
        <li>
          In case of disputes, students may contact <Email /> for resolution. If necessary, disputes will be
          handled under the governing law of England and Wales.
        </li>
      </ul>

      <h2>7. Contact</h2>
      <p>
        For any queries regarding refunds, please contact us at <Email />.
      </p>
      <p>
        By enrolling in our training program, you acknowledge that you have read, understood, and agreed to
        this Refund Policy.
      </p>
    </div>
  );
}
