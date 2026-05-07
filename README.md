# Bits By Vik

Nuxt 4 portfolio site for Viktor Hadzhiyski.

## Structure

```text
app/
  components/
    Button.vue
    BrandMark.vue
    DividerMarks.vue
    PageTransition.vue
    SiteHeader.vue
    TechBadge.vue
    home/
      HeroSection.vue
      FeaturedSection.vue
      SkillsSection.vue
      ProcessSection.vue
      ArchiveSection.vue
      ContactSection.vue
      hero/
      featured/
      skills/
      process/
    projects/
      FieldArt.vue
      ProjectPage.vue
  data/portfolio/
    home.ts
    projects.ts
    tech.ts
```

## Naming Rules

- Top-level shared UI stays short: `Button`, `SiteHeader`, `TechBadge`.
- Page sections use `Section` suffix.
- Feature-local pieces live inside the feature folder and keep short names because the folder gives the context.
- Non-component files stay lowercase.
- Prefer `~/...` imports over deep relative paths.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```
