export const treatments = [
  { id: 1, name: "Cardiology", slug: "cardiology", icon: "Heart", description: "Advanced cardiac care including bypass surgery, angioplasty, and valve replacements", cost: "$3,000 - $7,000", image: "❤️", color: "from-red-500 to-rose-600" },
  { id: 2, name: "Orthopedics", slug: "orthopedics", icon: "Bone", description: "Joint replacements, spine surgery, and sports medicine with robotic assistance", cost: "$4,000 - $8,000", image: "🦴", color: "from-blue-500 to-cyan-600" },
  { id: 3, name: "Oncology", slug: "oncology", icon: "Ribbon", description: "Comprehensive cancer treatment including immunotherapy and targeted therapy", cost: "$5,000 - $15,000", image: "🎗️", color: "from-purple-500 to-violet-600" },
  { id: 4, name: "Neurology", slug: "neurology", icon: "Brain", description: "Brain and nervous system treatments with cutting-edge neurosurgical techniques", cost: "$6,000 - $12,000", image: "🧠", color: "from-pink-500 to-fuchsia-600" },
  { id: 5, name: "IVF & Fertility", slug: "ivf-fertility", icon: "Baby", description: "World-class fertility treatments with high success rates and personalized care", cost: "$2,500 - $5,000", image: "👶", color: "from-amber-500 to-orange-600" },
  { id: 6, name: "Dental Care", slug: "dental", icon: "Smile", description: "Cosmetic dentistry, implants, and full mouth rehabilitation", cost: "$500 - $3,000", image: "🦷", color: "from-emerald-500 to-green-600" },
  { id: 7, name: "Cosmetic Surgery", slug: "cosmetic", icon: "Sparkles", description: "Aesthetic procedures including rhinoplasty, facelifts, and body contouring", cost: "$2,000 - $6,000", image: "✨", color: "from-violet-500 to-purple-600" },
  { id: 8, name: "Spine Surgery", slug: "spine", icon: "Activity", description: "Minimally invasive spine procedures and disc replacements", cost: "$5,000 - $10,000", image: "🏥", color: "from-teal-500 to-cyan-600" },
  { id: 9, name: "Liver Transplant", slug: "liver-transplant", icon: "HeartPulse", description: "Living donor and cadaveric liver transplantation with expert surgical teams", cost: "$15,000 - $30,000", image: "🫁", color: "from-orange-500 to-red-600" },
  { id: 10, name: "Kidney Transplant", slug: "kidney-transplant", icon: "Stethoscope", description: "End-to-end kidney transplant programs with comprehensive post-operative care", cost: "$8,000 - $15,000", image: "🏥", color: "from-sky-500 to-blue-600" },
  { id: 11, name: "Eye Care", slug: "eye-care", icon: "Eye", description: "LASIK, cataract surgery, retinal procedures, and corneal transplants", cost: "$1,000 - $4,000", image: "👁️", color: "from-indigo-500 to-blue-600" },
  { id: 12, name: "Robotic Surgery", slug: "robotic-surgery", icon: "Bot", description: "State-of-the-art robotic-assisted surgeries with precision and minimal invasion", cost: "$5,000 - $12,000", image: "🤖", color: "from-cyan-500 to-teal-600" },
];

