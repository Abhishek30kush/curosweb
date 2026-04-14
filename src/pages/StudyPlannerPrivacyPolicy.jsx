import React from 'react'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'

export default function StudyPlannerPrivacyPolicy() {
  return (
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Privacy Policy for Study Planner" 
        subtitle="Last Updated: April 8, 2026"
        breadcrumb={[{ name: 'Privacy Policy' }]}
      />

      <section className="section bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="card p-8 md:p-12 space-y-8 text-gray-300">
              <p className="text-lg leading-relaxed">
                This Privacy Policy describes how Study Planner ("we", "us", or "our") handles your information when you use our mobile application.
              </p>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">1. Information Collection and Use</h2>
                <p className="mb-4">Study Planner is designed to respect your privacy.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Personal Data</strong>: We do NOT collect any personally identifiable information (PII) such as your name, email address, or phone number.</li>
                  <li><strong className="text-white">Study Data</strong>: All your study sessions, flashcards, and schedules are stored <strong className="text-white">locally</strong> on your device using on-device storage (AsyncStorage). We do not have access to this data.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">2. Permissions</h2>
                <p className="mb-4">Our app may request certain permissions to enhance your experience:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Audio</strong>: Used only for playing timer alerts. We do NOT record any audio.</li>
                  <li><strong className="text-white">Haptics/Vibration</strong>: Used for timer notifications.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">3. Data Storage</h2>
                <p className="leading-relaxed">
                  Since all data is stored on your device, if you uninstall the app or clear the app's cache, your study data will be permanently deleted unless you have backed it up using system tools.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">4. Third-Party Services</h2>
                <p className="leading-relaxed">
                  We may use third-party tools (like Expo or Google Play Services) for basic app functionality and crash reporting. These services may collect device-specific information as per their own privacy policies.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">5. Children's Privacy</h2>
                <p className="leading-relaxed">
                  Our app is safe for all ages. We do not knowingly collect information from children.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">6. Changes to This Policy</h2>
                <p className="leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">7. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:<br/>
                  <a href="mailto:abhi.2010.kushwaha@gmail.com" className="text-primary hover:underline">
                    abhi.2010.kushwaha@gmail.com
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
