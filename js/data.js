/*
 * data.js — the portfolio's content, stored as lists of objects.
 *
 * main.js turns these lists into cards, timeline entries and carousel slides.
 * To add something new (a project, a skill, a value), add an object to the
 * right list. No HTML needs to change.
 *
 * Status rule: only mark something "experience" if it has actually happened.
 */
const SITE_DATA = {
  // The four labels used across the site to separate what is done from what is planned
  statuses: {
    experience: { label: "Experience", description: "Things I have done." },
    developing: { label: "Developing", description: "Skills I am building right now." },
    interest: { label: "Interest", description: "Areas I study, follow and want to grow into." },
    ambition: { label: "Ambition", description: "Where I am heading — goals, not yet achievements." },
  },

  // Filter buttons for the Areas section. Each area belongs to one or more groups.
  areaGroups: [
    { id: "all", label: "All" },
    { id: "think", label: "Think" },
    { id: "create", label: "Create" },
    { id: "build", label: "Build" },
  ],

  areas: [
    {
      title: "Research & Public Policy",
      groups: ["think"],
      statuses: ["interest"],
      summary:
        "Understanding the challenges facing Nigeria's and Africa's institutions, societies, education systems and economies — and how research, policy and effective implementation can contribute to meaningful change.",
      topics: ["Policy analysis", "Governance", "Political research", "Evidence-based decisions"],
    },
    {
      title: "Data Science & Technology",
      groups: ["think", "build"],
      statuses: ["developing"],
      summary:
        "Building my skills in data and technology, because understanding and solving today's problems increasingly depends on data, innovation and technology.",
      topics: ["Data science", "Technology", "Innovation"],
    },
    {
      title: "Beauty — Tef Studio",
      groups: ["create", "build"],
      statuses: ["experience", "ambition"],
      summary:
        "A background in makeup artistry, and the founder of Tef Studio. Beauty, for me, is a language of identity, confidence, individuality and self-expression.",
      topics: ["Makeup artistry", "Representation of Black skin tones", "Beauty experiences"],
    },
    {
      title: "Fashion & Creative Direction",
      groups: ["create"],
      statuses: ["interest", "ambition"],
      summary:
        "Fashion, personal styling and image development — and where fashion, sport and personality meet, including styling basketball players and other sports personalities.",
      topics: ["Personal styling", "Image development", "Creative direction", "Sport & fashion"],
    },
    {
      title: "Entrepreneurship & Brands",
      groups: ["build"],
      statuses: ["experience", "interest"],
      summary:
        "Building businesses, not merely taking part in industries — turning creative ideas into brands that are commercially viable, scalable and genuinely valuable.",
      topics: ["Brand development", "Consumer behaviour", "Market research", "Customer experience", "Product development"],
    },
    {
      title: "Education & Youth Development",
      groups: ["think", "build"],
      statuses: ["experience", "interest"],
      summary:
        "Teaching in a children's department shaped how I value learning, communication and understanding concepts deeply. I care about helping young people discover their abilities.",
      topics: ["Education policy", "Curriculum development", "Youth empowerment", "Talent discovery"],
    },
  ],

  // Journey timeline, in order: done → building → interested → aiming for
  journey: [
    {
      status: "experience",
      title: "Makeup artistry",
      text: "My background in makeup artistry grew out of beauty, one of my earliest and most enduring interests.",
    },
    {
      status: "experience",
      title: "Founded Tef Studio",
      text: "I founded Tef Studio, my beauty brand, and I am the creative force behind it.",
    },
    {
      status: "experience",
      title: "Teaching in a children's department",
      text: "Teaching children shaped my appreciation for learning, communication and understanding concepts deeply.",
    },
    {
      status: "developing",
      title: "Data Science & technology",
      text: "I am developing my skills in data science, because data and technology are central to understanding and solving modern problems.",
    },
    {
      status: "interest",
      title: "Public policy, politics & governance",
      text: "Policy analysis, research documentation, political research and evidence-based decision-making — with a focus on Nigeria and Africa.",
    },
    {
      status: "interest",
      title: "Education policy & curriculum development",
      text: "How education systems are designed, and how young people can be given room to explore their abilities.",
    },
    {
      status: "interest",
      title: "Brands & consumer behaviour",
      text: "Brand development, market research, customer experience and finding the gaps within industries.",
    },
    {
      status: "ambition",
      title: "Grow Tef Studio into a beauty & lifestyle enterprise",
      text: "Moving beyond makeup services into products, retail, professional experiences, fashion and innovation.",
    },
    {
      status: "ambition",
      title: "Style basketball players & sports personalities",
      text: "Exploring the meeting point of fashion, sport and personality.",
    },
    {
      status: "ambition",
      title: "Platforms for young people's talents",
      text: "Initiatives that help young people discover their talents and possibilities.",
    },
    {
      status: "ambition",
      title: "Contribute to Nigeria's and Africa's development",
      text: "Through research, policy and governance — alongside building creative businesses.",
    },
  ],

  // Values carousel slides
  values: [
    {
      title: "Curiosity",
      text: "I enjoy exploring unfamiliar subjects, asking questions and understanding how things work — and how they can work better.",
    },
    {
      title: "Listening",
      text: "Listening is an important part of how I engage with people and with ideas.",
    },
    {
      title: "Intellectual depth",
      text: "I value understanding things deeply, not just on the surface.",
    },
    {
      title: "Creativity & self-expression",
      text: "Creativity is an important part of my identity, and I value the freedom to express who I am.",
    },
    {
      title: "Excellence",
      text: "I aim for work that is done well and done with care.",
    },
    {
      title: "Faith",
      text: "Faith is one of the values that shapes how I live and what I pursue.",
    },
    {
      title: "Continuous learning",
      text: "I am committed to learning continuously and growing as I go.",
    },
    {
      title: "Purposeful living",
      text: "I want my ideas to turn into action, and my work to contribute meaningfully to society.",
    },
  ],
};
