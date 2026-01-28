# Professional Software Engineer Portfolio

This is a complete, professional portfolio website designed for a Software Engineer with full mobile responsiveness and user-friendly features.

## Features
- **Modern Dark Theme**: Professional and sleek design with light mode support
- **Mobile Responsive**: Fully optimized for mobile, tablet, and desktop devices
- **Touch-Friendly**: Large touch targets (48px minimum), optimized input fields
- **Accessibility**: Keyboard navigation, focus states, ARIA labels, reduced motion support
- **Interactive Elements**: Typing text effect, scroll animations, smooth transitions
- **Sections Included**:
  - Hero (Introduction)
  - Education
  - Certifications
  - Featured Projects
  - Technical Skills
  - Contact Form
  - Footer

## Mobile & UX Features
### Mobile Optimizations
- ✅ **Responsive Design**: Adapts to all screen sizes (360px - 2K+)
- ✅ **Touch Optimized**: Minimum 48px touch targets for easy mobile interaction
- ✅ **Mobile Menu**: Hamburger menu that closes automatically after navigation
- ✅ **Haptic Feedback**: Vibration on button clicks (where supported)
- ✅ **Prevented Zoom**: Form inputs stay at optimal size without iOS zoom
- ✅ **Orientation Support**: Works in both portrait and landscape
- ✅ **Smooth Scrolling**: Native smooth scroll with momentum on mobile
- ✅ **Viewport Height Fix**: Handles mobile browser address bar correctly

### Accessibility Features
- ✅ **Keyboard Navigation**: Fully navigable with Tab and Enter keys
- ✅ **Focus Indicators**: Clear focus states for all interactive elements
- ✅ **Color Contrast**: WCAG compliant contrast ratios
- ✅ **Semantic HTML**: Proper heading hierarchy and structure
- ✅ **ARIA Labels**: Screen reader friendly
- ✅ **Reduced Motion**: Respects user's motion preferences
- ✅ **Form Labels**: Associated labels for all form inputs
- ✅ **Print Friendly**: Optimized print stylesheet

### User Experience
- ✅ **Fast Loading**: Optimized CSS and JavaScript
- ✅ **Smooth Animations**: 60fps transitions and animations
- ✅ **Form Feedback**: Clear success/error notifications
- ✅ **Dark/Light Mode**: Toggle between themes
- ✅ **Consistent Spacing**: Proper margins and padding throughout
- ✅ **Clear Typography**: Readable font sizes at all breakpoints
- ✅ **Helpful Placeholders**: Form inputs with descriptive placeholders

## How to Use
1. **Open the Website**: Simply double-click `index.html` to view it in your browser.
2. **Customize Content**:
   - Open `index.html` in a text editor (VS Code recommended).
   - Replace "Ramesh Priyankara" with your name.
   - Update the education, certifications, and projects sections.
   - Update contact email and phone number.
3. **For Local Email**: Use Live Server (VS Code extension) to enable email functionality.

## Files Structure
- `index.html`: Main HTML structure with all content sections
- `styles.css`: Core styling and desktop responsive design
- `styles-mobile-enhancements.css`: Additional mobile and accessibility improvements
- `script.js`: Interactive features, animations, and email handling
- `script-mobile.js`: Mobile-specific enhancements and optimizations
- `README.md`: Documentation (this file)

## Responsive Breakpoints
- **Extra Small (≤360px)**: Compact optimization for old devices
- **Mobile (≤480px)**: Small phones
- **Tablet (≤768px)**: Tablets and medium devices
- **Desktop (>768px)**: Desktop and large screens
- **Large Desktop (>1024px)**: Ultra-wide displays

## Customization Guide

### Colors
Edit the CSS variables at the top of `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Main color */
    --secondary-color: #ec4899;    /* Accent color */
    --accent-color: #14b8a6;       /* Tertiary color */
}
```

### Fonts
Change font families in `styles.css`:
```css
--font-primary: 'Inter', sans-serif;    /* Body text */
--font-display: 'Outfit', sans-serif;   /* Headings */
```

### Email Configuration
Edit EmailJS credentials in `index.html`:
1. Get your keys from https://dashboard.emailjs.com
2. Update in the `<script>` tag in `index.html`
3. Update form `data-emailjs-*` attributes

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips
- Use images optimized to web size
- Consider lazy loading for below-the-fold images
- Test on actual mobile devices
- Use Lighthouse for performance audits

## Testing Checklist
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPad (tablet)
- [ ] Test on Android phone
- [ ] Test dark/light mode toggle
- [ ] Test mobile menu open/close
- [ ] Test form submission
- [ ] Test all external links
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Check Google PageSpeed Insights
- [ ] Verify mobile friendly in Google Search Console
