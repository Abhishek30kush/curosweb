import React from 'react'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'

export default function SSPointPrivacyPolicy() {
  return (
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Privacy Policy for SS Point Coaching" 
        subtitle="Last Updated: April 28, 2026"
        breadcrumb={[{ name: 'SS Point Privacy Policy' }]}
      />

      <section className="section bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="card p-8 md:p-12 space-y-8 text-gray-300">
              <p className="text-lg leading-relaxed">
                This Privacy Policy describes how SS Point Coaching ("we", "us", or "our") handles your information when you use our mobile application (Package Name: com.sspoint.app). 
                SS Point Coaching is a Coaching Management & Educational Platform designed to facilitate learning and management for students and teachers.
              </p>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">1. Information Collection and Use</h2>
                <p className="mb-4">To provide and improve our service, we collect several types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Personal Information</strong>: We collect your Name, Email Address, Phone Number, and Profile Pictures to create and manage your account.</li>
                  <li><strong className="text-white">Authentication</strong>: We use Google Sign-In and Firebase Authentication to securely verify your identity.</li>
                  <li><strong className="text-white">Educational Data</strong>: Information related to your courses, study materials, and progress within the app.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">2. Permissions Used</h2>
                <p className="mb-4">The app requires the following permissions to function correctly:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Camera & Gallery</strong>: Used to upload study materials, notes, and profile photos.</li>
                  <li><strong className="text-white">Microphone</strong>: Used for recording audio lectures or voice notes within the platform.</li>
                  <li><strong className="text-white">Notifications</strong>: Used to send class updates, reminders, and important announcements.</li>
                  <li><strong className="text-white">Storage</strong>: Used to save and read documents/PDFs for offline study and material management.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">3. Third-Party Services</h2>
                <p className="mb-4">We use third-party services that may collect information used to identify you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Google Play Services</strong>: For core app functionality.</li>
                  <li><strong className="text-white">Google Firebase</strong>: Including Database, Storage, and Analytics to power our educational tools and understand app performance.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">4. Data Security and Encryption</h2>
                <p className="leading-relaxed">
                  The security of your data is important to us. We implement industry-standard encryption and security measures to protect your personal information from unauthorized access, alteration, or disclosure.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">5. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our app is used by students. We are committed to protecting children's privacy. We do not knowingly collect personal information from children under 13 without parental consent. If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we take steps to remove that information from our servers.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">6. Your Rights (GDPR & CCPA)</h2>
                <p className="mb-4">You have the following rights regarding your data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Right to Access</strong>: You can request a copy of your personal data.</li>
                  <li><strong className="text-white">Right to Rectification</strong>: You can ask us to correct inaccurate information.</li>
                  <li><strong className="text-white">Right to Deletion</strong>: You have the right to request the deletion of your data through the app settings or by contacting us.</li>
                  <li><strong className="text-white">Right to Opt-Out</strong>: You can opt-out of certain data collection practices.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">7. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy or want to exercise your data rights, please contact us at:<br/>
                  <a href="mailto:curosenterprisesllp@gmail.com" className="text-primary hover:underline">
                    curosenterprisesllp@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
