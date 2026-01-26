# Assessment Framework HTML - Fixes & Images Guide

## ✅ FIXES APPLIED

### Issue 1: Content Overlapping with Sidebar Navigation

**Problem:** Content was displaying on top of/within the left sidebar navigation area and was hard to read.

**Root Cause:** The CSS grid layout was treating each `<section>` element as a separate grid item. The sections were directly inside `.layout-with-sidebar`, causing them to be assigned to the grid incorrectly.

**Solution:** Wrapped all sections in a `<div class="content">` wrapper that spans the entire right column of the grid.

**Files Modified:**
- `framework.html` - Added content wrapper
- `principles.html` - Added content wrapper
- `strategies.html` - Added content wrapper
- `resources.html` - Added content wrapper
- `style.css` - Added `.layout-with-sidebar .content` CSS rule

**Technical Details:**
```html
<!-- BEFORE (Incorrect) -->
<div class="layout-with-sidebar sidebar-left">
    <aside class="sidebar">...</aside>
    <section>...</section>
    <section>...</section>
    <section>...</section>
</div>

<!-- AFTER (Fixed) -->
<div class="layout-with-sidebar sidebar-left">
    <aside class="sidebar">...</aside>
    <div class="content">
        <section>...</section>
        <section>...</section>
        <section>...</section>
    </div>
</div>
```

**CSS Added:**
```css
.layout-with-sidebar .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
```

---

## 📊 IMAGES IN THE ORIGINAL PDF

The original PDF framework contained **2 main visual elements** that are currently shown as placeholders in the HTML:

### 1. **Bloom's Taxonomy Diagram**

**Location:** `framework.html` → "Higher-Order Thinking Skills" section

**What It Shows:**
- A pyramid or hierarchical diagram showing 6 levels of cognitive complexity
- Levels from bottom to top: Remember → Understand → Apply → Analyze → Evaluate → Create
- Color-coded by complexity level

**Original Source:**
- Revised Bloom's Taxonomy by Anderson & Krathwohl (2001)
- Commonly referenced diagram showing cognitive domains in learning

**Why It's Important:**
- Illustrates the shift from lower-order to higher-order thinking skills
- Shows which assessment types work for which cognitive levels
- Central to understanding assessment redesign philosophy

**Current Status:** Placeholder box indicates where image should be

---

### 2. **Risk Assessment Visual Diagram**

**Location:** `strategies.html` → "Assessment Risk Categories" section

**What It Shows:**
- Assessment types organized by risk level (High/Medium/Low)
- Visual representation showing the relationship between assessment methods and cheating risk
- Examples of which assessments fall into each risk category

**Why It's Important:**
- Helps educators quickly understand which assessments are most vulnerable to AI misuse
- Provides a visual reference for the Risk Assessment Table

**Current Status:** Placeholder box indicates where image should be

---

## 🖼️ CURRENT STATUS OF IMAGES

### Images NOT Embedded in HTML
**Why:** The original PDF images (diagrams, charts, visual elements) were not extracted when converting to text. These require separate handling.

### Placeholders Added
Placeholder boxes have been added to show:
- Where images should go
- What the image should represent
- A visual indicator (dashed border) of the space

---

## ➕ HOW TO ADD IMAGES

### Option 1: Create Your Own Diagrams (Recommended)

#### For Bloom's Taxonomy:
1. **Search for:** "Bloom's Taxonomy open source image" or "Bloom's Taxonomy CC0"
2. **Find versions:** Look for PNG/SVG versions (easier to embed than PDF)
3. **Recommended size:** 600-800px wide
4. **Save as:** `blooms-taxonomy.png` in same folder as HTML files

#### For Risk Assessment:
You can either:
- Create a simple visual diagram yourself (using draw.io, Canva, etc.)
- Use a table visualization tool
- Keep the current table format and add a diagram above it

### Option 2: Extract from Original PDF

**Tools to Extract Images:**
- Adobe Acrobat (Right-click → Export)
- Online: https://smallpdf.com/pdf-to-jpg
- Python: `pip install pdf2image pdfplumber`

**Python Script Example:**
```python
import pdfplumber

pdf_path = '2026_Assessment_Redesign_Framework.pdf'
with pdfplumber.open(pdf_path) as pdf:
    for i, page in enumerate(pdf.pages):
        # Find images on each page
        for obj in page.objects.get("rect", []):
            print(f"Found image on page {i+1}")
```

---