export const hospitals = [
  { id: 1, name: "Apollo Hospitals", city: "Delhi", rating: 4.9, reviews: 2840, accreditations: ["JCI", "NABH"], specialties: ["Cardiology", "Orthopedics", "Oncology", "Neurology"], beds: 710, doctors: 450, successRate: "98.5%", image: "🏥", established: 1983 },
  { id: 2, name: "Fortis Healthcare", city: "Mumbai", rating: 4.8, reviews: 2150, accreditations: ["JCI", "NABH", "ISO"], specialties: ["Cardiology", "Liver Transplant", "Oncology"], beds: 550, doctors: 380, successRate: "97.8%", image: "🏥", established: 2001 },
  { id: 3, name: "Medanta - The Medicity", city: "Gurugram", rating: 4.9, reviews: 1980, accreditations: ["JCI", "NABH"], specialties: ["Cardiac Surgery", "Robotic Surgery", "Neurology"], beds: 1250, doctors: 800, successRate: "98.9%", image: "🏥", established: 2009 },
  { id: 4, name: "Max Super Speciality", city: "Delhi", rating: 4.7, reviews: 1650, accreditations: ["NABH", "ISO"], specialties: ["Oncology", "Orthopedics", "IVF"], beds: 480, doctors: 320, successRate: "97.2%", image: "🏥", established: 2000 },
  { id: 5, name: "Narayana Health", city: "Bangalore", rating: 4.8, reviews: 2200, accreditations: ["JCI", "NABH"], specialties: ["Cardiology", "Organ Transplant", "Pediatrics"], beds: 600, doctors: 400, successRate: "98.1%", image: "🏥", established: 2000 },
  { id: 6, name: "Kokilaben Hospital", city: "Mumbai", rating: 4.8, reviews: 1420, accreditations: ["JCI", "NABH"], specialties: ["Oncology", "Neurosurgery", "Robotic Surgery"], beds: 750, doctors: 350, successRate: "97.5%", image: "🏥", established: 2009 },
];

export const doctors = [
  { id: 1, name: "Dr. Devi Prasad Shetty", hospital: "Narayana Health", city: "Bangalore", specialization: "Cardiac Surgery", experience: 35, fee: "$100", rating: 4.9, reviews: 890, languages: ["English", "Hindi", "Kannada"], education: "MBBS, MS, FRCS (UK)", successRate: "99.2%" },
  { id: 2, name: "Dr. Naresh Trehan", hospital: "Medanta", city: "Gurugram", specialization: "Cardiovascular Surgery", experience: 40, fee: "$150", rating: 4.9, reviews: 750, languages: ["English", "Hindi"], education: "MBBS, MD, FRCS", successRate: "99.1%" },
  { id: 3, name: "Dr. Randeep Guleria", hospital: "Apollo Hospitals", city: "Delhi", specialization: "Pulmonology", experience: 30, fee: "$120", rating: 4.8, reviews: 620, languages: ["English", "Hindi"], education: "MBBS, MD, DM", successRate: "98.5%" },
  { id: 4, name: "Dr. Ashok Seth", hospital: "Fortis Escorts", city: "Delhi", specialization: "Interventional Cardiology", experience: 38, fee: "$130", rating: 4.9, reviews: 580, languages: ["English", "Hindi", "Punjabi"], education: "MBBS, MD, DM, FACC", successRate: "98.8%" },
  { id: 5, name: "Dr. Subhash Gupta", hospital: "Max Hospital", city: "Delhi", specialization: "Liver Transplant", experience: 28, fee: "$140", rating: 4.8, reviews: 420, languages: ["English", "Hindi"], education: "MBBS, MS, FRCS", successRate: "97.5%" },
  { id: 6, name: "Dr. Firuza Parikh", hospital: "Jaslok Hospital", city: "Mumbai", specialization: "IVF & Fertility", experience: 32, fee: "$110", rating: 4.8, reviews: 680, languages: ["English", "Hindi", "Gujarati"], education: "MBBS, MD, FRCOG", successRate: "65%" },
];

export const testimonials = [
  { id: 1, name: "James Wilson", country: "USA", treatment: "Cardiac Bypass Surgery", hospital: "Medanta", doctor: "Dr. Naresh Trehan", rating: 5, text: "The quality of care I received at Medanta was exceptional. Dr. Trehan and his team performed my cardiac bypass with incredible precision. The cost was 80% less than what I was quoted in the US, and the recovery facilities were world-class.", savings: "85%" },
  { id: 2, name: "Sarah Ahmed", country: "UK", treatment: "Knee Replacement", hospital: "Apollo Hospitals", doctor: "Dr. Rajesh Malhotra", rating: 5, text: "I had been waiting 18 months for knee replacement in the NHS. Within 2 weeks of contacting GativCare, I was in Delhi receiving treatment. The hospital was phenomenal—better than many private hospitals in London.", savings: "70%" },
  { id: 3, name: "Mohammed Al-Rashid", country: "UAE", treatment: "IVF Treatment", hospital: "Fortis Healthcare", doctor: "Dr. Firuza Parikh", rating: 5, text: "After 3 failed IVF cycles in Dubai, we came to India on GativCare's recommendation. Dr. Parikh's approach was different, more personalized. We now have twins! The entire experience was handled with care and sensitivity.", savings: "60%" },
  { id: 4, name: "Emily Chen", country: "Australia", treatment: "Spine Surgery", hospital: "Narayana Health", doctor: "Dr. Devi Shetty", rating: 5, text: "Minimally invasive spine surgery with robotic assistance—something that would have cost me over $80,000 in Australia. The total cost including flights and hotel was under $12,000. Incredible value with world-class outcomes.", savings: "85%" },
];

