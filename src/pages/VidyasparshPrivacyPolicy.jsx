import React from 'react'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'

export default function VidyasparshPrivacyPolicy() {
  const lastUpdated = "April 28, 2026"
  
  return (
    <div className="bg-dark min-h-screen">
      <PageHeader 
        title="Privacy Policy for Vidyasparsh" 
        subtitle={`Last Updated: ${lastUpdated}`}
        breadcrumb={[{ name: 'Vidyasparsh Privacy Policy' }]}
      />

      <section className="section bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="card p-8 md:p-12 space-y-8 text-gray-300">
              <p className="text-lg leading-relaxed">
                This Privacy Policy describes how Vidyasparsh ("we", "us", or "our") handles your information when you use our mobile application. 
                Vidyasparsh is an Education Management System (EMS) designed for Schools, Coaching Institutes, Students, Teachers, and Administrators.
              </p>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">1. Information Collection and Use</h2>
                <p className="mb-4">To provide and improve our service, we collect several types of information from Students, Teachers, Parents, and Administrators:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Personal Information</strong>: Name, Email Address, Phone Number, Profile Picture, and Student ID.</li>
                  <li><strong className="text-white">Academic Data</strong>: Attendance records, Assignments, Grades, and Class schedules.</li>
                  <li><strong className="text-white">Financial Data</strong>: Fee payment status and transaction history (where applicable).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">2. Permissions and Media Access</h2>
                <p className="mb-4">The app requires the following permissions to provide its core features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Camera & Gallery</strong>: To allow users to upload profile pictures and submit assignments or educational documents.</li>
                  <li><strong className="text-white">Notifications</strong>: To send important academic updates, attendance alerts, and announcements via Cloud Messaging.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">3. Log Data and Cookies</h2>
                <p className="leading-relaxed mb-4">
                  We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                </p>
                <p className="leading-relaxed">
                  Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">4. Third-Party Service Providers</h2>
                <p className="mb-4">We employ third-party companies and individuals to facilitate our Service and perform Service-related tasks. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-white">Google Play Services</strong></li>
                  <li><strong className="text-white">Firebase</strong> (Authentication, Firestore Database, and Cloud Messaging for notifications)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">5. Security</h2>
                <p className="leading-relaxed">
                  We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">6. Links to Other Sites</h2>
                <p className="leading-relaxed">
                  This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">7. Children’s Privacy</h2>
                <p className="leading-relaxed">
                  These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">8. Changes to This Privacy Policy</h2>
                <p className="leading-relaxed">
                  We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-white mb-4">9. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:<br/>
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
