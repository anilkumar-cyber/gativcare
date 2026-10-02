// Seeds four patient-guide blog posts. Safe to re-run: posts whose slug already exists are skipped.
// Run on the server: docker compose run --rm gativcare-migrate node scripts/blog/2026-10-patient-guides.cjs
/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS script run with node */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verifyCompany = {
  title: "How to Check if a Medical Travel Company Is Real or Fake",
  slug: "how-to-check-if-a-medical-travel-company-is-real-or-fake",
  excerpt: "Before you share medical reports or pay a deposit, run these checks. A practical guide to verifying a medical tourism company in India and spotting the warning signs of a scam.",
  seoTitle: "How to Check if a Medical Travel Company Is Real or Fake",
  seoDescription: "Verify a medical tourism company in India before you pay: company registration, hospital and doctor checks, safe payments, and red flags of fake agents.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Patient Guide", "Patient Safety", "Medical Travel Scams"],
  coverImage: "/images/blog/verify-medical-travel-company.jpg",
  published: true,
  content: `Searching for treatment abroad usually starts with a website, a WhatsApp number, or an ad promising world-class surgery at a fraction of the price at home. Some of those companies are genuine, experienced medical travel facilitators. Others are one-person operations with no accountability, and a few are outright scams designed to collect deposits and disappear.
The difficulty is that a fake medical travel company can look just as polished online as a real one. A professional website, stock photos of hospitals, and confident promises cost very little to produce.
This guide gives you a step-by-step way to check whether a medical tourism company in India is real before you send your medical reports, your passport details, or any money.
## Why Verifying a Medical Travel Company Matters
When you work with a medical travel facilitator, you are trusting them with three things: your health information, your money, and decisions about which hospital and doctor will treat you. A careless or dishonest company can cost you far more than a lost deposit.
The common problems patients run into include:
- Paying an advance for a "package" that the hospital has never heard of
- Being steered to whichever hospital pays the agent the highest commission, rather than the one best suited to the condition
- Quotes that leave out major costs, which then appear on the final bill
- Fake doctor profiles or exaggerated success rates
- Personal and medical data being shared without consent
None of these risks mean you should avoid medical travel. They mean you should verify first.
## Step 1: Confirm the Company Legally Exists
A genuine medical tourism company in India is a registered business. Ask for the company's legal name, its registration details, and its office address, then check them yourself.
- Search the company name on the Ministry of Corporate Affairs (MCA) website to confirm it is a registered company and see its incorporation date
- Ask for the GST number and verify it on the official GST portal, where the registered name and address should match what the company told you
- Check that the office address is a real business location, not a residential flat or a virtual address only
- Look at how long the website domain and social media accounts have existed
Important: A company that refuses to share its legal name or registration details, or gets defensive when you ask, should not receive your money or your medical records.
## Step 2: Verify the Hospital Relationship Independently
Many fake operators name famous hospitals they have no relationship with. Do not rely on logos on a website.
- Contact the hospital's international patient department directly, using contact details from the hospital's own official website
- Ask the hospital whether they are coordinating your case and whether the quoted estimate matches theirs
- Ask for the cost estimate on the hospital's letterhead, not only on the facilitator's own document
- Check whether the hospital holds the accreditation the company claims, such as NABH or JCI, on the accrediting body's website
A genuine facilitator will not mind you contacting the hospital. In fact, a good one will encourage it.
## Step 3: Check the Doctor's Credentials
If a company recommends a specific surgeon, verify that the doctor is real and qualified for your procedure.
- Find the doctor's profile on the hospital's official website, not just on the facilitator's site
- Confirm the doctor's medical registration with the National Medical Commission (NMC) or the relevant State Medical Council
- Ask how many times the doctor performs your specific procedure each year
- Request a video consultation with the doctor before you travel
You can read more about how direct consultations work in our guide on [whether you can talk directly to a doctor in India before traveling](/blog/can-i-talk-directly-to-a-doctor-in-india-before-traveling).
## Step 4: Look Closely at How They Want to Be Paid
Payment requests are where most medical travel scams reveal themselves.
- Treatment costs should normally be paid to the hospital, not into a facilitator's personal bank account
- Be very cautious of pressure to pay a large advance before you have a written estimate from the hospital
- Ask for a written breakdown of any service fee the company charges, and what it covers
- Get receipts and invoices for every payment, in the company's registered name
Important: Requests to send money through untraceable methods, gift cards, cryptocurrency, or to an individual's account are strong signs of fraud.
## Step 5: Read Reviews the Right Way
Reviews help, but they can be faked. Look for patterns rather than star ratings.
- Prefer reviews on independent platforms such as Google Maps over testimonials hosted on the company's own website
- Look for detailed reviews that mention specific hospitals, procedures, and coordinators
- Be wary of many five-star reviews posted within a short period, all with similar wording
- Search the company name together with words like "scam", "complaint", or "fraud"
## Red Flags of a Fake Medical Travel Agent
If you see several of these, walk away:
- Guaranteed results or "100% success rates" for surgery
- Prices dramatically lower than every other quote you have received
- Pressure tactics such as "this price is only valid today"
- No physical office, or an address that cannot be verified
- Refusal to let you speak to the hospital or doctor directly
- A doctor recommendation made before anyone has reviewed your medical reports
- Vague answers about what the package includes and excludes
## Green Flags of a Genuine Medical Tourism Company
A trustworthy facilitator is usually transparent about how they work:
- Clear explanation of their role, and that the hospital, not the facilitator, provides medical care
- Options from more than one hospital, with reasons for each recommendation
- Written estimates from the hospital, including what is not covered
- Open about any fees they charge and how they are paid
- Clear data privacy practices for your medical records
- Support after you return home, not just until the surgery is booked
## Frequently Asked Questions
### How can I tell if a medical tourism company in India is legitimate?
Confirm the company is registered with the Ministry of Corporate Affairs, verify its GST number, contact the hospital directly to confirm the relationship, and check the recommended doctor's registration with the National Medical Commission or a State Medical Council.
### Should I pay a medical travel agent in advance?
Avoid paying large advances to a facilitator before you have a written estimate from the hospital itself. Treatment payments should normally go to the hospital, and any facilitator fee should be clearly documented with an invoice.
### Is it safer to contact the hospital directly instead of using an agent?
Contacting the hospital directly is always a good way to verify information. A genuine facilitator adds value by comparing options, coordinating logistics, and supporting you during travel, but they should never prevent you from speaking to the hospital.
### Is GativCare a hospital?
No. GativCare is an independent medical travel facilitator. We help patients compare and coordinate treatment options with third-party hospitals in India. Diagnosis and treatment are provided by the hospital and its doctors.
## Final Thoughts
A genuine medical travel company will welcome your questions and make verification easy. If a company resists checks, rushes you to pay, or will not let you contact the hospital, that tells you everything you need to know.
If you would like help comparing hospitals in India with full transparency about our role and fees, [contact our team](/contact) and we will walk you through every step.`,
};

