// ============================================================
//  WORKSHOPS
//  Add one block per workshop. The 'id' must match the anchor
//  in nav-items.js (NAV_WORKSHOPS).
//
//  Required: id, title, institution, year
//  Optional: month, coorganisers, description, programme
//
//  Each programme entry needs: title, speaker
// ============================================================

const WORKSHOPS = [

  {
    id:            "workshop-1",        // must match NAV_WORKSHOPS anchor
    title:         "Workshop Name 1",
    institution:   "Stockholm University",
    month:         "May",               // leave "" to show year only
    year:          2024,
    coorganisers:  "Jane Smith",        // leave "" if solo
    description:   "A description of this workshop — its theme, aims, and scope.",
    programme: [
      { title: "Paper Title", speaker: "Name (Institution)" },
      { title: "Paper Title", speaker: "Name (Institution)" },
      { title: "Paper Title", speaker: "Name (Institution)" },
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
    programme: [
      { title: "Paper Title", speaker: "Name (Institution)" },
      { title: "Paper Title", speaker: "Name (Institution)" },
    ],
  },

];
