import { PrismaClient, Role, AppointmentStatus, AppointmentType, LeadStatus, LeadSource } from "@prisma/client";
import bcrypt from "bcryptjs";
import { hospitals, doctors, treatments, packages, testimonials } from "../src/lib/constants";
import { DEFAULT_COORDINATOR_TABS } from "../src/lib/dashboardTabs";

const faqSeed = [
  { question: "Is medical treatment in India safe for international patients?", answer: "Absolutely. India has 250+ JCI and NABH accredited hospitals with world-class infrastructure, internationally trained doctors, and success rates comparable to the best hospitals globally. Many doctors are trained at top institutions like Harvard, Johns Hopkins, and Oxford." },
  { question: "How much can I save on treatment in India?", answer: "You can save 60-90% on treatment costs compared to the USA, UK, and other Western countries. For example, a heart bypass surgery costs around $5,500 in India vs $75,000 in the USA. Our cost calculator can give you precise estimates for your treatment." },
  { question: "How do I get a medical visa for India?", answer: "We handle the entire medical visa process for you. Typically, you'll need a valid passport, medical documents from your home doctor, and a treatment plan from our partner hospital. The visa is usually processed within 3-5 business days." },
  { question: "What is included in your medical tourism packages?", answer: "Our all-inclusive packages cover hospital treatment, accommodation, airport transfers, local transportation, translator services, personal healthcare coordinator, medicines, follow-up consultations, and even tourism activities during recovery." },
  { question: "Can I consult with a doctor before traveling to India?", answer: "Yes! We offer free video consultations with our specialist doctors. You can discuss your condition, treatment options, and expected outcomes before making any travel decisions. Simply upload your medical reports and we'll arrange a consultation within 24-48 hours." },
  { question: "What happens after I return home?", answer: "We provide comprehensive post-treatment support including virtual follow-up consultations with your treating doctor, prescription management, recovery monitoring, and 24/7 emergency support. Our care continues until you're fully recovered." },
  { question: "Are there language barriers at Indian hospitals?", answer: "No. All our partner hospitals have English-speaking medical staff. Additionally, we provide professional medical translators in 20+ languages including Arabic, French, Russian, Chinese, Spanish, and many more." },
  { question: "How do I make payments?", answer: "You'll receive a transparent, all-inclusive cost estimate with no hidden charges before you travel. Payment is arranged directly with your treating hospital, which typically accepts bank transfer and major cards — our coordinator will walk you through the exact process for your chosen hospital." },
];

const prisma = new PrismaClient();
const INR_RATE = 83;

// Some doctors in constants.ts reference a hospital name that doesn't exactly
// match any entry in the hospitals array — map those to the real name here.
const hospitalAlias: Record<string, string> = {
  Medanta: "Medanta - The Medicity",
  "Fortis Escorts": "Fortis Healthcare",
  "Max Hospital": "Max Super Speciality",
};

function parseCostRange(cost: string): { min: number; max: number } {
  const nums = cost.match(/[\d,]+/g)?.map((n) => parseInt(n.replace(/,/g, ""), 10)) ?? [0];
  return { min: nums[0], max: nums[1] ?? nums[0] };
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/[^\d]/g, ""), 10);
}

