// ============================================================
//  WORKSHOPS
//  The 'id' must match the anchor in NAV_WORKSHOPS (nav-items.js).
//
//  Required: id, title, institution, year
//  Optional: month, coorganisers, description, registration,
//            programme (array of { speaker, title })
//
//  For co-presenting speakers use "\n" in the speaker string:
//    speaker: "Anna Smith (LSE) and\nJohn Doe (Oxford)"
// ============================================================

const WORKSHOPS = [

  {
    id:            "workshop-1",
    title:         "Workshop Name 1",
    institution:   "Stockholm University",
    month:         "April",
    year:          2025,
    coorganisers:  "Jane Smith",
    description:   "This workshop will bring together philosophers working on [topic] to explore [themes].",
    registration:  "The event is free and open to all. To register, please contact [name] ([email]) no later than [date] with your name, affiliation, and any dietary requirements.",
    programme: [
      { speaker: "Kimberly Ferzan (University of Pennsylvania)", title: "TBA" },
      { speaker: "Patrick Tomlin (Warwick University)",          title: "Paper Title" },
      { speaker: "Helen Frowe (Stockholm University)",           title: "Paper Title" },
      { speaker: "Anna Smith (LSE) and\nJohn Doe (Oxford)",      title: "Paper Title" },
    ],
  },

  {
    id:            "workshop-2",
    title:         "Workshop Name 2",
    institution:   "King's College London",
    month:         "October",
    year:          2023,
    coorganisers:  "",
    description:   "",
    registration:  "",
    programme: [
      { speaker: "Name (Institution)", title: "Paper Title" },
      { speaker: "Name (Institution)", title: "Paper Title" },
    ],
  },

];