const bestPersonToHelp = {
  title: "Who Is the Best Person to Help With Medical Travel to India?",
  slug: "who-is-the-best-person-to-help-with-medical-travel-to-india",
  excerpt: "Hospital international desks, medical travel facilitators, your own doctor, or doing it yourself: an honest comparison of who can help you plan treatment in India, and what each one can and cannot do.",
  seoTitle: "Who Is the Best Person to Help With Medical Travel to India?",
  seoDescription: "Hospital international desks, medical travel facilitators, your home doctor, or DIY? Compare who can best help you plan treatment in India, and what to ask.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Patient Guide", "Medical Travel Planning", "Facilitators"],
  coverImage: "/images/blog/best-person-medical-travel-india.jpg",
  published: true,
  content: `Planning treatment in another country involves more than choosing a hospital. You need a reliable medical opinion, a realistic cost estimate, a medical visa, travel and accommodation, someone to help when you land, and a plan for follow-up care once you are home.
Patients often ask who is the best person to help them with all of this. The honest answer is that it depends on your condition, how comfortable you are organising things yourself, and how much support you want on the ground.
This guide compares the main people and organisations who can help with medical travel to India, so you can decide which combination is right for you.
## Option 1: The Hospital's International Patient Department
Most large hospitals in India that treat overseas patients have an international patient department. This team handles enquiries from abroad, shares cost estimates, issues the medical visa invitation letter, and often arranges airport pickup.
### What they do well
- Direct access to the hospital's own doctors and cost estimates
- The visa invitation letter comes straight from the treating hospital
- No middle layer between you and the people providing treatment
### Their limitations
- They represent one hospital, so they cannot objectively compare alternatives
- Response times can vary when they are handling many international enquiries
- Support usually ends at the hospital, not with your accommodation, local transport, or travel companions
## Option 2: A Medical Travel Facilitator
A medical travel facilitator, sometimes called a medical tourism company or medical travel agent, coordinates your case across hospitals and handles the practical arrangements.
### What a good facilitator does well
- Shares your reports with more than one hospital and helps you compare opinions and estimates
- Explains differences between hospitals, cities, and treatment approaches
- Coordinates visa documents, accommodation, airport transfers, and interpreters
- Acts as a single point of contact before, during, and after treatment
### What to watch out for
- Not every facilitator is trustworthy. Some steer patients to the hospital paying the highest commission
- A facilitator is not a healthcare provider and should never give you a diagnosis
- Fees and commissions should be disclosed clearly
Before choosing one, read our guide on [how to check if a medical travel company is real or fake](/blog/how-to-check-if-a-medical-travel-company-is-real-or-fake).
## Option 3: Your Own Doctor at Home
Your local doctor or specialist knows your medical history better than anyone. They are not usually in a position to organise treatment abroad, but their involvement is valuable.
- They can confirm that the treatment recommended in India is appropriate for your condition
- They can provide complete, up-to-date medical reports to share with Indian hospitals
- They are the person who will manage your recovery and follow-up once you return
Important: Tell your home doctor before you travel. Continuity of care after you return is one of the most overlooked parts of medical travel.
## Option 4: Organising Everything Yourself
Some patients prefer to contact hospitals directly and arrange every detail themselves. This can work well if your treatment is straightforward and you are comfortable navigating hospital communication, visas, and travel logistics on your own.
It takes more time and effort, and you will need to do your own comparison of hospitals and doctors. Our guide to [getting medical treatment in India without agents](/blog/best-way-to-get-medical-treatment-in-india-without-agents) explains how to approach it.
## So Who Is the Best Person to Help?
For most international patients, the best support comes from a combination rather than a single person:
- The treating doctor and hospital, for every medical decision
- Your home doctor, for a second check on the plan and for follow-up care
- A trustworthy facilitator, if you want help comparing hospitals and managing logistics
The right helper is the one who is transparent about their role, gives you options rather than pressure, and makes it easy for you to speak directly with the doctors involved.
## Questions to Ask Anyone Offering to Help
Whoever you consider, ask these questions before you commit:
- Are you a hospital, or do you coordinate with hospitals on my behalf?
- How many hospitals will you share my reports with, and why those ones?
- Will I be able to speak directly to the treating doctor before I travel?
- What exactly is included in the estimate, and what is not?
- Do you charge a fee, and does any hospital pay you a commission?
- Who will be my contact person in India if something goes wrong?
- What support do you offer after I return home?
## Frequently Asked Questions
### Do I need a medical travel agent to get treatment in India?
No. You can contact hospitals directly. A facilitator can save time by comparing hospitals and handling logistics, but it is optional, and you should always be able to verify information with the hospital yourself.
### Who issues the medical visa invitation letter?
The invitation or appointment letter for an Indian medical visa is issued by the treating hospital. A facilitator can help you request and organise the documents.
### Can a facilitator recommend the best doctor for my condition?
A facilitator can share your reports with suitable specialists and help you compare their opinions. The medical recommendation itself should come from qualified doctors who have reviewed your reports.
### What does GativCare help with?
GativCare is an independent medical travel facilitator. We help you compare hospitals, coordinate consultations and documents, and organise travel and on-ground support. Medical diagnosis and treatment are provided by the hospitals and their doctors.
## Final Thoughts
There is no single best person to help with medical travel. There is the best combination for your situation, built on transparency and direct access to the doctors treating you.
If you would like help comparing hospitals in India and planning your trip, [get in touch with our coordinators](/contact) for a free consultation.`,
};

