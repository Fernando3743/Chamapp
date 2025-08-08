'use client'

export default function Footer() {
  return (
    <footer className="py-20 bg-black/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold gradient-text mb-5">BusinessHub</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              Empowering businesses with all-in-one software solutions. From startups to enterprises, we provide the tools you need to succeed in the digital age.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                <span className="text-sm font-bold">t</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                <span className="text-sm font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                <span className="text-sm font-bold">ig</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-5">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Features</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Pricing</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Templates</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Integrations</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Careers</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Blog</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Press</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-5">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Help Center</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Community</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Status</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 text-center text-white/80">
          <p>&copy; 2025 BusinessHub. All rights reserved. Made with ❤️ for businesses worldwide.</p>
        </div>
      </div>
    </footer>
  )
}