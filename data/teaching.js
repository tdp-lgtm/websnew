// ============================================================
//  TEACHING
//  Group by institution. Within each institution, list entries
//  with role, year, course name, and an optional note.
//
//  The 'anchor' must match NAV_TEACHING in data/nav-items.js.
//
//  role: free text, e.g. "Module Convenor" | "Seminar Convenor"
//        | "Graduate Teaching Assistant" | "Supervision"
//  year: string, e.g. "2025" — leave "" for role-level entries
//  note: optional, e.g. "with Helen Frowe, for MA and PhD students"
// ============================================================

const TEACHING = [

  {
    institution: "Stockholm University",
    anchor:      "stockholm",
    entries: [
      { role: "Module Convenor", year: "2025", course: "Course Name", note: "for MA students" },
    ],
  },

  {
    institution: "King's College London",
    anchor:      "kcl",
    entries: [
      { role: "Module Convenor",             year: "2025", course: "The Ethics of War",                                              note: "with Helen Frowe, for MA and PhD students" },
      { role: "Module Convenor",             year: "2023", course: "General Philosophy",                                             note: "for MA students" },
      { role: "Seminar Convenor",            year: "2024", course: "Doctor and Society",                                             note: "for medical students" },
      { role: "Seminar Convenor",            year: "2023", course: "Political Philosophy 2",                                         note: "" },
      { role: "Graduate Teaching Assistant", year: "2022", course: "Doctor and Society",                                             note: "for medical students" },
      { role: "Graduate Teaching Assistant", year: "2021", course: "Ethics 2",                                                       note: "" },
      { role: "Graduate Teaching Assistant", year: "2020", course: "Environmental Ethics",                                           note: "" },
      { role: "Graduate Teaching Assistant", year: "2020", course: "Topics in Political Philosophy: The Ethics of Migration",        note: "" },
      { role: "Graduate Teaching Assistant", year: "2019", course: "Ethics 1",                                                       note: "" },
      { role: "Supervision",                 year: "",     course: "BA Philosophy dissertation (x3)",                                note: "" },
    ],
  },

  {
    institution: "University of Oxford",
    anchor:      "oxford",
    entries: [
      { role: "Tutor", year: "2020", course: "Course Name", note: "Undergraduate" },
    ],
  },

];
