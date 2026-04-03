import React from "react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen w-full bg-[#0a0f1a] font-sans relative flex flex-col"
      style={{
        backgroundImage: "url(/assets/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <AmbientBackground />
      <NavBar />

      <main className="flex-1 relative z-10 flex flex-col items-center p-4 md:p-8 pt-20 md:pt-24">
        <div className="w-full max-w-4xl mb-12">
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

            <h1 className="relative text-3xl md:text-5xl font-bold text-white mb-2 text-center tracking-tight">
              Privacy Policy
            </h1>
            <p className="relative text-center text-gray-400 mb-10 text-sm">Autonomiq</p>

            <div className="relative z-10 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                <p>Autonomiq ("Company", "we", "our", "us") provides AI-powered automation services, including AI calling agents, WhatsApp agents, and web-based chat assistants.</p>
                <p className="mt-2">We are committed to protecting your personal data in accordance with applicable laws in the United Arab Emirates and, where applicable, the General Data Protection Regulation (GDPR) for users in France and the European Union.</p>
                <p className="mt-2">By using our services, you agree to this Privacy Policy.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Data We Collect</h2>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">Contact Information</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Name (if provided)</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>WhatsApp number</li>
                </ul>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">Interaction Data</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Call recordings and transcripts</li>
                  <li>WhatsApp and chat messages</li>
                  <li>Inputs and responses during AI interactions</li>
                </ul>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">General &amp; Technical Data</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Business-related details</li>
                  <li>IP address, browser type, device information</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Data</h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Provide AI-powered communication services</li>
                  <li>Respond to inquiries and manage interactions</li>
                  <li>Improve AI performance and accuracy</li>
                  <li>Monitor quality and train our systems</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Legal Basis for Processing</h2>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">🇦🇪 UAE</h3>
                <p>Processing is based on:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>User consent</li>
                  <li>Contractual necessity</li>
                  <li>Legitimate business interests</li>
                </ul>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">🇪🇺 EU / France</h3>
                <p>For users in France:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Consent</li>
                  <li>Contractual necessity</li>
                  <li>Legitimate interests</li>
                  <li>Legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. AI &amp; Automated Interactions</h2>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>You may interact with AI systems rather than humans</li>
                  <li>Calls and messages may be recorded and analyzed</li>
                  <li>AI-generated responses are automated and may not always be fully accurate</li>
                </ul>
                <p className="mt-2">You may request human assistance where available.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Consent to Communication</h2>
                <p>By providing your contact details, you agree to receive communications via:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Phone (including AI voice agents)</li>
                  <li>WhatsApp or messaging platforms</li>
                  <li>Web chat systems</li>
                </ul>
                <p className="mt-2">You may opt out at any time.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Data Sharing</h2>
                <p>We do not sell your personal data.</p>
                <p className="mt-2">We may share data with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Technology and hosting providers</li>
                  <li>Clients using our AI solutions</li>
                  <li>Authorities if required by law</li>
                </ul>
                <p className="mt-2">All third parties are required to protect your data.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. International Data Transfers</h2>
                <p>Your data may be processed in the United Arab Emirates and other jurisdictions.</p>
                <p className="mt-2">For EU users, appropriate safeguards (such as Standard Contractual Clauses) are implemented.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Data Retention</h2>
                <p>We retain personal data only as long as necessary for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Service delivery</li>
                  <li>AI system improvement</li>
                  <li>Legal compliance</li>
                </ul>
                <p className="mt-2">You may request deletion at any time.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Your Rights</h2>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">🇦🇪 UAE</h3>
                <p>You may request:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Access to your data</li>
                  <li>Correction or deletion</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">🇪🇺 EU / France</h3>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Access, correct, or delete your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
                <p className="mt-2">You may also contact the CNIL.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Data Security</h2>
                <p>We implement appropriate measures including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Secure infrastructure</li>
                  <li>Access controls</li>
                  <li>Encryption where applicable</li>
                </ul>
                <p className="mt-2">However, no system is completely secure.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">12. Third-Party Platforms (e.g., WhatsApp)</h2>
                <p>When interacting via third-party platforms:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Their privacy policies also apply</li>
                  <li>We are not responsible for their data practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">13. Cookies &amp; Tracking</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Improve user experience</li>
                  <li>Analyze traffic</li>
                  <li>Support AI functionality</li>
                </ul>
                <p className="mt-2">You can manage cookies through your browser settings.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">14. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. Updates will be posted with a revised effective date.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">15. Contact Us</h2>
                <p>For any privacy-related inquiries:</p>
                <ul className="list-none mt-2 space-y-1 ml-4">
                  <li>Email: <a href="mailto:info@autonomiq.ae" className="text-cyan-400 hover:underline">info@autonomiq.ae</a></li>
                  <li>Website: <a href="https://autonomiq.ae/" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">https://autonomiq.ae/</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
