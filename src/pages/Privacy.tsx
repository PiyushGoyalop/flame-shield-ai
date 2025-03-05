
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-bold text-wildfire-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how Wildfire Analytics ("we", "our", or "us") collects, uses, and discloses your personal information when you use our service (the "Service").
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service, including:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Personal information such as name and email address when you create an account</li>
              <li>Location data when you request wildfire risk predictions</li>
              <li>Usage information about how you interact with our Service</li>
              <li>Technical information about your device and internet connection</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process and fulfill your requests for predictions</li>
              <li>Communicate with you about your account and our Service</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Protect the security and integrity of our Service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Third parties when required by law or to protect our rights</li>
              <li>Affiliated organizations in connection with a business transaction</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, such as the right to:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Restrict or object to processing of your personal information</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at piyushgoyalujn386@gmail.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