async function main() {
  console.log("Seeding hospitals...");
  const hospitalIdByName = new Map<string, string>();
  for (const h of hospitals) {
    const created = await prisma.hospital.upsert({
      where: { id: `seed-hospital-${h.id}` },
      update: {},
      create: {
        id: `seed-hospital-${h.id}`,
        name: h.name,
        city: h.city,
        rating: h.rating,
        reviews: h.reviews,
        accreditations: h.accreditations,
        specialties: h.specialties,
        beds: h.beds,
        establishedYear: h.established,
      },
    });
    hospitalIdByName.set(created.name, created.id);
  }

  console.log("Seeding doctors...");
  const doctorIdByName = new Map<string, string>();
  for (const d of doctors) {
    const resolvedName = hospitalAlias[d.hospital] ?? d.hospital;
    let hospitalId = hospitalIdByName.get(resolvedName);

    if (!hospitalId) {
      // Doctor references a hospital not present in the hospitals array at all
      // (e.g. "Jaslok Hospital") — create a minimal placeholder so the FK holds.
      const fallback = await prisma.hospital.upsert({
        where: { id: `seed-hospital-fallback-${resolvedName}` },
        update: {},
        create: { id: `seed-hospital-fallback-${resolvedName}`, name: resolvedName, city: d.city },
      });
      hospitalId = fallback.id;
      hospitalIdByName.set(resolvedName, hospitalId);
    }

    const created = await prisma.doctor.upsert({
      where: { id: `seed-doctor-${d.id}` },
      update: {},
      create: {
        id: `seed-doctor-${d.id}`,
        name: d.name,
        hospitalId,
        specialization: d.specialization,
        experience: d.experience,
        fee: d.fee,
        rating: d.rating,
        reviews: d.reviews,
        languages: d.languages,
        education: d.education,
        successRate: d.successRate,
      },
    });
    doctorIdByName.set(created.name, created.id);
  }

  console.log("Seeding treatments...");
  for (const t of treatments) {
    const { min, max } = parseCostRange(t.cost);
    await prisma.treatment.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        name: t.name,
        slug: t.slug,
        icon: t.icon,
        description: t.description,
        costMinINR: min * INR_RATE,
        costMaxINR: max * INR_RATE,
        color: t.color,
      },
    });
  }

  console.log("Seeding packages...");
  for (const p of packages) {
    await prisma.package.upsert({
      where: { id: `seed-package-${p.id}` },
      update: {},
      create: {
        id: `seed-package-${p.id}`,
        name: p.name,
        duration: p.duration,
        priceINR: parsePrice(p.price) * INR_RATE,
        includes: p.includes,
        color: p.color,
        icon: p.icon,
      },
    });
  }

  console.log("Seeding demo login accounts (password: Passw0rd!)...");
  const passwordHash = await bcrypt.hash("Passw0rd!", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@gativcare.com" },
    update: {},
    create: { email: "admin@gativcare.com", passwordHash, role: Role.ADMIN, name: "Super Admin" },
  });

  const medantaId = hospitalIdByName.get("Medanta - The Medicity");
  const drTrehanId = doctorIdByName.get("Dr. Naresh Trehan");

  const hospitalUser = await prisma.user.upsert({
    where: { email: "hospital@gativcare.com" },
    update: {},
    create: {
      email: "hospital@gativcare.com",
      passwordHash,
      role: Role.HOSPITAL,
      name: "Medanta - The Medicity",
      hospitalOwned: medantaId ? { connect: { id: medantaId } } : undefined,
    },
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: "doctor@gativcare.com" },
    update: {},
    create: {
      email: "doctor@gativcare.com",
      passwordHash,
      role: Role.DOCTOR,
      name: "Dr. Naresh Trehan",
      doctor: drTrehanId ? { connect: { id: drTrehanId } } : undefined,
    },
  });

  const patientUser = await prisma.user.upsert({
    where: { email: "patient@gativcare.com" },
    update: {},
    create: {
      email: "patient@gativcare.com",
      passwordHash,
      role: Role.PATIENT,
      name: "James Wilson",
      patient: { create: { gcNumber: "GC-2024-001", country: "USA" } },
    },
    include: { patient: true },
  });

  if (medantaId && drTrehanId && patientUser.patient) {
    console.log("Seeding sample appointments...");
    const inDays = (n: number) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);
    const appointments = [
      { id: "seed-appointment-1", scheduledAt: inDays(2), type: AppointmentType.IN_PERSON, status: AppointmentStatus.CONFIRMED, notes: "Follow-up consultation" },
      { id: "seed-appointment-2", scheduledAt: inDays(-10), type: AppointmentType.IN_PERSON, status: AppointmentStatus.COMPLETED, notes: "Initial consultation" },
      { id: "seed-appointment-3", scheduledAt: inDays(-3), type: AppointmentType.VIDEO, status: AppointmentStatus.COMPLETED, notes: "Pre-surgery review" },
    ];
    for (const apt of appointments) {
      await prisma.appointment.upsert({
        where: { id: apt.id },
        update: {},
        create: {
          id: apt.id,
          patientId: patientUser.patient.id,
          doctorId: drTrehanId,
          hospitalId: medantaId,
          scheduledAt: apt.scheduledAt,
          type: apt.type,
          status: apt.status,
          notes: apt.notes,
        },
      });
    }
  }

  console.log("Seeding sample leads...");
  const sampleLeads = [
    { id: "seed-lead-1", name: "Ahmad Hassan", email: "ahmad.hassan@example.com", phone: "+971500000001", country: "UAE", treatment: "Heart Surgery", status: LeadStatus.NEW },
    { id: "seed-lead-2", name: "Jennifer Smith", email: "jennifer.smith@example.com", phone: "+15550000002", country: "USA", treatment: "Knee Replacement", status: LeadStatus.CONTACTED },
    { id: "seed-lead-3", name: "Liu Mei", email: "liu.mei@example.com", phone: "+8613000000003", country: "China", treatment: "IVF", status: LeadStatus.QUALIFIED },
    { id: "seed-lead-4", name: "Patrick Brown", email: "patrick.brown@example.com", phone: "+441770000004", country: "UK", treatment: "Dental Care", status: LeadStatus.NEW },
    { id: "seed-lead-5", name: "Fatima Al-Sayed", email: "fatima.alsayed@example.com", phone: "+966500000005", country: "Saudi Arabia", treatment: "Oncology", status: LeadStatus.IN_PROGRESS },
  ];
  for (const lead of sampleLeads) {
    await prisma.lead.upsert({
      where: { id: lead.id },
      update: {},
      create: { ...lead, source: LeadSource.CONTACT_FORM },
    });
  }

  console.log("Seeding FAQs...");
  for (const [i, f] of faqSeed.entries()) {
    await prisma.fAQ.upsert({
      where: { id: `seed-faq-${i + 1}` },
      update: {},
      create: { id: `seed-faq-${i + 1}`, question: f.question, answer: f.answer, order: i },
    });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `seed-testimonial-${t.id}` },
      update: {},
      create: {
        id: `seed-testimonial-${t.id}`,
        name: t.name,
        country: t.country,
        treatment: t.treatment,
        hospital: t.hospital,
        doctorName: t.doctor,
        rating: t.rating,
        text: t.text,
        savings: t.savings,
      },
    });
  }

  console.log("Seeding default coordinator role permissions...");
  await prisma.rolePermission.upsert({
    where: { role: Role.COORDINATOR },
    update: {},
    create: { role: Role.COORDINATOR, tabs: DEFAULT_COORDINATOR_TABS },
  });

  console.log("Seed complete:", {
    admin: adminUser.email,
    hospital: hospitalUser.email,
    doctor: doctorUser.email,
    patient: patientUser.email,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
