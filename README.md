# macOS Portfolio

An interactive, macOS-inspired portfolio built with React and Vite. Explore a browser-based desktop with draggable app windows, a Dock, a menu bar, animated wallpapers, and portfolio content presented through familiar desktop-style apps.

<p align="center">
  <a href="https://umerjamshaid.github.io/Mac_OS_Portfolio/"><strong>Open the live demo</strong></a>
</p>

<p align="center">
  <img src="public/ScreenShots/Demo.gif" alt="Preview of the macOS Portfolio desktop" width="850" />
</p>

## Overview

Rather than presenting projects on a conventional landing page, this project turns a portfolio into a small interactive desktop environment. Open apps from the Dock, move windows around, and explore projects and profile information through the interface.

## Features

### Desktop experience
- **macOS-inspired desktop** with wallpaper, menu bar, Dock, and window controls.
- **Draggable and focusable windows** with shared window state.
- **Dock interactions** for opening portfolio apps.
- **Desktop context menu** and visual desktop effects.
- **Welcome animation** powered by GSAP.

### Built-in apps and tools
- **Finder** — browse the portfolio's virtual file system and nested content.
- **Safari-style browser** — view project and portfolio content.
- **Terminal** — explore developer information in a terminal-inspired interface.
- **Resume viewer** — render a PDF resume using React PDF.
- **Contact** — view profile/contact information and social links.
- **Photos and image viewer** — explore images in dedicated windows.
- **Text viewer** — read portfolio content in a native-style window.
- **Spotlight** — search and quickly access portfolio content.
- **Settings and Control Center** — interact with desktop settings and controls.
- **Notifications and Spotify player** — additional desktop-style widgets.
- **Lock screen** — a macOS-inspired lock-screen experience.
- **Mobile app launcher** — a dedicated entry point for smaller-screen layouts.
- **Optional admin panel UI** — opened with Ctrl + Shift + A (Windows/Linux) or Cmd + Shift + A (macOS).

> **Security note:** The admin panel is a client-side demo, not a secure authentication boundary. Do not put secrets or sensitive data in it; client-side checks can be inspected or bypassed.

## Tech stack

| Technology | Role |
| --- | --- |
| React 19 | UI components |
| Vite 8 | Development server and production bundling |
| Tailwind CSS 4 | Styling |
| GSAP | Animations and draggable interactions |
| Zustand | Shared application/window state |
| Immer | Immutable state updates |
| React PDF | PDF resume rendering |
| Day.js | Date/time formatting |
| Lucide React | Interface icons |

## Getting started

### Requirements

- Node.js compatible with the installed Vite version (Node.js 20.19+ or 22.12+ is recommended for Vite 8).
- npm.

### Install and run

~~~bash
git clone https://github.com/bano-qabil123/Mac_OS_Portfolio.git
cd Mac_OS_Portfolio
npm install
npm run dev
~~~

Vite prints the local development URL in the terminal (typically http://localhost:5173).

### Production build

~~~bash
npm run build
npm run preview
~~~

### Lint

~~~bash
npm run lint
~~~

## How to explore

1. Launch the site and wait for the desktop/welcome experience to appear.
2. Select icons in the Dock or menu bar to open apps.
3. Drag a window by its title bar and select it to bring it into focus.
4. Open Finder to browse project and profile content.
5. Open the Resume, Contact, Terminal, Photos, and other apps to explore the portfolio.
6. Try Spotlight and the desktop context menu to discover additional interactions.
7. On desktop, use Ctrl/Cmd + Shift + A to toggle the optional admin-panel demo.

## Project structure

~~~text
src/
├── components/   # Desktop shell, Dock, menu bar, wallpaper, effects and controls
├── windows/      # Individual app windows (Finder, Terminal, Resume, Photos, etc.)
├── constants/    # App definitions, portfolio data, links and virtual file-system data
├── hoc/          # Shared window behavior, including dragging and focus
├── store/        # Zustand state for windows and desktop interactions
├── App.jsx       # Main desktop composition
└── main.jsx      # React entry point

public/
├── files/        # Static files such as the resume
├── icons/        # UI icons
├── images/       # Wallpapers and portfolio images
└── ScreenShots/  # Screenshots and demo media
~~~

## Roadmap

These are improvement ideas, not claims that the features already exist:

- [ ] **Mission Control** — overview of open windows and quick window switching.
- [ ] **Window snapping and tiling** — snap windows to screen edges and arrange them in layouts.
- [ ] **Recruiter mode** — a fast, simplified view of projects, skills, resume, and contact details.
- [ ] **Project case studies** — add architecture diagrams, challenges, outcomes, and links to live demos/source.
- [ ] **Performance pass** — audit large animated wallpapers and lazy-load media where practical.
- [ ] **Real contact delivery** — connect any contact submission flow to a backend or trusted email service and show success only after delivery is confirmed.
- [ ] **Accessibility pass** — keyboard navigation, visible focus, reduced-motion support, and improved small-screen usability.
- [ ] **Automated checks** — add interaction and accessibility tests for key desktop flows.
- [ ] **Documentation and demo refresh** — keep screenshots, feature descriptions, and deployment instructions aligned with the current app.

## Known limitations and maintenance notes

- The desktop metaphor is designed primarily for larger screens; verify every interaction on mobile and touch devices rather than assuming desktop behavior translates directly.
- Large animated image assets can increase repository size and page-load cost. Consider video formats with poster images, optimized WebP/AVIF images, and lazy loading where suitable.
- Review the URLs in the portfolio data before publishing so social profiles, project repositories, and demo links point to the intended destinations.
- Confirm that the live demo URL and deployment configuration match the repository's current owner and hosting setup.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: feat/your-feature.
3. Install dependencies and run npm run dev.
4. Make and test your changes; run npm run lint and npm run build.
5. Commit your work and push the branch.
6. Open a pull request describing the change and how you tested it.

For larger changes, consider opening an issue first to discuss the approach.

## License

This project is distributed under the MIT License. See LICENSE for details.

## Author

**Umer Jamshaid**

- [GitHub profile](https://github.com/Umerjamshaid)
- [Portfolio demo](https://umerjamshaid.github.io/Mac_OS_Portfolio/)
- [LinkedIn](<YOUR_LINKEDIN_URL_HERE>)

---

If you find the project interesting, consider giving the repository a star.
