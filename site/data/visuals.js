// Use the supplied reference artwork throughout. Secondary-page originals were
// not included in the saved asset folder, so these reuse the closest local image.
export const BACKGROUNDS = {
  hero: "/assets/blueoak-hero.webp",
  services: "/assets/office-lobby.webp",
  work: "/assets/blueoak-hero.webp",
  voices: "/assets/moment-table.webp",
  team: "/assets/team-group.webp",
  contact: "/assets/moment-whiteboard.webp",
};
export const OFFICE = {
  lobby: "/assets/office-lobby.webp",
  workspace: "/assets/moment-standup.webp",
  group: "/assets/team-group.webp",
};
export const SERVICE_ART = {
  "web-apps": OFFICE.workspace,
  "healthcare-apps": "/assets/pulsegrid-concept.webp",
  "fintech-apps": "/assets/ledgerline-concept.webp",
  "shopping-ecommerce-apps": "/assets/aislemet-concept.webp",
  "education-apps": BACKGROUNDS.voices,
  "video-streaming-apps": "/assets/streamhouse-concept.webp",
  "ai-scratch": BACKGROUNDS.hero,
};
