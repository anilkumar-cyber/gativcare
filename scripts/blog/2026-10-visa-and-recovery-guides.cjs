// Seeds two patient-guide blog posts. Safe to re-run: posts whose slug already exists are skipped.
// Run on the server: docker compose run --rm gativcare-migrate node scripts/blog/2026-10-visa-and-recovery-guides.cjs
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS script run with node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const medicalVisa = {
  title: "How to Apply for an Indian Medical Visa: A Step-by-Step Guide for Patients",
  slug: "how-to-apply-for-indian-medical-visa-step-by-step",
  excerpt: "Planning treatment in India? Here is how the Indian medical visa works, the difference between the e-Medical and regular medical visa, the documents you need, and how your companion can travel with you.",
  seoTitle: "How to Apply for an Indian Medical Visa: Step-by-Step Guide",
  seoDescription: "Apply for an Indian medical visa step by step: e-Medical vs regular medical visa, hospital invitation letter, documents, attendant visas, and common mistakes.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Medical Visa", "Patient Guide", "Travel Planning"],
  coverImage: "/images/blog/indian-medical-visa-guide.jpg",
  published: true,
  content: `Once you have chosen a hospital in India, the next practical step is the medical visa. For most international patients the process is straightforward, but small mistakes, such as applying on the wrong visa type or uploading an unclear document, can delay your treatment.
This guide explains how the Indian medical visa works, which type is right for you, what documents you need, and how a family member can travel with you as your attendant.
Important: Visa rules, fees, eligible nationalities, and validity periods change from time to time. Always confirm the current requirements on the official Government of India visa website or with your nearest Indian embassy before you apply.
## Which Visa Do Medical Patients Need?
If the main purpose of your trip is medical treatment, you should apply for a medical visa, not a tourist or business visa. Travelling for planned treatment on a tourist visa can create problems at immigration or with the hospital.
India offers two main routes for patients:
### e-Medical Visa
The e-Medical Visa is applied for online and is available to citizens of many countries. It is designed for short-term medical treatment and is usually the fastest option. Once approved, you receive an electronic travel authorisation by email and the visa is stamped on arrival at an eligible airport.
### Regular Medical Visa
A regular medical visa is applied for through an Indian embassy, consulate, or authorised visa centre in your country. It is generally used when the e-Medical Visa is not available for your nationality, or when longer or more complex treatment is expected.
## The Attendant Visa for Family Members
Most patients travel with a family member or companion. They should apply for the matching attendant visa, such as the e-Medical Attendant Visa, rather than a tourist visa. Attendant visas are linked to the patient's medical visa, and there is usually a limit on how many attendants can accompany one patient.
Important: The attendant's application is normally connected to the patient's application, so it helps to apply for the patient and attendants at the same time.
## Step-by-Step: How to Apply for an Indian e-Medical Visa
### Step 1: Get an invitation letter from the hospital
Before you apply, ask the hospital's international patient department for a visa invitation letter. This letter is on the hospital's letterhead and usually confirms your name, passport number, the treatment planned, and the expected dates. A facilitator can help you request it, but it should come from the treating hospital.
### Step 2: Check your passport
Your passport should have enough remaining validity and blank pages. A common rule is at least six months of validity from your date of arrival, but confirm the current requirement before applying.
### Step 3: Fill in the online application
Apply only through the official Government of India visa website. Select the medical visa category, fill in your personal and passport details, and enter the hospital's name and address exactly as they appear on the invitation letter.
### Step 4: Upload your documents
You will usually need:
- A recent passport-style photograph with a plain, light background
- A clear scan of your passport's photo page
- The hospital invitation letter
- Any other documents requested for your nationality
### Step 5: Pay the visa fee
The fee depends on your nationality. Pay only on the official website, and keep the payment confirmation.
### Step 6: Receive your approval and travel
Once approved, you will receive your electronic travel authorisation by email. Print a copy and carry it with your passport and the hospital invitation letter when you travel.
## When to Apply
Do not leave your visa application to the last minute. Processing can take several working days, and additional checks occasionally take longer. Apply as soon as you have a confirmed treatment plan and invitation letter, while leaving enough flexibility in case your dates change.
## Common Mistakes That Delay a Medical Visa
- Applying on an unofficial website that charges extra fees
- Applying for a tourist visa instead of a medical visa
- Hospital name or dates on the application that do not match the invitation letter
- Blurry photographs or passport scans
- Spelling differences between the passport and the application
- Applying for attendants separately and too late
Important: Several unofficial websites look like the official visa portal and charge large service fees. Check the website address carefully before entering your details or paying.
## What to Carry When You Travel
- Your passport and printed visa approval
- The hospital invitation letter
- Copies of your medical reports, including scans
- Your current medicines in their original packaging, with prescriptions
- Contact details of the hospital and your local coordinator
## What If Your Treatment Takes Longer Than Planned?
If your doctor advises a longer stay, speak to the hospital's international patient department as early as possible. Visa extensions or changes are handled through the Indian immigration authorities, and the hospital can usually guide you on the documents needed. Do not stay beyond your visa's validity without proper approval.
## Frequently Asked Questions
### Can I travel to India for treatment on a tourist visa?
If your main purpose is medical treatment, you should apply for a medical visa. Using the correct visa type avoids problems at immigration and with the hospital.
### Who provides the medical visa invitation letter?
The treating hospital in India provides the invitation letter, usually through its international patient department. A facilitator can help you request it.
### Can my family member come with me on a medical visa?
Yes. Family members or companions usually apply for a medical attendant visa linked to your medical visa. There is normally a limit on the number of attendants per patient.
### How long does it take to get an Indian medical visa?
Processing usually takes several working days, but it can take longer. Apply as soon as your treatment plan and invitation letter are confirmed, and check current processing times on the official website.
### Can GativCare help with my medical visa?
GativCare can help you request the hospital invitation letter, check your documents, and plan your travel dates. The visa itself is issued by the Government of India, and you submit the application on the official website.
## Final Thoughts
The medical visa is one of the simplest parts of planning treatment in India, as long as you use the correct visa type, apply on the official website, and make sure your details match the hospital's invitation letter.
If you are planning treatment in India and would like help with the invitation letter and travel planning, [contact our team](/contact) for a free consultation. You may also find our guide on [talking directly to a doctor in India before traveling](/blog/can-i-talk-directly-to-a-doctor-in-india-before-traveling) useful while you plan.`,
};

