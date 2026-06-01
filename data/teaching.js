// ============================================================
//  TEACHING
//  Add one block per course. Group by institution using the
//  'institution' field — it must match an anchor in nav-items.js.
//
//  Required: institution, course, role, year
//  level options: "Undergraduate" | "Graduate" | "Both"
//  Optional: description
// ============================================================

const TEACHING = [

  {
    institution: "Stockholm University",
    anchor:      "stockholm",          // must match NAV_TEACHING anchor
    course:      "Course Name",
    role:        "Lecturer",           // e.g. "Lecturer" | "Seminar tutor" | "Teaching assistant"
    level:       "Graduate",
    year:        "2024–25",
    description: "",                   // optional short note
  },

  {
    institution: "King's College London",
    anchor:      "kcl",
    course:      "Course Name",
    role:        "Seminar tutor",
    level:       "Undergraduate",
    year:        "2022–23",
    description: "",
  },

  {
    institution: "King's College London",
    anchor:      "kcl",
    course:      "Course Name",
    role:        "Seminar tutor",
    level:       "Undergraduate",
    year:        "2021–22",
    description: "",
  },

  {
    institution: "University of Oxford",
    anchor:      "oxford",
    course:      "Course Name",
    role:        "Tutor",
    level:       "Undergraduate",
    year:        "2020–21",
    description: "",
  },

];
