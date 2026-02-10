# 2026 Assessment Redesign Framework

A static website for the **2026 Assessment Redesign Framework** by **Dr Hazel Farrell**, Academic Lead for GenAI at South East Technological University (SETU). Developed as part of the [GenAI:N3](https://genain3.ie) project.

This framework supports educators in redesigning assessments to ensure they remain valid, fair, transparent, and aligned with learning outcomes in an AI-enhanced educational landscape.

## Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Introduction, author profile, and navigation to all sections |
| **Framework Overview** | `framework.html` | Introduction, policy context, objectives, scope, and the purpose of assessment |
| **Core Principles** | `principles.html` | Five guiding principles: validity, fairness, transparency, accessibility, and alignment with learning outcomes |
| **Risk & Detection** | `risk-detection.html` | Assessment risk levels, mitigation strategies, AI detection tool limitations, and postgraduate considerations |
| **AI Integration** | `integration.html` | AIED Framework integration factors, Furze AI Assessment Scale, two-track approach, and process-focused design |
| **Agentic AI** | `agentic-ai.html` | Emerging challenges from agentic AI systems and five assessment design responses |
| **Design Strategies** | `strategies.html` | Practical assessment design strategies including approaches for large cohorts |
| **Quality Assurance** | `quality.html` | Programme-level alignment, quality processes, time investment, and institutional support |
| **Resources & Tips** | `resources.html` | Seven practical tips, the postplagiarism concept, reviewer acknowledgements, and a reading list |
| **Glossary** | `glossary.html` | 34 key terms with definitions and links back to relevant sections |

## Technology

- Pure static HTML5 and CSS3 — no JavaScript frameworks or build tools required
- CSS custom properties (design tokens) for consistent theming
- Responsive design with mobile hamburger navigation
- Print-friendly styles
- WCAG accessibility features (focus-visible, reduced motion, semantic HTML)
- SVG favicon with PNG fallbacks

## Colour Scheme

- **Primary (navy):** `#1e3a5f`
- **Accent (warm gold):** `#b8860b`
- **Track 1 (blue):** `#2563eb` — AI-restricted assessments
- **Track 2 (green):** `#16a34a` — AI-integrated assessments

## Project Structure

```
arf/
├── index.html              # Home page
├── framework.html          # Framework Overview
├── principles.html         # Core Principles
├── risk-detection.html     # Risk & Detection
├── integration.html        # AI Integration
├── agentic-ai.html         # Agentic AI
├── strategies.html         # Design Strategies
├── quality.html            # Quality Assurance
├── resources.html          # Resources & Tips
├── glossary.html           # Glossary
├── style.css               # Design system & styles
├── favicon.svg             # SVG favicon
├── favicon.png             # 32x32 PNG favicon
├── apple-touch-icon.png    # 180x180 Apple touch icon
└── images/
    ├── hazel-farrell.jpg         # Author photo
    ├── hardman-taxonomy.jpg      # Post-AI Learning Taxonomy
    ├── furze-ai-scale.jpg        # AI Assessment Scale
    ├── virmani-lau-impact.jpg    # Time/Impact chart
    └── eaton-postplagiarism.jpg  # 6 Tenets of Postplagiarism
```

## Deployment

Serve the project root as a static site. No build step is needed. Any static hosting platform will work (GitHub Pages, Netlify, Vercel, etc.).

## Author

**Dr Hazel Farrell** — Academic Lead for GenAI, SETU
- [LinkedIn](https://www.linkedin.com/in/hazelfarrell/)
- [Bluesky](https://bsky.app/profile/hazelfarrell.bsky.social)

## Licence

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).

[![CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

## Credits

HTML version developed by Ken McCarthy using Claude Code.

Many thanks to reviewers Dr Jim O'Mahony, MTU and Damien Raftery, SETU.