const recoveryStay = {
  title: "How Long Should You Stay in India After Surgery Before Flying Home?",
  slug: "how-long-to-stay-in-india-after-surgery-before-flying-home",
  excerpt: "Discharge from hospital is not the same as being ready to fly. Learn what decides how long you should stay in India after surgery, the risks of flying too soon, and how to plan your recovery stay.",
  seoTitle: "How Long to Stay in India After Surgery Before Flying Home",
  seoDescription: "Discharge is not the same as fit to fly. What decides how long to stay in India after surgery, flying risks like blood clots, and how to plan your recovery.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Recovery", "Patient Guide", "Travel Planning"],
  coverImage: "/images/blog/recovery-stay-after-surgery.jpg",
  published: true,
  content: `One of the most common planning questions from international patients is how long they need to stay in India after surgery. It affects your flight bookings, your accommodation budget, time off work, and how long your companion needs to be away from home.
The most important thing to understand is that being discharged from hospital is not the same as being ready to fly home. Many patients need to stay nearby for days or weeks after discharge so the surgical team can check their wounds, review test results, and confirm they are fit for a long flight.
This guide explains what decides the length of your stay, why flying too soon carries real risks, and how to plan a recovery stay that is safe and comfortable.
Important: The information in this article is general guidance. The right time for you to fly depends on your procedure, your health, and your recovery, and only your treating doctor can confirm when it is safe.
## Hospital Stay vs. Total Stay in India
Your trip is usually made up of three parts:
- Before admission: consultations, tests, and preparation, which may take a few days
- The hospital stay: from the day of surgery until discharge
- The recovery stay: time in a nearby hotel or apartment after discharge, with follow-up visits to the hospital
When you compare estimates, check whether the hospital's figure covers only the hospital stay or the total time you should plan to be in India.
## What Decides How Long You Need to Stay
### The type of surgery
Minor and day-care procedures usually need a much shorter stay than major surgery such as joint replacement, spine surgery, heart surgery, or organ transplants. Transplant patients in particular are often asked to stay for an extended period for close monitoring.
### Your recovery
Every patient heals at a different pace. Age, fitness, and conditions such as diabetes or heart disease can all affect recovery time.
### Follow-up checks
Many procedures require wound checks, removal of stitches or drains, blood tests, scans, or physiotherapy sessions before you leave. Your doctor will want to see the results before clearing you to fly.
### The length of your flight
A short flight is very different from a long-haul journey with connections. Long periods of sitting and changes in cabin pressure can affect your recovery.
## Why Flying Too Soon After Surgery Is Risky
### Blood clots
Surgery and long periods of sitting both increase the risk of deep vein thrombosis (DVT), a blood clot that usually forms in the leg. In rare cases a clot can travel to the lungs, which is a medical emergency. Your doctor may recommend medication, compression stockings, or specific precautions for the flight.
### Complications far from your surgical team
Most complications, such as infection or wound problems, appear in the first days and weeks after surgery. If you are still in India, the team who operated on you can assess and treat the problem quickly.
### Air pressure and specific procedures
After some types of surgery, such as certain chest, abdominal, eye, or brain procedures, changes in cabin pressure can cause problems. Your surgeon will advise on any specific restrictions.
### Airline rules
Airlines have their own rules about flying after surgery and may ask for a fit-to-fly certificate from your doctor. Check with your airline before booking.
## How to Plan Your Recovery Stay in India
- Ask the surgeon for an expected total stay, not only the number of hospital days
- Book a flexible or changeable return ticket in case your recovery takes longer
- Choose accommodation close to the hospital, with a lift and easy access
- Plan for your companion's stay as well as your own
- Check that your visa covers the full expected stay, with some margin
- Arrange travel insurance that covers your trip, and check what it says about medical travel
For more on planning costs, read our guide to [avoiding hidden hospital costs in India](/blog/how-to-avoid-hidden-hospital-costs-in-india-for-surgery), and our step-by-step guide to the [Indian medical visa](/blog/how-to-apply-for-indian-medical-visa-step-by-step).
## Questions to Ask Your Surgeon Before You Travel
- How many days will I be in hospital, and how long should I stay in India after discharge?
- Which follow-up visits and tests will I need before I fly?
- What precautions should I take during the flight?
- Will I need a fit-to-fly certificate?
- Do I need wheelchair assistance at the airport?
- What follow-up care will I need at home, and will you share a summary with my local doctor?
## Before You Fly Home
Make sure you have:
- Your discharge summary and all reports, preferably in both printed and digital form
- Enough medicines for the journey and the first weeks at home, with prescriptions
- A fit-to-fly certificate if your airline requires one
- Clear instructions on wound care, activity limits, and warning signs to watch for
- The contact details of your surgeon or the hospital's international patient department
Important: Tell your doctor at home about your surgery before you return, and book a follow-up appointment for soon after you arrive.
## Frequently Asked Questions
### Can I fly home the day I am discharged from hospital?
Usually not after major surgery. Most surgeons ask patients to stay nearby for follow-up checks before flying. Your doctor will tell you when you are fit to fly.
### How long do I need to stay in India after knee replacement or other major surgery?
It depends on the procedure, your recovery, and your doctor's advice. Ask your surgeon for an expected total stay before you book flights, and keep your return ticket flexible.
### What is the biggest risk of flying soon after surgery?
One of the main risks is a blood clot (DVT) caused by surgery combined with long periods of sitting. Your doctor may recommend preventive medicine, compression stockings, and moving regularly during the flight.
### Do I need a fit-to-fly certificate after surgery?
Some airlines require a medical certificate after recent surgery. Check with your airline in advance and ask your doctor for the certificate before you leave India.
### Can GativCare help arrange accommodation for my recovery?
Yes. GativCare can help you find accommodation close to the hospital, plan follow-up visits, and adjust travel arrangements if your doctor advises a longer stay.
## Final Thoughts
Planning a realistic recovery stay is one of the best things you can do for a safe medical trip. Ask your surgeon for the total time you should expect to be in India, keep your plans flexible, and fly home only when your doctor confirms you are ready.
If you would like help planning your treatment and recovery stay in India, [contact our team](/contact) for a free consultation.`,
};

const posts = [medicalVisa, recoveryStay];

(async () => {
  const now = Date.now();
  for (const [i, post] of posts.entries()) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log("already exists, skipping:", post.slug);
      continue;
    }
    // Stagger by a minute so the blog index lists them in this order.
    await prisma.blogPost.create({ data: { ...post, publishedAt: new Date(now - i * 60_000) } });
    console.log("created:", post.slug);
  }
  await prisma.$disconnect();
})();