const hiddenCosts = {
  title: "How to Avoid Hidden Hospital Costs When Going to India for Surgery",
  slug: "how-to-avoid-hidden-hospital-costs-in-india-for-surgery",
  excerpt: "The quote looked affordable, but the final bill did not. Learn where hidden hospital costs come from in India, what a surgery package usually excludes, and the questions that keep your bill predictable.",
  seoTitle: "How to Avoid Hidden Hospital Costs for Surgery in India",
  seoDescription: "Avoid surprise charges on your surgery bill in India: what packages exclude, how room category and implants change cost, ICU and extra-stay charges.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Surgery Cost", "Patient Guide", "Hospital Bills"],
  coverImage: "/images/blog/avoid-hidden-hospital-costs-india.jpg",
  published: true,
  content: `Cost is one of the main reasons international patients choose India for surgery. Yet one of the most common complaints after treatment is that the final hospital bill was noticeably higher than the original estimate.
In most cases the hospital has not been dishonest. The estimate was based on assumptions, such as a certain room type, a standard implant, and an uncomplicated recovery, and those assumptions did not match what actually happened. The extra charges were always possible. They just were not explained.
This guide explains where hidden hospital costs in India usually come from, and how to get a surgery cost estimate you can actually rely on.
## Package Price vs. Itemised Billing
Indian hospitals generally bill in one of two ways.
### Surgery packages
A package is a fixed price for a defined procedure and a defined length of stay. It typically covers the surgeon's fee, operating theatre, standard medicines and consumables, nursing, and a set number of days in a specific room category. Anything outside that definition is billed separately.
### Itemised billing
With itemised billing, every service, medicine, test, and day of stay is charged individually. The estimate is a projection, and the final bill reflects what was actually used.
Important: A package is only fixed for what it includes. Always ask for the written list of inclusions and exclusions, not just the headline price.
## Common Sources of Hidden Hospital Costs
### Room category upgrades
In many Indian hospitals, the room category you choose affects much more than the room charge. Doctor visit fees, nursing charges, and sometimes procedure charges can be linked to the room category. Upgrading from a twin-sharing room to a private suite can raise the entire bill, not just the accommodation line.
### Implants and devices
For joint replacements, spine surgery, cardiac stents, and lens implants, the brand and type of implant can change the cost significantly. Estimates often assume a standard implant. Ask which implant is included and what the alternatives cost.
### Extra days in hospital or ICU
Packages assume a standard recovery. If you need additional days in hospital or time in the ICU, those days are usually charged separately at daily rates.
### Tests repeated on arrival
Hospitals often repeat blood tests and scans when you arrive, even if you have recent reports from home. Ask which pre-operative investigations are included in the estimate.
### Medicines, blood, and consumables beyond the package
Expensive medicines, blood products, and additional consumables may fall outside the package limit.
### Specialist consultations
If another specialist, such as a cardiologist or physiotherapist, is involved in your care, their consultations may be billed separately.
### Costs outside the hospital
The hospital bill is only part of your total cost. Budget separately for:
- Flights for you and anyone travelling with you
- Accommodation before admission and after discharge
- Meals, local transport, and mobile data
- Medicines to take home and follow-up consultations
- Visa fees and travel insurance
- Currency conversion and international transfer charges
## How to Get a Reliable Surgery Cost Estimate in India
The accuracy of an estimate depends heavily on the information you provide. Send the hospital complete, recent medical reports, including scans, blood work, and details of any other conditions such as diabetes or heart disease. Then ask for:
- A written estimate on the hospital's letterhead
- The room category the estimate is based on
- The number of hospital days and ICU days included
- The specific implant or device included, if any
- A list of what is excluded from the package
- Daily rates for extra hospital days, ICU days, and room upgrades
- How long the quoted price is valid
Use our [cost estimator](/cost-estimator) for a first rough idea, then confirm the details with the hospital in writing.
## Questions to Ask Before You Pay a Deposit
- What happens to the cost if there are complications?
- Is the deposit refundable if the doctor decides surgery is not suitable after examining me?
- Which payment methods do you accept, and are there any card or transfer charges?
- Will I receive an itemised final bill?
- Who can I speak to if the final bill differs from the estimate?
## Comparing Quotes Fairly
When you compare estimates from different hospitals, make sure you are comparing the same things. A lower price may be based on a shorter stay, a different implant, or a smaller room. Line the estimates up side by side using the same checklist above before deciding which is better value.
For more on choosing a hospital, see our guide to [whether it is safe to travel to India for major surgery](/blog/is-it-safe-to-travel-to-india-for-major-surgery).
## Frequently Asked Questions
### Why was my final hospital bill in India higher than the estimate?
The most common reasons are extra days in hospital or ICU, a room upgrade, a different implant, additional tests or specialist consultations, and medicines outside the package. Asking for a written list of exclusions in advance helps avoid surprises.
### Are surgery packages in India all-inclusive?
Not usually. Packages cover a defined set of services for a defined length of stay in a specific room category. Anything outside that definition is charged separately.
### Does the room type really affect the total cost of surgery?
In many Indian hospitals, yes. Some charges, such as doctor visits and nursing, can be linked to the room category, so a higher room category may increase more than just the room rent.
### Can I get a fixed price for surgery in India?
Some hospitals offer fixed packages for common procedures. Even then, complications or extra days are usually charged separately, so ask how those situations are billed before you commit.
## Final Thoughts
Hidden costs are rarely hidden on purpose. They come from assumptions that nobody explained. Asking the right questions before you travel turns an uncertain estimate into a predictable budget.
If you would like help collecting and comparing written estimates from hospitals in India, [contact our team](/contact) for a free consultation.`,
};

