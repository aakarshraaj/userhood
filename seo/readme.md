# SEO Documentation for Userhood

## Overview
This directory contains SEO-related files and documentation for the Userhood website.

## Files

### keywords.json
Contains the comprehensive keyword strategy organized by:
- **brand_location**: Local Pune keywords and geo-targeted terms
- **services_india**: India-wide service keywords  
- **industry_verticals**: Industry-specific keywords (SaaS, Fintech, Healthcare, EdTech)
- **informational**: Question-based and educational keywords
- **global_outsourcing**: Keywords for international clients
- **page_mapping**: Mapping of specific keywords to pages

## SEO Implementation Guidelines

### Meta Tags
- **Title**: 55-60 characters including primary keyword + location where relevant
- **Description**: 145-160 characters with compelling copy and keywords
- **H1**: Include primary keyword naturally while maintaining readability

### Content Requirements
- **Service pages**: 700-1200 words minimum
- **Location pages**: 500-800 words minimum
- **Blog posts**: 1200+ words minimum

### Internal Linking Strategy
- Every page links up (parent), across (siblings), and down (deeper content)
- Use descriptive anchor text with keywords
- Add "Related services" blocks on service pages

### Structured Data
All pages should include appropriate JSON-LD:
- Organization/LocalBusiness (global)
- Service schema (service pages)
- BreadcrumbList (all pages)
- FAQPage (pages with FAQ sections)
- Article (blog posts)

### Image Optimization
- Use WebP format with fallbacks
- Include width/height attributes
- Add descriptive alt text
- Compress images appropriately

### Performance
- Lazy load images below the fold
- Preload critical fonts
- Use font-display: swap
- Minimize and compress CSS/JS

## Search Console Setup Checklist
- [ ] Add Google Search Console property
- [ ] Add Bing Webmaster Tools property  
- [ ] Submit sitemap.xml
- [ ] Monitor crawl errors
- [ ] Set up performance alerts

## Content Calendar
- [ ] Publish 1-2 blog posts monthly
- [ ] Update case studies quarterly
- [ ] Review and update service page content bi-annually
- [ ] Update local business information as needed

## Analytics Events to Track
- contact_form_submit
- phone_click  
- email_click
- whatsapp_click
- book_call_click
- file_download (case studies, PDFs)

## Local SEO Checklist
- [ ] Claim and optimize Google Business Profile
- [ ] Ensure NAP consistency across all pages
- [ ] Add local business schema markup
- [ ] Include driving directions to major tech hubs
- [ ] Collect and display customer reviews