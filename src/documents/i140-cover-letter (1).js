/**
 * i140-cover-letter.js
 * Documento: Cover Letter para Petição I-140 (EB-1A)
 */
const i140CoverLetter = {
  settings: {
    margins: { top: 96, bottom: 80, left: 96, right: 96 },
    alignment: "justify",
    lineSpacing: 1.7,
    paraSpacing: 2,
  },
  footnotes: [
    {
      id: "fn-1",
      text: "Immigration and Nationality Act § 203(b)(1)(A), 8 U.S.C. § 1153(b)(1)(A). Full text available at:",
      url: "https://www.uscis.gov/laws-and-policy/legislation/immigration-and-nationality-act",
    },
  ],
  elements: [
    { id: "date", type: "paragraph", html: '<em style="color:#2E74B5">[Month Day, Year]</em>' },
    { id: "s01", type: "spacer" },
    { id: "addr", type: "paragraph", alignment: "left", html: 'U.S. Citizenship and Immigration Services<br><em style="color:#2E74B5">[Applicable USCIS Service Center or Filing Location]</em><br><em style="color:#2E74B5">[Service Center Street Address]</em><br><em style="color:#2E74B5">[City, State ZIP Code]</em>' },
    { id: "s02", type: "spacer" },
    { id: "re", type: "paragraph", alignment: "left", html: '<b>RE:</b> Form I-140, Immigrant Petition for Alien Workers<br><b>Classification Sought:</b> Alien of Extraordinary Ability (E11), pursuant to INA § 203(b)(1)(A)<br><b>Petitioner/Beneficiary:</b> Mariana Bitu Ramos Pinto<br><b>Country of Birth:</b> <em style="color:#2E74B5">[Country]</em><br><b>Country of Nationality:</b> <em style="color:#2E74B5">[Country]</em><br><b>Field of Extraordinary Ability:</b> <em style="color:#2E74B5">[Field of Extraordinary Ability]</em>' },
    { id: "s03", type: "spacer" },
    { id: "sal", type: "paragraph", html: "Dear USCIS Officer:" },
    { id: "s04", type: "spacer" },
    { id: "intro", type: "paragraph", html: 'I am writing to respectfully submit this letter in support of my petition for classification as a qualified immigrant under the first preference employment immigration for Aliens of Extraordinary Ability pursuant to section 203(b)(1)(A) of the Immigration and Nationality Act (\u201cthe Act\u201d), 8 U.S.C. § 1153(b)(1)(A){{fn:fn-1}}. The evidence submitted herein demonstrates that:' },
    { id: "s05", type: "spacer" },
    { id: "criteria", type: "bullet_list", items: [
      { id: "c1", html: "I have met at least 3 of the regulatory criteria set at 8 C.F.R. § 204.5(h)(3);" },
      { id: "c2", html: 'I have achieved a level of expertise indicating that I am \u201cone of that small percentage who have risen to the very top of the field of endeavor\u201d as defined by 8 C.F.R. § 204.5(h)(2); and' },
      { id: "c3", html: "I have sustained national or international acclaim and recognition for my achievements in my area of expertise, as required by 8 C.F.R. § 204.5(h)(3)." },
    ]},
    { id: "s06", type: "spacer" },
    { id: "kazarian", type: "paragraph", html: "The evidence provided also demonstrates that I have met the two-part criteria outlined in Kazarian, Kazarian v. USCIS, 596 F.3d 1115 (9th Cir. 2010). This approach involves an initial weighing of the evidence to determine whether at least three criteria are met, followed by a final determination on the merits. Pursuant to section 203(b)(1)(A) of the Act, upon establishing that I have extraordinary ability in my field of endeavor, the evidence here submitted proves that I qualify for this classification, as I seek to enter the United States to continue work in my area of expertise, and my entry to the United States will substantially benefit the United States." },
    { id: "s07", type: "spacer" },
    { id: "close", type: "paragraph", html: "Thank you for considering my petition." },
    { id: "s08", type: "spacer" },
    { id: "sig", type: "paragraph", alignment: "left", html: 'Sincerely,<br><br>Mariana Bitu Ramos Pinto<em style="color:#2E74B5">[, Professional Credentials]</em>' },
  ],
};

export default i140CoverLetter;
