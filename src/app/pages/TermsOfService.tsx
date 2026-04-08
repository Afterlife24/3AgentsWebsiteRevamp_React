import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0f1a] font-sans overflow-hidden relative flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/bg.png"
          alt="background"
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      <AmbientBackground />
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto z-10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 mb-8 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
                <p className="text-gray-300 mt-1">AUTONOMIQ - Last Updated: March 28, 2026</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-xl">
            <div className="prose prose-invert max-w-none text-gray-300 space-y-8">
              {/* Agreement Section */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Agreement to Our Legal Terms</h2>
                <p className="leading-relaxed mb-4">
                  We are Autonomiq, doing business as Autonomiq ('Company', 'we', 'us', or 'our'). We operate the website{" "}
                  <a href="https://autonomiq.ae/" className="text-cyan-400 hover:text-cyan-300">
                    https://autonomiq.ae/
                  </a>{" "}
                  (the 'Site'), as well as any other related products and services that refer or link to these legal terms (the 'Legal Terms') (collectively, the 'Services').
                </p>
                <p className="leading-relaxed mb-4">
                  We provide digital products and services including, but not limited to, artificial intelligence (AI) agents, workflow automations, custom software solutions, websites, and mobile or web applications. These services are designed to support business operations, improve efficiency, and enhance user experience.
                </p>
                <p className="leading-relaxed mb-4">
                  You can contact us by email at{" "}
                  <a href="mailto:autonomiq57@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                    autonomiq57@gmail.com
                  </a>
                  .
                </p>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 my-4">
                  <p className="text-white font-semibold">
                    IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                  </p>
                </div>
                <p className="leading-relaxed">
                  The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                </p>
              </section>

              {/* Table of Contents */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Table of Contents</h2>
                <div className="bg-[#0d3a4a]/60 rounded-xl p-6 border border-cyan-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {[
                      "Our Services",
                      "Intellectual Property Rights",
                      "User Representations",
                      "User Registration",
                      "Products",
                      "Purchases and Payment",
                      "Subscriptions",
                      "Refunds Policy",
                      "Software",
                      "Prohibited Activities",
                      "User Generated Contributions",
                      "Contribution Licence",
                      "Social Media",
                      "Third-Party Websites and Content",
                      "Services Management",
                      "Privacy Policy",
                      "Copyright Infringements",
                      "Term and Termination",
                      "Modifications and Interruptions",
                      "Governing Law",
                      "Dispute Resolution",
                      "Corrections",
                      "Disclaimer",
                      "Limitations of Liability",
                      "Indemnification",
                      "User Data",
                      "Electronic Communications, Transactions, and Signatures",
                      "SMS Text Messaging",
                      "California Users and Residents",
                      "Miscellaneous",
                      "Contact Us",
                    ].map((item, index) => (
                      <div key={index} className="text-cyan-400 hover:text-cyan-300 text-sm py-1">
                        {index + 1}. {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Our Services</h2>
                <p className="leading-relaxed mb-4">
                  The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
                </p>
                <p className="leading-relaxed">
                  Use of services must comply with all applicable laws. Access from other jurisdictions is entirely at your own risk.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Our Intellectual Property</h3>
                <p className="leading-relaxed mb-4">
                  We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks').
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Your Use of Our Services</h3>
                <p className="leading-relaxed mb-4">
                  Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable licence to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                  <li>Access the Services; and</li>
                  <li>Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</li>
                </ul>
                <h3 className="text-xl font-semibold text-white mb-3">Your Submissions and Contributions</h3>
                <p className="leading-relaxed">
                  By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ('Submissions'), you agree to assign to us all intellectual property rights in such Submission. When you post Contributions, you grant us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to use, copy, reproduce, distribute, and exploit your Contributions for any purpose.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Representations</h2>
                <p className="leading-relaxed mb-4">By using the Services, you represent and warrant that:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>All registration information you submit will be true, accurate, current, and complete</li>
                  <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
                  <li>You have the legal capacity and you agree to comply with these Legal Terms</li>
                  <li>You are not a minor in the jurisdiction in which you reside</li>
                  <li>You will not access the Services through automated or non-human means</li>
                  <li>You will not use the Services for any illegal or unauthorised purpose</li>
                  <li>Your use of the Services will not violate any applicable law or regulation</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. User Registration</h2>
                <p className="leading-relaxed">
                  You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Products</h2>
                <p className="leading-relaxed">
                  All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Purchases and Payment</h2>
                <p className="leading-relaxed mb-4">We accept the following forms of payment:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                  <li>Discover</li>
                  <li>PayPal</li>
                </ul>
                <p className="leading-relaxed mb-4">
                  You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. All payments shall be in AED.
                </p>
                <p className="leading-relaxed">
                  We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Subscriptions</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Billing and Renewal</h3>
                <p className="leading-relaxed mb-4">
                  Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Cancellation</h3>
                <p className="leading-relaxed mb-4">
                  You can cancel your subscription at any time by contacting us. Your cancellation will take effect at the end of the current paid term. If you have any questions, please email us at{" "}
                  <a href="mailto:autonomiq57@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                    autonomiq57@gmail.com
                  </a>
                  .
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Fee Changes</h3>
                <p className="leading-relaxed">
                  We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Refunds Policy</h2>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-white font-semibold">All sales are final and no refund will be issued.</p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Software</h2>
                <p className="leading-relaxed">
                  We may include software for use in connection with our Services. If such software is accompanied by an end user licence agreement ('EULA'), the terms of the EULA will govern your use of the software. Any software and any related documentation is provided 'AS IS' without warranty of any kind, either express or implied.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Prohibited Activities</h2>
                <p className="leading-relaxed mb-4">
                  You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>Systematically retrieve data or other content from the Services</li>
                  <li>Trick, defraud, or mislead us and other users</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features</li>
                  <li>Disparage, tarnish, or otherwise harm us and/or the Services</li>
                  <li>Use any information obtained from the Services to harass, abuse, or harm another person</li>
                  <li>Make improper use of our support services</li>
                  <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
                  <li>Engage in unauthorised framing of or linking to the Services</li>
                  <li>Upload or transmit viruses, Trojan horses, or other malicious material</li>
                  <li>Engage in any automated use of the system</li>
                  <li>Attempt to impersonate another user or person</li>
                  <li>Interfere with, disrupt, or create an undue burden on the Services</li>
                  <li>Harass, annoy, intimidate, or threaten any of our employees or agents</li>
                  <li>Attempt to bypass any measures designed to prevent or restrict access to the Services</li>
                  <li>Copy or adapt the Services' software</li>
                  <li>Decipher, decompile, disassemble, or reverse engineer any software</li>
                  <li>Use the Services as part of any effort to compete with us</li>
                  <li>Use the Services to advertise or offer to sell goods and services</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. User Generated Contributions</h2>
                <p className="leading-relaxed mb-4">
                  The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality. When you create or make available any Contributions, you thereby represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>The creation, distribution, transmission, public display, or performance of your Contributions does not infringe any proprietary rights of any third party</li>
                  <li>You are the creator and owner of the Contributions</li>
                  <li>Your Contributions are not false, inaccurate, or misleading</li>
                  <li>Your Contributions are not unsolicited advertising, spam, or other forms of solicitation</li>
                  <li>Your Contributions are not obscene, lewd, violent, harassing, libellous, or otherwise objectionable</li>
                  <li>Your Contributions do not violate any applicable law, regulation, or rule</li>
                  <li>Your Contributions do not violate the privacy or publicity rights of any third party</li>
                </ul>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Contribution Licence</h2>
                <p className="leading-relaxed mb-4">
                  By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt, and distribute such Contributions for any purpose.
                </p>
                <p className="leading-relaxed">
                  We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions.
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Social Media</h2>
                <p className="leading-relaxed">
                  As part of the functionality of the Services, you may link your account with online accounts you have with third-party service providers (each such account, a 'Third-Party Account'). Your relationship with the third-party service providers associated with your third-party accounts is governed solely by your agreement(s) with such third-party service providers.
                </p>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Third-Party Websites and Content</h2>
                <p className="leading-relaxed">
                  The Services may contain links to other websites ('Third-Party Websites') as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content belonging to or originating from third parties ('Third-Party Content'). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content.
                </p>
              </section>

              {/* Section 15 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">15. Services Management</h2>
                <p className="leading-relaxed">
                  We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; (3) refuse, restrict access to, limit the availability of, or disable any of your Contributions or any portion thereof; (4) remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
                </p>
              </section>

              {/* Section 16 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">16. Privacy Policy</h2>
                <p className="leading-relaxed mb-4">
                  We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms.
                </p>
                <p className="leading-relaxed">
                  Please be advised the Services are hosted in India and United Arab Emirates. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India and United Arab Emirates, then through your continued use of the Services, you are transferring your data to India and United Arab Emirates, and you expressly consent to have your data transferred to and processed in India and United Arab Emirates.
                </p>
              </section>

              {/* Section 17 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">17. Copyright Infringements</h2>
                <p className="leading-relaxed">
                  We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below. A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification.
                </p>
              </section>

              {/* Section 18 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">18. Term and Termination</h2>
                <p className="leading-relaxed mb-4">
                  These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
                </p>
                <p className="leading-relaxed">
                  If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
                </p>
              </section>

              {/* Section 19 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">19. Modifications and Interruptions</h2>
                <p className="leading-relaxed mb-4">
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services.
                </p>
                <p className="leading-relaxed">
                  We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services.
                </p>
              </section>

              {/* Section 20 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">20. Governing Law</h2>
                <p className="leading-relaxed">
                  These Legal Terms shall be governed by and defined following the laws of the United Arab Emirates. Autonomiq and yourself irrevocably consent that the courts of the United Arab Emirates shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                </p>
              </section>

              {/* Section 21 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">21. Dispute Resolution</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Informal Negotiations</h3>
                <p className="leading-relaxed mb-4">
                  To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms, the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Binding Arbitration</h3>
                <p className="leading-relaxed mb-4">
                  Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC. The number of arbitrators shall be three (3). The seat, or legal place, of arbitration shall be Visakhapatnam, India. The language of the proceedings shall be English.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Restrictions</h3>
                <p className="leading-relaxed mb-4">
                  The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Exceptions to Informal Negotiations and Arbitration</h3>
                <p className="leading-relaxed">
                  The Parties agree that the following Disputes are not subject to the above provisions: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorised use; and (c) any claim for injunctive relief.
                </p>
              </section>

              {/* Section 22 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">22. Corrections</h2>
                <p className="leading-relaxed">
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </section>

              {/* Section 23 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">23. Disclaimer</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                  <p className="text-white font-semibold mb-3">
                    THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  </p>
                  <p className="leading-relaxed">
                    YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT.
                  </p>
                </div>
              </section>

              {/* Section 24 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">24. Limitations of Liability</h2>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                  <p className="leading-relaxed">
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE LESSER OF THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE TWO (2) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING OR $150.00 USD.
                  </p>
                </div>
              </section>

              {/* Section 25 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">25. Indemnification</h2>
                <p className="leading-relaxed">
                  You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services.
                </p>
              </section>

              {/* Section 26 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">26. User Data</h2>
                <p className="leading-relaxed">
                  We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                </p>
              </section>

              {/* Section 27 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">27. Electronic Communications, Transactions, and Signatures</h2>
                <p className="leading-relaxed">
                  Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                </p>
              </section>

              {/* Section 28 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">28. SMS Text Messaging</h2>
                <h3 className="text-xl font-semibold text-white mb-3">Program Description</h3>
                <p className="leading-relaxed mb-4">
                  By opting into any Autonomiq text messaging program, you expressly consent to receive text messages (SMS) to your mobile number.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Opting Out</h3>
                <p className="leading-relaxed mb-4">
                  If at any time you wish to stop receiving SMS messages from us, simply reply to the text with 'STOP'. You may receive an SMS message confirming your opt out. After this, you will no longer receive SMS messages from us.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Message and Data Rates</h3>
                <p className="leading-relaxed mb-4">
                  Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan. Carriers are not liable for delayed or undelivered messages.
                </p>
                <h3 className="text-xl font-semibold text-white mb-3">Support</h3>
                <p className="leading-relaxed">
                  If you have any questions or need assistance regarding our SMS communications, please reply with the keyword HELP. You can also email us at{" "}
                  <a href="mailto:autonomiq57@gmail.com" className="text-cyan-400 hover:text-cyan-300">
                    autonomiq57@gmail.com
                  </a>
                  .
                </p>
              </section>

              {/* Section 29 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">29. California Users and Residents</h2>
                <p className="leading-relaxed">
                  If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                </p>
              </section>

              {/* Section 30 */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">30. Miscellaneous</h2>
                <p className="leading-relaxed mb-4">
                  These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.
                </p>
                <p className="leading-relaxed mb-4">
                  These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
                </p>
                <p className="leading-relaxed">
                  If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services.
                </p>
              </section>

              {/* Section 31 - Contact Section */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">31. Contact Us</h2>
                <div className="bg-[#0d3a4a]/60 rounded-xl p-6 border border-cyan-500/30">
                  <p className="leading-relaxed mb-4">
                    In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                  </p>
                  <p className="text-white font-semibold mb-1">Autonomiq</p>
                  <p className="text-cyan-400 mb-1">
                    Email:{" "}
                    <a href="mailto:autonomiq57@gmail.com" className="hover:text-cyan-300">
                      autonomiq57@gmail.com
                    </a>
                  </p>
                  <p className="text-cyan-400">
                    Website:{" "}
                    <a href="https://autonomiq.ae/" className="hover:text-cyan-300">
                      https://autonomiq.ae/
                    </a>
                  </p>
                </div>
              </section>

              {/* Important Notice */}
              <section>
                <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    IMPORTANT NOTICE: REVISION OF TERMS AND CONDITIONS
                  </h3>
                  <p className="leading-relaxed">
                    Terms and conditions may be revised at any moment according to the will of the Company at any time. The Company reserves the sole and absolute right to revise, amend, update, replace, or otherwise modify any or all provisions of these Terms and Conditions at any time, without prior notice. Continued use of the Services following any such revision shall constitute your acceptance of the revised terms.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
