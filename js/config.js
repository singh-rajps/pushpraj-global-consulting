/**
 * ====================================================================
 * WEBSITE CONFIGURATION FILE - PUSHPRAJ GLOBAL CONSULTING
 * ====================================================================
 */

const SITE_CONFIG = {
  // Company & Personal Branding
  companyName: "Pushpraj Global",
  legalName: "Pushpraj Global Consulting Private Limited",
  shortName: "Pushpraj",
  founderName: "Pushpraj Kumar",
  founderTitle: "Founder & Principal Consultant",
  tagline: "Empowering Enterprises Through Digital Innovation & Technology Excellence",
  subTagline: "Global IT Consulting • Enterprise Solutions • Cloud & Cyber Resilience",
  foundedYear: 2021,

  // Contact Information
  contact: {
    phone: "+91 80 4920 8899",
    phoneDisplay: "+91 (080) 4920-8899",
    email: "pushpraj@pushprajglobal.com",
    contactEmail: "contact@pushprajglobal.com",
    careersEmail: "careers@pushprajglobal.com",
    salesEmail: "business@pushprajglobal.com",
    address: {
      line1: "Tech Park Boulevard, JP Nagar 7th Phase",
      city: "Bengaluru",
      state: "Karnataka",
      zip: "560078",
      country: "India"
    },
    workingHours: "Monday – Friday: 9:00 AM – 6:30 PM IST"
  },

  // Key Metrics / Stats Counter
  stats: [
    { value: 150, suffix: "+", label: "Projects Delivered", desc: "Across US, Europe & APAC" },
    { value: 98, suffix: "%", label: "Client Retention", desc: "Long-term tech partnerships" },
    { value: 250, suffix: "+", label: "Technology Specialists", desc: "Full-stack, Cloud, Security & AI" },
    { value: 15, suffix: "+", label: "Global Industry Domains", desc: "Fintech, Healthcare, Retail & more" }
  ],

  // Social Links
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/pushpraj",
    twitter: "https://twitter.com/pushpraj",
    github: "https://github.com/pushpraj",
    instagram: "https://www.instagram.com/pushpraj",
    youtube: "https://www.youtube.com/"
  }
};

// Export to window object for browser access
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
