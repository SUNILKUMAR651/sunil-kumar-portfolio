# 🚀 Sunil's Portfolio Website

A stunning, modern personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools needed.

## 📁 File Structure

```
sunil app/
├── index.html              # Main HTML entry point
├── css/
│   ├── style.css           # Core styles, theme, components
│   ├── animations.css      # Keyframes & animation utilities
│   └── responsive.css      # Responsive breakpoints
├── js/
│   └── main.js             # All JavaScript logic
└── README.md               # This file
```

## ✨ Features

| Feature | Description |
|---|---|
| 🖱️ Custom Cursor | Smooth animated cursor with hover effects |
| ✨ Particle System | Interactive canvas particle background |
| ⌨️ Typewriter Effect | Rotating animated text in hero section |
| 📊 Animated Counters | Stats count up on scroll into view |
| 🔥 Skill Bars | Animated progress bars per skill |
| 🗂️ Skills Tabs | Switch between Frontend / Backend / Tools |
| 🔍 Project Filter | Filter projects by category |
| 👁️ Scroll Reveal | Elements animate as they enter viewport |
| 📱 Fully Responsive | Works on all screen sizes |
| 📝 Contact Form | Working form with success feedback |
| 🌙 Dark Theme | Premium dark mode throughout |

## 🎨 Design System

### Color Palette
- **Primary:** `#6C63FF` (Indigo/Purple)
- **Accent:** `#3ECFCF` (Cyan/Teal)
- **Accent 2:** `#FF6B9D` (Pink)
- **Background:** `#080B14` (Deep Navy)
- **Card BG:** `#0E1320`
- **Text:** `#E8EAF0`
- **Muted:** `#8892A4`

### Typography
- **Heading Font:** [Outfit](https://fonts.google.com/specimen/Outfit) — Bold, modern
- **Mono Font:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Logo & code

## 🚀 How to Run

Simply open `index.html` in any modern browser:

```bash
# Option 1: Direct open
start index.html

# Option 2: Using Python's HTTP server
python -m http.server 8080
# Then visit http://localhost:8080

# Option 3: Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

## ✏️ Customization

### Personal Info
Update these in `index.html`:
- Name: Search for `Sunil` and replace
- Email: `sunil@email.com`
- Phone: `+91 98765 43210`
- Location: `India`

### Profile Photo
Replace the `.about-avatar` div with your actual image:
```html
<img src="img/photo.jpg" alt="Sunil" class="about-photo" />
```

### Projects
Add/edit project cards in the `#projects` section. Each card has:
- `data-category="web|app|ai"` — for filtering
- Gradient background color
- Project title, description, tags, and links

### Skills
Update skill percentages using `--pct` CSS variable:
```html
<div class="skill-fill" style="--pct:90%"></div>
```

## 📦 Dependencies (CDN — no install needed)
- [Font Awesome 6.5](https://fontawesome.com/) — Icons
- [Google Fonts](https://fonts.google.com/) — Outfit & JetBrains Mono

---

Made with ❤️ by **Sunil** | 2026
