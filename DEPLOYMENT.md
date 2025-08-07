# Deployment Guide - Assetcore Engineering Website

This guide will help you deploy the luxury Assetcore Engineering landing page to various hosting platforms.

## 🚀 Quick Deployment Checklist

Before deploying, ensure you have:

- [ ] All required assets in the `/assets` folder (see `assets/assets-guide.md`)
- [ ] Updated contact information in `index.html`
- [ ] Customized content for your specific projects and team
- [ ] Tested the website locally in multiple browsers
- [ ] Optimized all images for web performance
- [ ] Verified all links and forms work correctly

## 🌐 Hosting Platforms

### 1. Netlify (Recommended for ease)

**Steps:**
1. Create a [Netlify account](https://netlify.com)
2. Drag and drop your entire project folder to Netlify dashboard
3. Configure custom domain (optional)
4. Enable form handling for contact form

**Netlify Form Setup:**
Add `netlify` attribute to your contact form:
```html
<form class="contact-form" netlify data-netlify="true" name="contact">
```

### 2. Vercel

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to your project folder
3. Run `vercel` and follow the prompts
4. Connect your custom domain

### 3. GitHub Pages

**Steps:**
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to repository Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 4. Traditional Web Hosting (cPanel/FTP)

**Steps:**
1. Connect to your web hosting via FTP client (FileZilla, WinSCP)
2. Upload all files to your domain's public_html folder
3. Ensure `index.html` is in the root directory
4. Set appropriate file permissions (644 for files, 755 for folders)

## 📧 Contact Form Configuration

### For Static Hosting (Netlify/Vercel)
The form is already configured for Netlify. For other platforms, you may need:

### PHP Backend (Traditional Hosting)
Create `contact-handler.php`:
```php
<?php
if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $message = $_POST['message'];
    
    $to = "info@assetcore.co.zw";
    $subject = "New Contact Form Submission";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Company: $company\n";
    $body .= "Message: $message\n";
    
    mail($to, $subject, $body);
    
    echo json_encode(['success' => true]);
}
?>
```

Update the form action in JavaScript:
```javascript
// In script.js, update the form submission
fetch('contact-handler.php', {
    method: 'POST',
    body: formData
})
```

## 🔧 Domain Configuration

### Custom Domain Setup
1. **Purchase Domain**: Register `assetcore.co.zw` or your preferred domain
2. **DNS Configuration**: Point your domain to your hosting provider
3. **SSL Certificate**: Enable HTTPS (most platforms provide free SSL)

### DNS Records Example
```
Type    Name    Value                   TTL
A       @       192.168.1.100          3600
CNAME   www     assetcore.co.zw.       3600
```

## 📈 Performance Optimization

### Before Going Live
1. **Compress Images**: Use TinyPNG or similar tools
2. **Minimize CSS/JS**: Use online minifiers
3. **Enable Gzip**: Configure server compression
4. **Set Cache Headers**: Configure browser caching

### .htaccess Configuration (Apache Servers)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🛡️ Security Considerations

### Basic Security Headers
Add to your `.htaccess` or server configuration:
```apache
# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;"
```

### Contact Form Security
- Implement CAPTCHA for production
- Validate all inputs server-side
- Limit form submission rate
- Use HTTPS for all communications

## 📊 Analytics & Monitoring

### Google Analytics Setup
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Verify domain ownership
2. Submit sitemap.xml
3. Monitor search performance

## 🔍 SEO Optimization

### Essential Meta Tags
Already included in the HTML:
- Title tag
- Meta description
- Viewport meta tag
- Open Graph tags for social sharing

### Sitemap.xml
Create and submit:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.assetcore.co.zw/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 📱 Testing Checklist

Before going live, test:

### Functionality
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] All animations load properly
- [ ] Videos play correctly
- [ ] Images load on all devices

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] Mobile performance is acceptable

### Compatibility
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Edge (desktop)

### Responsiveness
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

## 🚨 Common Issues & Solutions

### Issue: Videos don't autoplay on mobile
**Solution**: Ensure video has `muted`, `playsinline`, and `autoplay` attributes

### Issue: Animations don't work
**Solution**: Check that AOS library is loading correctly

### Issue: Contact form doesn't submit
**Solution**: Configure backend processing or use Netlify forms

### Issue: Images load slowly
**Solution**: Optimize image sizes and use WebP format where possible

## 📞 Support

For deployment assistance:
- **Email**: info@assetcore.co.zw
- **Phone**: +263 78 428 8310

## 📋 Post-Deployment Tasks

After successful deployment:
1. Test all functionality in production environment
2. Set up monitoring and analytics
3. Configure automatic backups
4. Monitor site performance
5. Submit sitemap to search engines
6. Update business listings with new website
7. Test contact form and ensure emails are received

---

**Congratulations!** Your luxury Assetcore Engineering website is now live and ready to showcase your engineering excellence to the world.