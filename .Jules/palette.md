## 2025-05-15 - [Futuristic 3D Card Interaction]
**Learning:** For 'tech-heavy' futuristic designs, standard hover states can feel flat. Combining a 3D tilt effect with a mouse-following radial glow adds significant depth and 'premium' feel without compromising performance if using CSS transforms.
**Action:** Use CSS `perspective` on the container and `transform-style: preserve-3d` on the cards. Use JS to update CSS variables for cursor position to drive the glow effect.
