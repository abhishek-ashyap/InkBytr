import Header from './Header';
import { Github, Linkedin, Twitter } from 'lucide-react'; // Import icons for social links

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      
      {/* ✅ UPDATED FOOTER SECTION */}
      <footer className="bg-gray-50 text-center py-5 border-t">
        <div className="container mx-auto">
          <p className="text-gray-700 mb-2">
            Designed & Built by Abhishek Kashyap
          </p>
          <div className="flex justify-center items-center gap-4 mb-3">
            <a 
              href="https://github.com/abhishek-ashyap" // 👈 CHANGE THIS to your GitHub URL
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/abhishek--kashyap/" // 👈 CHANGE THIS to your LinkedIn URL
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://twitter.com/your-username" // 👈 CHANGE THIS to your Twitter/X URL
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
          <p className="text-sm text-gray-500">&copy; 2024 Inkbytr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
