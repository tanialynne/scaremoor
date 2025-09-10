import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Scaremoor - how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="font-trickordead text-4xl md:text-6xl mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-gray-300 text-center mb-12">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long", 
              day: "numeric"
            })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-orange-300">Personal Information</h3>
            <p className="text-gray-300 leading-relaxed">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Name and email address when you sign up for our newsletter or contact us</li>
              <li>Messages you send through our contact form</li>
              <li>Quiz responses and preferences when you use our book recommendation quiz</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-orange-300">Automatically Collected Information</h3>
            <p className="text-gray-300 leading-relaxed">
              When you visit our website, we automatically collect certain information about your device and usage patterns:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>IP address and general location information</li>
              <li>Browser type and version</li>
              <li>Device information and screen resolution</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">2. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Send you our newsletter and updates about new books and content</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Provide personalized book recommendations through our quiz</li>
              <li>Improve our website and create better user experiences</li>
              <li>Analyze website usage and performance</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and email services</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, sale, or other business transaction</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">4. Cookies and Tracking Technologies</h2>
            
            <h3 className="text-xl font-semibold text-orange-300">Essential Cookies</h3>
            <p className="text-gray-300 leading-relaxed">
              We use essential cookies that are necessary for our website to function properly. These cannot be disabled.
            </p>

            <h3 className="text-xl font-semibold text-orange-300">Analytics and Performance</h3>
            <p className="text-gray-300 leading-relaxed">
              We use analytics services to understand how visitors use our site:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> Tracks website usage and performance</li>
              <li><strong>Microsoft Clarity:</strong> Provides heatmaps and session recordings to improve user experience</li>
              <li><strong>Facebook Pixel:</strong> Tracks conversions and helps us understand the effectiveness of our marketing</li>
            </ul>

            <h3 className="text-xl font-semibold text-orange-300">Managing Cookies</h3>
            <p className="text-gray-300 leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">5. Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">6. Your Rights and Choices</h2>
            
            <h3 className="text-xl font-semibold text-orange-300">Email Communications</h3>
            <p className="text-gray-300 leading-relaxed">
              You can unsubscribe from our email communications at any time by clicking the unsubscribe link in any email or contacting us directly.
            </p>

            <h3 className="text-xl font-semibold text-orange-300">Data Access and Deletion</h3>
            <p className="text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">7. Children&apos;s Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              While our books are designed for middle-grade readers, our website is directed to parents, educators, and adult purchasers. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">8. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on this page and updating the effective date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-400">10. Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300">
                <strong>Email:</strong> privacy@scaremoor.com<br />
                <strong>Website:</strong> <a href="/contact" className="text-orange-400 hover:text-orange-300">Contact Form</a>
              </p>
            </div>
          </section>

          <div className="text-center pt-12 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              This privacy policy was last updated on {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}