export const packages = [
  { id: 1, name: "Heart Surgery Package", duration: "10-14 days", price: "$5,500", includes: ["Hospital Stay", "Surgery", "Airport Transfer", "Hotel (7 nights)", "Translator", "Personal Coordinator", "Medicines", "Follow-up"], color: "from-red-500 to-rose-600", icon: "Heart" },
  { id: 2, name: "IVF Package", duration: "21-28 days", price: "$3,800", includes: ["All IVF Procedures", "Hospital Visits", "Airport Transfer", "Hotel (21 nights)", "Translator", "Personal Coordinator", "Medicines", "2 Follow-ups"], color: "from-pink-500 to-purple-600", icon: "Baby" },
  { id: 3, name: "Dental Makeover", duration: "7-10 days", price: "$2,200", includes: ["All Dental Procedures", "Hospital Visits", "Airport Transfer", "Hotel (7 nights)", "Translator", "Personal Coordinator", "Tourism Day", "Follow-up"], color: "from-emerald-500 to-teal-600", icon: "Smile" },
  { id: 4, name: "Orthopedic Package", duration: "14-21 days", price: "$6,500", includes: ["Surgery", "Hospital Stay", "Airport Transfer", "Hotel (14 nights)", "Physiotherapy", "Personal Coordinator", "Medicines", "Follow-up"], color: "from-blue-500 to-cyan-600", icon: "Bone" },
  { id: 5, name: "Executive Health Check", duration: "3-5 days", price: "$800", includes: ["Full Body Checkup", "Advanced Diagnostics", "Airport Transfer", "Hotel (3 nights)", "Translator", "Reports in 24hrs", "Tourism Day", "Doctor Consultation"], color: "from-amber-500 to-orange-600", icon: "Shield" },
  { id: 6, name: "Cancer Care Package", duration: "30-60 days", price: "$8,500", includes: ["Treatment Plan", "Chemotherapy/Surgery", "Airport Transfer", "Accommodation", "Translator", "24/7 Coordinator", "All Medicines", "Monthly Follow-ups"], color: "from-purple-500 to-violet-600", icon: "Ribbon" },
];

export const destinations = [
  { id: 1, name: "Delhi NCR", hospitals: 45, specialties: "Cardiac, Orthopedic, Oncology", attraction: "Taj Mahal (nearby), Red Fort, India Gate", image: "🏛️" },
  { id: 2, name: "Mumbai", hospitals: 38, specialties: "Oncology, IVF, Neurology", attraction: "Gateway of India, Marine Drive, Elephanta Caves", image: "🌊" },
  { id: 3, name: "Bangalore", hospitals: 30, specialties: "Cardiac, Transplant, Robotics", attraction: "Lalbagh Gardens, Nandi Hills, Palace", image: "🌳" },
  { id: 4, name: "Chennai", hospitals: 35, specialties: "Orthopedics, Cardiac, Oncology", attraction: "Marina Beach, Temples, Mahabalipuram", image: "🏖️" },
  { id: 5, name: "Hyderabad", hospitals: 28, specialties: "Fertility, Eye Care, Dental", attraction: "Charminar, Golconda Fort, Hussain Sagar", image: "🕌" },
  { id: 6, name: "Kerala", hospitals: 20, specialties: "Ayurveda, Wellness, Recovery", attraction: "Backwaters, Tea Gardens, Beaches", image: "🌴" },
];

