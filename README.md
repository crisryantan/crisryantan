# Personal Portfolio Website

A clean, minimalist personal portfolio website built with Gatsby, React, and Tailwind CSS. Inspired by modern portfolio designs with a focus on readability, accessibility, and performance.

## 🚀 Features

- **Clean, Minimalist Design**: Professional layout with thoughtful typography and spacing
- **Fully Responsive**: Looks great on all devices from mobile to desktop
- **Fast Performance**: Built with Gatsby for optimal loading speeds
- **SEO Optimized**: Includes meta tags, structured data, and sitemap
- **Accessible**: WCAG compliant with proper focus states and ARIA labels
- **Dark Mode Ready**: Easily extendable to support dark mode
- **Blog Ready**: Includes blog listing and post templates

## 🎨 Design System

### Color Palette

The site uses a carefully curated color palette defined in `tailwind.config.js`:

```javascript
colors: {
  blitz: {
    primary: '#0A2540',  // deep navy
    accent: '#18FFFF',   // electric cyan
    soft: '#00BFA5',     // teal
    coral: '#FF6F61',    // coral accent
    sand: '#F5F5DC',     // warm neutral background
    charcoal: '#222831', // deep text
    lavender: '#A39DCE', // highlight/divider
  }
}
```

### Typography

- **Font Family**: Inter (sans-serif), Fira Code (monospace)
- **Font Sizes**: Responsive scale from text-sm to text-7xl
- **Font Weights**: 300-900 for versatile hierarchy

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.js       # Main layout with navigation and footer
│   ├── Hero.js         # Hero section component
│   └── SEO.js          # SEO component for meta tags
├── pages/
│   ├── index.js        # Homepage with all sections
│   ├── 404.js          # Custom 404 page
│   └── blog/           # Individual blog posts
│       ├── scalable-react.js
│       ├── future-web-dev.js
│       └── web-performance.js
├── styles/
│   └── global.css      # Global styles and Tailwind imports
├── templates/
│   └── blog-post.js    # Blog post template
└── assets/
    └── images/         # Static images (avatar, website-icon)
```

## 🛠️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run develop
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Deploy to Netlify**
   ```bash
   # Manual deploy with Netlify CLI
   netlify deploy --prod --dir=public
   ```

## 📝 Customization Guide

### 1. Personal Information

Update your personal information in `src/pages/index.js`:

```javascript
// Update the Hero section content
<h1>Hi, I'm <span className="gradient-text">Your Name</span></h1>
<p>Your professional tagline here</p>

// Update About section
<p>Your bio and background information...</p>
```

### 2. Navigation Links

Edit navigation links in `src/components/Layout.js`:

```javascript
const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/#contact' },
]
```

### 3. Social Links

Update social media links in `src/components/Layout.js`:

```javascript
const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yourusername' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', href: 'https://twitter.com/yourusername' },
  { name: 'Email', href: 'mailto:your@email.com' },
]
```

### 4. Blog Posts

The blog posts are located in `src/pages/blog/` directory. Each blog post is a separate React component. You can add new blog posts by creating new files in this directory or updating the blog post data in `src/pages/index.js`.

### 5. Experience

Update your work experience in `src/pages/index.js`:

```javascript
const experiences = [
  {
    id: 1,
    role: 'Your Role',
    company: 'Company Name',
    period: '2020 - Present',
    description: 'Role description',
    highlights: ['Achievement 1', 'Achievement 2'],
  },
]
```

### 6. Blog Configuration

The blog posts are defined in the `blogPosts` array in `src/pages/index.js`:

```javascript
const blogPosts = [
  {
    id: 1,
    title: 'Blog Post Title',
    excerpt: 'Brief description',
    date: 'March 15, 2024',
    readTime: '5 min read',
    link: '/blog/post-slug',
  },
]
```

### 7. Site Metadata

Update SEO metadata in `gatsby-config.js`:

```javascript
siteMetadata: {
  title: 'Your Name - Portfolio',
  description: 'Your professional description',
  author: 'Your Name',
  siteUrl: 'https://yourwebsite.com',
  twitterUsername: '@yourusername',
}
```

## 🎨 Styling Customization

### Colors

To change the color scheme, update `tailwind.config.js`:

```javascript
colors: {
  blitz: {
    primary: '#YOUR_COLOR',
    accent: '#YOUR_COLOR',
    // ... other colors
  }
}
```

### Fonts

To change fonts, update the Google Fonts import in `src/styles/global.css` and the font family in `tailwind.config.js`.

### Components

All components use Tailwind utility classes. Key component styles are defined in `src/styles/global.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.card` - Card container style
- `.badge` - Badge/tag style

## 📱 Responsive Design

The site uses Tailwind's responsive utilities:

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## ♿ Accessibility

- All interactive elements have proper focus states
- Images include alt text
- Proper heading hierarchy
- ARIA labels for icon buttons
- Keyboard navigation support

## 🚀 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `gatsby build`
4. Set publish directory: `public`
5. Deploy!

### Environment Variables

Create a `.env` file for any API keys or sensitive data:

```
GATSBY_API_KEY=your_api_key
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Gatsby, React, and Tailwind CSS
