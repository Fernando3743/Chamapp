# 🦎 ChameleonApp

> **The Ultimate Multi-Industry Business Platform**  
> *Adapts to any business. Grows with your vision.*

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 🌟 What is ChameleonApp?

ChameleonApp is a revolutionary business platform that **adapts like a chameleon** to any industry. Whether you run a barber shop, restaurant, real estate agency, or any service business - ChameleonApp transforms to meet your unique needs while providing powerful tools to grow your business.

### 🎯 Key Features

- **🔄 Multi-Industry Adaptability** - One platform, infinite possibilities
- **📱 User-Friendly Interface** - Clean, modern design that works everywhere
- **🌍 Multi-Language Support** - English & Spanish (with easy expansion)
- **⚡ Real-Time Updates** - Instant booking and availability updates
- **📊 Business Analytics** - Comprehensive insights and reporting
- **👥 Customer Management** - Complete customer database and history
- **🔒 Secure Authentication** - User registration and business owner accounts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chamapp.git
cd chamapp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic! ✨

## 🏗️ Project Structure

```
chamapp/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/           # API routes
│   │   ├── 📁 businesses/    # Business listing & details
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 contexts/      # React contexts (Language, etc.)
│   │   ├── 📁 register/      # User registration
│   │   └── 📄 layout.js      # Root layout
│   └── 📁 lib/
│       ├── 📄 supabase.js    # Database client
│       └── 📄 validation.js  # Form validation
├── 📁 database/
│   └── 📄 schema.sql         # Database schema
├── 📁 public/               # Static assets
└── 📄 tailwind.config.js   # Tailwind configuration
```

## 🎨 Tech Stack

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| **Next.js 15** | React Framework | Server-side rendering, routing, and performance |
| **React 18** | UI Library | Component-based architecture and modern hooks |
| **Tailwind CSS** | Styling | Utility-first CSS for rapid development |
| **Supabase** | Backend & Database | Real-time database with built-in authentication |
| **Lucide React** | Icons | Beautiful, consistent icon system |

## 🌐 Multi-Language Support

ChameleonApp supports multiple languages out of the box:

- 🇺🇸 **English** - Full support
- 🇪🇸 **Spanish** - Complete translation
- 🔧 **Easy to extend** - Add new languages in minutes

### Adding a New Language

```javascript
// In src/app/contexts/LanguageContext.js
const translations = {
  en: { /* English translations */ },
  es: { /* Spanish translations */ },
  fr: { /* Add French translations */ }
};
```

## 🏢 Supported Business Types

ChameleonApp adapts to various industries:

| Industry | Features | Status |
|----------|----------|--------|
| 💇 **Barber Shops** | Appointment booking, staff management | ✅ Ready |
| 🍕 **Restaurants** | Table reservations, menu management | ✅ Ready |
| 🏠 **Real Estate** | Property listings, client management | ✅ Ready |
| 💪 **Fitness & Sports** | Class scheduling, member management | ✅ Ready |
| 🏥 **Health & Wellness** | Appointment booking, patient records | ✅ Ready |
| 💼 **Professional Services** | Consultation booking, client portal | ✅ Ready |
| 💄 **Beauty & Spa** | Service booking, package management | ✅ Ready |
| 🚗 **Automotive** | Service appointments, repair tracking | ✅ Ready |
| 📚 **Education** | Class scheduling, student management | ✅ Ready |
| ⚙️ **Custom** | Fully customizable for any business | ✅ Ready |

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# The app runs on http://localhost:3000
```

## 📊 Database Schema

Our clean, user-focused database design:

```sql
-- Users table (singular naming convention)
CREATE TABLE user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💻 Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🔄 Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add translations for any new text
- Test your changes thoroughly
- Update documentation as needed

## 📋 Roadmap

### 🎯 Version 1.0 (Current)
- [x] User registration and authentication
- [x] Multi-language support (EN/ES)
- [x] Responsive design
- [x] Basic business listing
- [ ] Complete backend integration
- [ ] Payment processing

### 🚀 Version 2.0 (Coming Soon)
- [ ] Business dashboard
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] Advanced booking system

### 🌟 Version 3.0 (Future)
- [ ] AI-powered business insights
- [ ] Multi-tenant architecture
- [ ] White-label solutions
- [ ] Advanced customization tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Fercho**  
📧 fernando201022@hotmail.com

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

*Built with ❤️ and lots of ☕*

</div>