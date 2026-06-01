// ============================================================
//  TALKS
//  Add one block per talk. Order = display order (newest first).
//
//  Required: year, title, venue, institution
//  type options: "Invited" | "Peer-Rewiew" | "None"
//  Optional: month, comment (e.g. "commentator: Name")
// ============================================================

const TALKS = [

  {
    year:        2024,
    month:       "November",    // optional — leave "" to show year only
    type:        "Invited",
    title:       "Talk Title Here",
    venue:       "Seminar Name",
    institution: "University Name",
    comment:     "",            // e.g. "commentator: Jane Smith"
  },

 // ── SCHEDULED ──────────────────────────────────────────────
 
  {
    year:        2026,
    month:       "",    // optional — leave "" to show year only
    type:        "Conference",
    title:       "Harms We Cause Together",
    venue:       "\"Degrees of Responsibility in Metaphysics, Ethics, and the Law\", Symposium at the American Philosophical Association, Eastern Division",
    institution: "American Philosophical Association",
    comment:     "",     // e.g. "commentator: Jane Smith"
  },
  {
    year:        2026,
    month:       "",
    type:        "Invited",
    title:       "Taking Risks in an Unjust World",
    venue:       "Centre for Aesthetic, Moral and Political Philosophy",
    institution: "Leeds University",
    comment:     "",
  },
  {
    year:        2026,
    month:       "",
    type:        "Conference",
    title:       "Reparative Achievements",
    venue:       "Philosophy, Ethics, and Killing Workshop",
    institution: "Peak District",
    comment:     "",
  },
  {
    year:        2026,
    month:       "",
    type:        "Conference",
    title:       "Too Much Information: The Problem with Oversharing (with Romy Eskens)",
    venue:       "Swedish Congress of Philosophy",
    institution: "Stockholm University",
    comment:     "",
  },
 
  // ── 2025 ───────────────────────────────────────────────────
 
  {
    year:        2025,
    month:       "",
    type:        "Conference",
    title:       "What's Wrong with Victim-Blaming?",
    venue:       "Joint Session of the Aristotelian Society and the Mind Association",
    institution: "University of Glasgow",
    comment:     "",
  },
  {
    year:        2025,
    month:       "",
    type:        "Conference",
    title:       "What's Wrong with Victim-Blaming?",
    venue:       "Philosophy, Ethics, and Killing Workshop",
    institution: "Peak District",
    comment:     "",
  },
  {
    year:        2025,
    month:       "",
    type:        "Invited",
    title:       "What's Wrong with Victim-Blaming?",
    venue:       "Workshop on Degradation and Dehumanization",
    institution: "Utrecht University",
    comment:     "",
  },
  {
    year:        2025,
    month:       "",
    type:        "Conference",
    title:       "Outrageous Advice (with Romy Eskens)",
    venue:       "Society for Applied Philosophy Annual Conference",
    institution: "Gdansk",
    comment:     "",
  },
 
  // ── 2024 ───────────────────────────────────────────────────
 
  {
    year:        2024,
    month:       "",
    type:        "Conference",
    title:       "Outrageous Advice (with Romy Eskens)",
    venue:       "Dutch Research School of Philosophy Annual Conference",
    institution: "Eindhoven University of Technology",
    comment:     "",
  },
  {
    year:        2024,
    month:       "",
    type:        "Invited",
    title:       "Outrageous Advice (with Romy Eskens)",
    venue:       "Philosophy & Public Affairs Colloquium",
    institution: "University of Amsterdam",
    comment:     "",
  },
  {
    year:        2024,
    month:       "",
    type:        "Invited",
    title:       "Outrageous Advice (with Romy Eskens)",
    venue:       "Moral, Legal, and Political Research Seminar",
    institution: "King's College London",
    comment:     "",
  },
 
  // ── 2022 ───────────────────────────────────────────────────
 
  {
    year:        2022,
    month:       "",
    type:        "Invited",
    title:       "Risks, Rights, and Proportionality",
    venue:       "Higher Seminar in Practical Philosophy",
    institution: "Stockholm University",
    comment:     "",
  },
  {
    year:        2022,
    month:       "",
    type:        "Invited",
    title:       "The Grounds and Limits of the Necessity Condition",
    venue:       "PhD Seminar in Practical Philosophy",
    institution: "Stockholm University",
    comment:     "",
  },
  {
    year:        2022,
    month:       "",
    type:        "Invited",
    title:       "Dangerous Parties and Undirected Duties",
    venue:       "Philosophy, Ethics, and Killing Workshop",
    institution: "Peak District",
    comment:     "",
  },
  {
    year:        2022,
    month:       "",
    type:        "Conference",
    title:       "What Do We Owe to Aggressors?",
    venue:       "Politics, Law and Philosophy Graduate Forum",
    institution: "",
    comment:     "commentators: C. Fabre and P. Oderberg",
  },
  {
    year:        2022,
    month:       "",
    type:        "Conference",
    title:       "A Duty to Accommodate Wrongdoers?",
    venue:       "CEPPA Graduate Conference",
    institution: "University of St. Andrews",
    comment:     "commentator: T. Pummer",
  },
  {
    year:        2022,
    month:       "",
    type:        "Conference",
    title:       "Defensive Entrapment and Manipulation",
    venue:       "London Graduate Workshop on Moral and Political Philosophy",
    institution: "Senate House",
    comment:     "",
  },
 
  // ── 2021 ───────────────────────────────────────────────────
 
  {
    year:        2021,
    month:       "",
    type:        "Conference",
    title:       "Defensive Entrapment and Manipulation",
    venue:       "Zagreb Applied Ethics Conference",
    institution: "Institute of Philosophy, Zagreb",
    comment:     "",
  },
  {
    year:        2021,
    month:       "",
    type:        "Conference",
    title:       "Law Enforcement and Proportionality",
    venue:       "Brave New World Graduate Conference",
    institution: "University of Manchester",
    comment:     "",
  },
  {
    year:        2021,
    month:       "",
    type:        "Invited",
    title:       "Punishment and The Problem of False Confessions",
    venue:       "Advanced Research Seminar",
    institution: "King's College London",
    comment:     "",
  },
  {
    year:        2021,
    month:       "",
    type:        "Conference",
    title:       "Entrapment, Manipulation and Morally Tainted Punishment",
    venue:       "Rocky Mountain Ethics Congress",
    institution: "Boulder, Colorado",
    comment:     "commentator: C. Kianpour",
  },
  {
    year:        2021,
    month:       "",
    type:        "Conference",
    title:       "Provocation and Self-Defence",
    venue:       "Graduate Reading Retreat",
    institution: "Stockholm Centre for the Ethics of War and Peace",
    comment:     "commentator: K.K. Ferzan",
  },
 
  // ── 2020 ───────────────────────────────────────────────────
 
  {
    year:        2020,
    month:       "",
    type:        "Conference",
    title:       "Entrapment, Manipulation and Morally Tainted Punishment",
    venue:       "Oxford Graduate Conference in Political Theory",
    institution: "University of Oxford",
    comment:     "",
  },
 
  // ── 2019 ───────────────────────────────────────────────────
 
  {
    year:        2019,
    month:       "",
    type:        "Conference",
    title:       "Provocation and Self-Defence",
    venue:       "Reading Ethics and Political Philosophy Conference",
    institution: "University of Reading",
    comment:     "",
  },
  {
    year:        2019,
    month:       "",
    type:        "Invited",
    title:       "Provocation and Self-Defence",
    venue:       "Advanced Research Seminar",
    institution: "King's College London",
    comment:     "",
  },
  {
    year:        2019,
    month:       "",
    type:        "Conference",
    title:       "Provocation and Self-Defence",
    venue:       "Stockholm Philosophy Graduate Conference",
    institution: "Stockholm University",
    comment:     "commentator: L. Hecht",
  },
  {
    year:        2019,
    month:       "",
    type:        "Conference",
    title:       "Provocation and Self-Defence",
    venue:       "London-Berkeley Philosophy Graduate Conference",
    institution: "UC Berkeley",
    comment:     "commentator: E. Podhorcer",
  },
 
  // ── 2018 ───────────────────────────────────────────────────
 
  {
    year:        2018,
    month:       "",
    type:        "Conference",
    title:       "Liability to Defensive Harm and The Standing Constraint",
    venue:       "Warwick Graduate Conference in Political and Legal Theory",
    institution: "University of Warwick",
    comment:     "",
  },
];
 

];
