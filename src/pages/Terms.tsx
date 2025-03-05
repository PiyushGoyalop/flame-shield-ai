
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-bold text-wildfire-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg mb-6">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Wildfire Analytics ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p>
              Wildfire Analytics provides prediction and analysis tools for wildfire risk assessment using environmental data and machine learning algorithms. The Service is provided "as is" and "as available" without warranties of any kind.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>
              To use certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Usage and Privacy</h2>
            <p>
              We collect and process data as described in our Privacy Policy. By using the Service, you consent to our data practices as described in the Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Limitations of Liability</h2>
            <p>
              Wildfire Analytics provides risk assessment tools to aid in decision-making, but we cannot guarantee the accuracy of predictions. We are not liable for any decisions made based on data provided by our Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with the operation of the Service</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate any person or entity</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              All content and materials available on the Service, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of Wildfire Analytics and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the Service, us, or third parties, or for any other reason.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Your continued use of the Service after such modifications will constitute your acknowledgment of the modified Terms of Service and agreement to abide and be bound by the modified Terms of Service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at piyushgoyalujn386@gmail.com.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
