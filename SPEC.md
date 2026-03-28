# CUROS Enterprises LLP - Corporate Website Specification

## Project Overview
- **Project Name**: CUROS Enterprises LLP Corporate Website
- **Type**: Multi-page corporate website with React.js
- **Core Functionality**: Showcase digital innovation company services, portfolio, and contact information
- **Target Users**: Potential clients, partners, investors, and talent looking for digital services

## Tech Stack
- React.js with Vite
- Tailwind CSS
- React Router DOM
- Framer Motion (animations)
- Lucide React (icons)
- Responsive design (mobile-first)

## Brand Identity
- **Company Name**: CUROS Enterprises LLP
- **Tagline**: Building Digital Businesses with Technology, Education & Innovation
- **Primary Colors**: 
  - Background: Black (#000000)
  - Primary: Electric Blue (#0066FF)
  - Secondary: Deep Blue (#001A33)
  - Accent: Cyan (#00D4FF)
- **Theme**: Dark premium tech-style

## Typography
- **Headings**: Inter (bold, modern)
- **Body**: Inter (clean, readable)
- **Accent**: Space Grotesk (for special elements)

## Pages Structure

### 1. Home Page (/)
**Sections:**
1. **Navbar** - Fixed, glassmorphism effect, logo + navigation links + CTA
2. **Hero Section** - Gradient background, headline, subtext, CTA button, animated elements
3. **Services Overview** - 5 service cards with icons (Web Dev, App Dev, Video Editing, Digital Marketing, EdTech)
4. **Why Choose CUROS** - Features grid with icons
5. **EdTech Coming Soon** - CUROS Pathshala preview with countdown/alert
6. **Footer** - Logo, quick links, social links, copyright

### 2. Services Page (/services)
**Sections:**
- Service detail cards for each:
  - Website Development (features, tech stack, process)
  - Mobile App Development (features, tech stack, process)
  - Video Editing & Content Production (features, services)
  - Digital Marketing & Advertisement (features, channels)
  - EdTech Platform - CUROS Pathshala (features, coming soon)

### 3. About Page (/about)
**Sections:**
- Company introduction
- Vision & Mission statements
- Founder section:
  - Name: Abhishek Kushwaha
  - Title: CEO, CUROS Enterprises LLP
- Company focus: Fintech, Education, AI
- Stats/achievements

### 4. Portfolio Page (/portfolio)
**Sections:**
- Featured projects:
  - curosinvesting.com (FinTech platform)
  - CUROS Pathshala (EdTech - Coming Soon)
  - Client projects (placeholder cards)
- Project cards with hover effects

### 5. Contact Page (/contact)
**Sections:**
- Contact form (Name, Email, Message)
- WhatsApp button (direct link)
- Email section (curosenterprisesllp@gmail.com)
- CTA Banner
- Company location info

## Components Required

### Reusable Components:
1. **Navbar** - Responsive with hamburger menu
2. **Footer** - Links, social icons
3. **ServiceCard** - Icon, title, description, hover effect
4. **ProjectCard** - Image, title, description, link
5. **Button** - Primary, secondary variants
6. **SectionTitle** - Reusable section heading
7. **ContactForm** - Form with validation
8. **AnimatedSection** - Framer Motion wrapper
9. **PageHeader** - Page title with breadcrumb

## Animations
- Fade in on scroll
- Hover effects on cards (scale, shadow)
- Smooth page transitions
- Hero section floating elements
- Staggered list animations

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Folder Structure
```
curosweb/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Button.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── ContactForm.jsx
│   │   ├── AnimatedSection.jsx
│   │   └── PageHeader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Portfolio.jsx
│   │   └── Contact.jsx
│   ├── assets/
│   │   └── (images if needed)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Content Details

### Hero Section Content
- **Headline**: "Building Digital Businesses with Technology, Education & Innovation."
- **Subtext**: "CUROS transforms ideas into powerful digital solutions. From web development to EdTech, we innovate across sectors to drive business growth."
- **CTA**: "Get Free Consultation"

### Services (5 items)
1. **Web Development** - Custom websites & web applications
2. **App Development** - Native & cross-platform mobile apps
3. **Video Editing** - Professional content production
4. **Digital Marketing** - SEO, social media, ads
5. **EdTech Platform** - CUROS Pathshala (Coming Soon)

### Why Choose CUROS
- Expert Team
- Innovative Solutions
- Timely Delivery
- 24/7 Support
- Competitive Pricing
- Proven Results

### Founder Info
- **Name**: Abhishek Kushwaha
- **Title**: CEO, CUROS Enterprises LLP
- **Focus**: Fintech, Education, AI

### Portfolio Projects
1. **CUROS Resume** - AI-powered resume builder
2. **curosinvesting.com** - Investment platform
3. **CUROS Pathshala** - EdTech platform (Coming Soon)
4. **Client Projects** - Various client work placeholders

### Contact Details
- **Email**: curosenterprisesllp@gmail.com
- **WhatsApp**: Direct chat link
- **Form Fields**: Name, Email, Message

## Acceptance Criteria
- [ ] All 5 pages render correctly
- [ ] Navigation works between all pages
- [ ] Mobile responsive (hamburger menu works)
- [ ] All animations smooth and performant
- [ ] Forms have proper validation
- [ ] All icons display correctly
- [ ] Dark theme consistent throughout
- [ ] No console errors
- [ ] Production build works
- [ ] SEO meta tags present