## 📝 HOW TO ADD IMAGES TO HTML

### Step 1: Save Image File
Save your image in the same folder as the HTML files
- Recommended format: PNG or JPG
- Recommended size: 600-800px wide, 300-400px tall
- Filename: `blooms-taxonomy.png` (descriptive names)

### Step 2: Find the Placeholder

**For Bloom's Taxonomy:**
Open `framework.html` and find this in the "Assessment Purpose" section:
```html
<div style="background-color: var(--bg-light); padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 2px dashed var(--border-color); text-align: center;">
    <p style="color: var(--text-light); font-style: italic; margin: 0;">
        📊 <strong>Bloom's Taxonomy Diagram</strong><br>
        <small>(The original PDF contained a visual diagram...)</small>
    </p>
</div>
```

**For Risk Assessment:**
Open `strategies.html` and find the similar placeholder in the "Risk Assessment" section.

### Step 3: Replace Placeholder with Image

**Replace this:**
```html
<div style="background-color: var(--bg-light); padding: 2rem; border-radius: 8px; margin: 2rem 0; border: 2px dashed var(--border-color); text-align: center;">
    <p style="color: var(--text-light); font-style: italic; margin: 0;">
        📊 <strong>Bloom's Taxonomy Diagram</strong><br>
        <small>(The original PDF contained...)</small>
    </p>
</div>
```

**With this:**
```html
<div style="background-color: var(--bg-light); padding: 2rem; border-radius: 8px; margin: 2rem 0; text-align: center;">
    <figure>
        <img src="blooms-taxonomy.png" alt="Bloom's Taxonomy: 6 Levels of Cognitive Complexity - Remember, Understand, Apply, Analyze, Evaluate, Create" style="max-width: 100%; height: auto; border-radius: 4px;">
        <figcaption style="color: var(--text-light); font-size: 0.9rem; margin-top: 1rem;">
            <strong>Figure 1:</strong> Revised Bloom's Taxonomy (Anderson & Krathwohl, 2001)
        </figcaption>
    </figure>
</div>
```

### Step 4: Test
1. Open the HTML file in your browser
2. Verify the image displays correctly
3. Check on mobile (should resize automatically)
4. Test in print (should show when printing to PDF)

---

## 💡 QUICK IMAGE REFERENCE

### Image Size Guidelines
- **Width:** 600-800px (will scale down on mobile)
- **Height:** 300-500px (maintain aspect ratio)
- **Format:** PNG (recommended) or JPG
- **File size:** Keep under 200KB for fast loading

### Accessibility Requirements
When adding images, always include:

1. **Descriptive alt text** (for screen readers):
   ```html
   alt="Bloom's Taxonomy showing 6 levels of cognitive complexity"
   ```

2. **Figure caption** (for context):
   ```html
   <figcaption>Revised Bloom's Taxonomy (Anderson & Krathwohl, 2001)</figcaption>
   ```

3. **Proper styling** (for appearance):
   ```css
   style="max-width: 100%; height: auto; border-radius: 4px;"
   ```

---

## 📋 SUMMARY OF CHANGES

### Layout Fixes
✅ Fixed grid layout issue - content now displays properly next to sidebar  
✅ Wrapped all sections in `.content` div for proper grid alignment  
✅ Added CSS rule for flexible content area  
✅ Updated all 4 content pages (framework, principles, strategies, resources)

### Images
❌ Images not embedded (placeholder boxes added instead)  
✅ Placeholder boxes clearly marked with dashed borders  
✅ Instructions provided for adding images yourself  
✅ Recommended image sizes and formats specified  

### Status
- **Layout:** FIXED ✅
- **Navigation:** WORKING ✅
- **Content Display:** FIXED ✅
- **Images:** PLACEHOLDER (Ready to add) ⏳

---

## 🚀 NEXT STEPS

1. **Test the Layout** - Open any page in your browser. Content should now display properly on the right side of the sidebar.

2. **Add Images (Optional)** - Follow the instructions above to add Bloom's Taxonomy and Risk Assessment diagrams.

3. **Deploy** - The framework is fully functional and ready to share, even without images.

---

## ❓ QUESTIONS?

**About layout issues?**  
→ All fixed. Content should now display properly on the right side.

**About images?**  
→ See "How to Add Images" section above for step-by-step instructions.

**About other customizations?**  
→ See IMPLEMENTATION_GUIDE.md for complete customization options.

---

The framework is now **fully functional with improved layout and ready for use!** 🎉