export const journeySteps = [
  { step: 1, title: "Inquiry", description: "Submit your medical query or call our helpline", icon: "MessageCircle" },
  { step: 2, title: "Medical Report Upload", description: "Share your medical records securely", icon: "Upload" },
  { step: 3, title: "Doctor Review", description: "Expert doctors review your case within 24 hours", icon: "UserCheck" },
  { step: 4, title: "Treatment Plan", description: "Receive a personalized treatment roadmap", icon: "ClipboardList" },
  { step: 5, title: "Quotation", description: "Get transparent, all-inclusive cost estimate", icon: "Receipt" },
  { step: 6, title: "Visa Assistance", description: "We help you obtain medical visa quickly", icon: "FileCheck" },
  { step: 7, title: "Travel Planning", description: "Flight booking & travel arrangements", icon: "Plane" },
  { step: 8, title: "Airport Pickup", description: "Personal welcome & luxury airport transfer", icon: "Car" },
  { step: 9, title: "Hospital Admission", description: "Seamless admission with dedicated coordinator", icon: "Building2" },
  { step: 10, title: "Treatment", description: "World-class treatment by expert medical team", icon: "Stethoscope" },
  { step: 11, title: "Recovery", description: "Comfortable recovery in premium facilities", icon: "HeartPulse" },
  { step: 12, title: "Tourism", description: "Explore India's incredible tourist destinations", icon: "MapPin" },
  { step: 13, title: "Follow-Up", description: "Continued virtual care after treatment", icon: "Video" },
  { step: 14, title: "Return Home", description: "Safe journey back with complete medical records", icon: "Home" },
];

export const whyIndiaReasons = [
  { title: "60-90% Lower Costs", description: "Save up to 90% compared to USA, UK, and other Western countries without compromising quality", icon: "DollarSign" },
  { title: "World-Class Doctors", description: "Many trained at Harvard, Johns Hopkins, and other global institutions with decades of experience", icon: "GraduationCap" },
  { title: "JCI Accredited Hospitals", description: "India has the 2nd highest number of JCI-accredited hospitals in Asia, ensuring global standards", icon: "Award" },
  { title: "Latest Technology", description: "Robotic surgery, AI-assisted diagnostics, proton therapy, and cutting-edge medical equipment", icon: "Cpu" },
  { title: "Minimal Wait Times", description: "Get treated within days, not months. No long waiting lists for surgeries or consultations", icon: "Clock" },
  { title: "English Speaking Staff", description: "Seamless communication with medical staff fluent in English and many other languages", icon: "Languages" },
  { title: "Medical Visa Support", description: "Expedited medical visa processing with government-supported medical tourism programs", icon: "Globe" },
  { title: "Recovery & Tourism", description: "Combine treatment with luxury recovery at wellness retreats and explore India's heritage", icon: "Palmtree" },
];

export const conciergeServices = [
  { title: "Visa Assistance", description: "Complete medical visa processing and documentation support", icon: "FileCheck" },
  { title: "Airport Pickup", description: "Luxury airport transfers with personal welcome", icon: "Car" },
  { title: "Hotel Booking", description: "Premium accommodation near your hospital at negotiated rates", icon: "Hotel" },
  { title: "Translator", description: "Professional medical translators in 20+ languages", icon: "Languages" },
  { title: "Currency Exchange", description: "Best rates through our partnered exchange services", icon: "Coins" },
  { title: "SIM Card & Internet", description: "Stay connected with pre-activated local SIM cards", icon: "Smartphone" },
  { title: "Local Transport", description: "Dedicated vehicle and driver throughout your stay", icon: "Car" },
  { title: "Insurance Support", description: "Help with international insurance claims and documentation", icon: "Shield" },
  { title: "24/7 Coordinator", description: "Your personal healthcare coordinator available round the clock", icon: "Headphones" },
  { title: "Emergency Support", description: "Immediate emergency assistance at any time", icon: "Siren" },
];

export const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