const talkToDoctor = {
  title: "Can I Talk Directly to a Doctor in India Before Traveling?",
  slug: "can-i-talk-directly-to-a-doctor-in-india-before-traveling",
  excerpt: "Yes, and you should. How online video consultations with Indian specialists work, what to prepare, the questions to ask, and what a consultation can and cannot tell you before you travel.",
  seoTitle: "Can I Talk Directly to a Doctor in India Before Traveling?",
  seoDescription: "Yes, you can. How to book a video consultation with a specialist doctor in India before you travel: reports to send, questions to ask, and costs.",
  author: "GativCare Team",
  tags: ["Medical Tourism", "Online Consultation", "Patient Guide", "Doctors"],
  coverImage: "/images/blog/talk-to-doctor-before-travel.jpg",
  published: true,
  content: `Booking flights to another country for surgery without ever speaking to the surgeon is a big leap of faith. Fortunately, you usually do not have to take it.
Yes, you can talk directly to a doctor in India before traveling. Many hospitals that treat international patients offer online video or phone consultations with their specialists, and speaking to the treating doctor before you commit is one of the most valuable steps in planning medical travel.
This guide explains how a pre-travel consultation works, how to prepare for it, and what to ask.
## Why Speak to the Doctor Before You Travel?
A consultation before travel helps you:
- Confirm that the recommended treatment is appropriate for your condition
- Understand the procedure, the risks, and the expected recovery in your own words
- Judge whether you are comfortable with the doctor's communication style
- Get a more accurate estimate of the length of stay and cost
- Avoid travelling only to be told that a different treatment is needed
Important: Be cautious of any company that discourages you from speaking with the treating doctor before you travel. Direct access to the doctor is a basic sign of a trustworthy process.
## How Online Consultations With Indian Doctors Work
The process is usually similar across hospitals:
- You share your medical reports with the hospital's international patient department, or through a facilitator
- The relevant specialist reviews the reports and may send an initial written opinion
- A video or phone consultation is scheduled at a time that suits both time zones
- After the call, the hospital shares a treatment plan and cost estimate in writing
Some hospitals provide a free initial opinion based on your reports, while a detailed video consultation with a senior specialist may carry a fee. Ask about any charges before you book.
## What to Prepare Before the Consultation
The quality of the consultation depends on the information the doctor has. Prepare:
- Recent scans, such as MRI, CT, or X-ray, preferably with the image files and not just the written report
- Recent blood test results
- Previous surgery or hospital discharge summaries
- A list of your current medicines and any allergies
- Details of other conditions, such as diabetes, high blood pressure, or heart problems
- A written list of your questions
If your reports are not in English, ask whether the hospital needs translations.
## Questions to Ask the Doctor
### About your treatment
- What exactly do you recommend, and why?
- Are there alternatives, including non-surgical options?
- What are the main risks for someone with my medical history?
### About the doctor's experience
- How often do you perform this procedure?
- Will you personally perform the surgery, or will another member of the team?
### About your stay and recovery
- How many days will I need to stay in hospital, and how long should I stay in India after discharge?
- When will it be safe for me to fly home?
- What follow-up care will I need at home, and can you coordinate with my local doctor?
### About cost
- Does the estimate change based on what you have seen in my reports?
- What situations could increase the cost?
For a detailed checklist on cost questions, read our guide on [how to avoid hidden hospital costs in India](/blog/how-to-avoid-hidden-hospital-costs-in-india-for-surgery).
## What a Remote Consultation Cannot Do
An online consultation is very useful, but it has limits. The doctor cannot physically examine you, and some decisions depend on tests done in person. It is normal for the final treatment plan to be confirmed after you arrive and are examined.
Ask the doctor which parts of the plan might change after the in-person examination, and how that would affect cost and length of stay.
## Getting a Second Opinion Remotely
You can also use online consultations to get a second opinion from another specialist, either before choosing a hospital or to double-check a recommendation you already have. Our guide on [how to get a second opinion from an Indian specialist](/blog/how-to-get-a-second-opinion-from-an-indian-specialist-doctor) explains the process.
## Frequently Asked Questions
### Can I have a video call with an Indian surgeon before I travel?
Yes. Many hospitals that treat international patients offer video or phone consultations with their specialists after reviewing your medical reports. Ask the hospital's international patient department or your facilitator to arrange it.
### Is an online consultation with an Indian doctor free?
It varies. Some hospitals offer a free initial opinion based on your reports, while a detailed consultation with a senior specialist may be charged. Confirm any fee before booking.
### Can the doctor change the treatment plan after I arrive?
Yes, this can happen. A remote consultation is based on your reports, and the doctor may adjust the plan after examining you and reviewing new tests. Ask in advance which parts of the plan might change.
### Can GativCare arrange a consultation with a doctor in India?
Yes. GativCare can share your reports with suitable specialists and help schedule a consultation. The medical opinion comes directly from the doctor, not from GativCare.
## Final Thoughts
Speaking directly to your doctor before you travel replaces uncertainty with understanding. You will know what to expect, how long to plan for, and whether you trust the person treating you.
If you would like help arranging a consultation with a specialist in India, [contact our team](/contact) and we will help you get your reports to the right doctor.`,
};

const posts = [verifyCompany, bestPersonToHelp, hiddenCosts, talkToDoctor];

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
