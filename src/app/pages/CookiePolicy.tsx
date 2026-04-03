import React from "react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

export default function CookiePolicy() {
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
              Cookie Policy
            </h1>
            <p className="relative text-center text-gray-400 mb-4 text-sm">Autonomiq</p>
            <p className="relative text-center text-gray-400 mb-10 text-sm">Effective Date: 01/04/2026</p>

            <div className="relative z-10 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                <p>This Cookie Policy explains how Autonomiq ("Company", "we", "our", "us") uses cookies and similar technologies when you visit our website or interact with our AI-powered services.</p>
                <p className="mt-2">This Cookie Policy should be read together with our Privacy Policy.</p>
                <p className="mt-2">We comply with applicable regulations in the United Arab Emirates (UAE) and, where applicable, the General Data Protection Regulation (GDPR) for users in the European Union, including France.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. What Are Cookies</h2>
                <p>Cookies are small text files stored on your device (computer, smartphone, or tablet) when you visit a website. They allow websites to function properly, improve performance, and enhance user experience.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Types of Cookies We Use</h2>

                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">3.1 Essential Cookies (Strictly Necessary)</h3>
                <p>These cookies are required for the website to function and cannot be disabled. They are used for:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Security and authentication</li>
                  <li>Session management</li>
                  <li>Basic website functionality</li>
                </ul>
                <p className="mt-2">These cookies do not require user consent.</p>

                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">3.2 Analytics Cookies</h3>
                <p>These cookies help us understand how visitors use our website. They may collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Pages visited</li>
                  <li>Time spent on the website</li>
                  <li>Device and browser information</li>
                </ul>
                <p className="mt-2">These cookies help improve website performance and user experience.</p>

                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">3.3 Functional Cookies</h3>
                <p>These cookies enable enhanced features, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>AI chat and web agents</li>
                  <li>Personalization of user experience</li>
                </ul>
                <p className="mt-2">Disabling these cookies may affect certain features of the website.</p>

                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">3.4 Marketing Cookies</h3>
                <p>These cookies may be used to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Deliver relevant advertisements</li>
                  <li>Track user interaction across platforms</li>
                  <li>Measure marketing effectiveness</li>
                </ul>
                <p className="mt-2">These cookies require your explicit consent.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Cookies</h2>
                <p>We use cookies to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Ensure proper website functionality</li>
                  <li>Improve performance and usability</li>
                  <li>Support AI-powered features and automation</li>
                  <li>Analyze traffic and user behavior</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Legal Basis for Use</h2>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">5.1 United Arab Emirates (UAE)</h3>
                <p>Cookies are used in accordance with applicable data protection laws, based on transparency and user awareness. Consent is obtained where required.</p>
                <h3 className="text-lg font-medium text-cyan-400 mt-4 mb-2">5.2 European Union (Including France)</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Essential cookies: Legitimate interest</li>
                  <li>Non-essential cookies: User consent (via cookie banner)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Managing Your Cookie Preferences</h2>
                <p>You can manage or withdraw your consent at any time by:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Clicking "Cookie Settings" on our website</li>
                  <li>Adjusting your browser settings</li>
                  <li>Updating your preferences via our cookie banner</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Third-Party Cookies</h2>
                <p>We may allow third-party services (such as analytics or messaging providers) to place cookies on your device.</p>
                <p className="mt-2">These third parties operate under their own privacy and cookie policies. We do not control their practices.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Data Collected via Cookies</h2>
                <p>Cookies may collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Interaction data (pages visited, clicks, session duration)</li>
                </ul>
                <p className="mt-2">This information may be combined with other data you provide.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Data Retention</h2>
                <p>Cookies are stored for different durations:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Session cookies: Deleted when you close your browser</li>
                  <li>Persistent cookies: Remain until expiration or manual deletion</li>
                </ul>
                <p className="mt-2">You can delete cookies at any time via your browser settings.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">10. Updates to This Policy</h2>
                <p>We may update this Cookie Policy from time to time. Updates will be published on this page with a revised effective date.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
                <p>If you have any questions about this Cookie Policy:</p>
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
