#!/usr/bin/env python3
"""
Patch NDS-JMU site to add FAQ section.
Run this from the repo root (where index.html lives).

Usage:
  cd ~/Desktop/ndsjmu-website
  python3 add_faq.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
index_path = HERE / "index.html"
style_path = HERE / "style.css"

if not index_path.exists():
    sys.exit(f"Cannot find {index_path}. Run this script from the repo root.")

# ==================================================================
# 1. Add FAQ link to the nav
# ==================================================================
index = index_path.read_text()

old_nav = '''      <li><a href="#projects">Projects</a></li>
      <li><a href="#sponsors">Sponsors</a></li>'''
new_nav = '''      <li><a href="#projects">Projects</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#sponsors">Sponsors</a></li>'''

if old_nav not in index:
    sys.exit("Could not find the nav block to patch. Site may already have FAQ, or file has changed.")

index = index.replace(old_nav, new_nav)

# ==================================================================
# 2. Insert the FAQ section between Leadership and Sponsors
# ==================================================================
faq_section = '''
  <!-- ============================================= -->
  <!-- 8b. FAQ SECTION                               -->
  <!-- To add a question: copy one <details> block,  -->
  <!-- update the <summary> and <p> text.            -->
  <!-- The <details>/<summary> elements are native   -->
  <!-- HTML — no JavaScript needed for the accordion.-->
  <!-- ============================================= -->
  <section id="faq" class="faq">
    <div class="container">
      <span class="section-label">// FAQ</span>
      <h2 class="section-headline">Frequently Asked</h2>
      <div class="faq-list">

        <details class="faq-item">
          <summary>What majors is this club for?</summary>
          <p>All majors. Our members study political science, international affairs, computer science, engineering, business, finance, biology, and everything in between. If you are interested in defense, intelligence, or national security, this club is for you.</p>
        </details>

        <details class="faq-item">
          <summary>Do I need any prior experience or background to join?</summary>
          <p>No. Our speaker series and general meetings are designed for anyone curious about the field, whether you have deep background knowledge or none at all.</p>
        </details>

        <details class="faq-item">
          <summary>Is there an application to join?</summary>
          <p>No application is required for general membership. Just show up. Project teams are application-based and open at the start of each semester.</p>
        </details>

        <details class="faq-item">
          <summary>What's the time commitment?</summary>
          <p>General members can attend as many or as few meetings as they want. Project team members commit to weekly participation for the semester and produce a final deliverable in December.</p>
        </details>

        <details class="faq-item">
          <summary>When and where do you meet?</summary>
          <p>Tuesdays from 5:00 to 6:15 PM in Union 400. Meetings alternate between speaker events and project team work sessions.</p>
        </details>

        <details class="faq-item">
          <summary>How do I join a project team?</summary>
          <p>Applications open during the first month of each semester and are announced at meetings and through our mailing list. Teams are multidisciplinary — we intentionally build teams that combine technical, analytical, and business perspectives.</p>
        </details>

        <details class="faq-item">
          <summary>What kinds of projects do you run?</summary>
          <p>Multidisciplinary teams working on real national security problems. Recent examples include open-source intelligence analysis, defense industry research, and hardware prototyping for detection and monitoring applications.</p>
        </details>

        <details class="faq-item">
          <summary>Is this an official JMU organization?</summary>
          <p>Yes. NDS-JMU is a recognized student organization at James Madison University, part of the national National Defense Society, with chapters at universities across the country.</p>
        </details>

        <details class="faq-item">
          <summary>How is the club funded?</summary>
          <p>Through sponsor contributions and optional member dues. All chapter financials are made publicly available at the end of each semester.</p>
        </details>

        <details class="faq-item">
          <summary>How can my company sponsor or partner with the club?</summary>
          <p>We welcome sponsorship inquiries. Sponsors support our speaker series, project teams, and end-of-semester programming, and can also sponsor individual project teams focused on problems their organization cares about. Reach out through the Sponsors section below.</p>
        </details>

      </div>
    </div>
  </section>

'''

# Insert before the Sponsors section marker
sponsors_marker = '''  <!-- ============================================= -->
  <!-- 9. SPONSORS SECTION                           -->'''

if sponsors_marker not in index:
    sys.exit("Could not find the Sponsors section marker.")

index = index.replace(sponsors_marker, faq_section + sponsors_marker)

index_path.write_text(index)
print(f"Updated {index_path}")

# ==================================================================
# 3. Add FAQ styles to style.css
# ==================================================================
style = style_path.read_text()

faq_css = '''
/* =====================================================
   11b. FAQ
   ===================================================== */
.faq { background: var(--white); border-top: 1px solid var(--line); }

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 820px;
}

.faq-item {
  border: 1px solid var(--line);
  background: var(--white);
  padding: 0;
}

.faq-item summary {
  cursor: pointer;
  padding: 20px 24px;
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 600;
  color: var(--navy);
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

/* Remove default browser triangle */
.faq-item summary::-webkit-details-marker { display: none; }

/* Custom "+" / "−" indicator */
.faq-item summary::after {
  content: "+";
  font-family: var(--font-mono);
  font-size: 22px;
  color: var(--accent);
  transition: transform 0.2s;
}
.faq-item[open] summary::after { content: "−"; }

.faq-item summary:hover { background: var(--light); }

.faq-item p {
  padding: 0 24px 22px;
  color: var(--ink);
  font-size: 15.5px;
  line-height: 1.6;
  max-width: 68ch;
}

'''

# Insert before Sponsors CSS section
sponsors_css_marker = '''/* =====================================================
   12. SPONSORS
   ===================================================== */'''

if sponsors_css_marker not in style:
    sys.exit("Could not find the Sponsors CSS marker in style.css.")

style = style.replace(sponsors_css_marker, faq_css + sponsors_css_marker)

style_path.write_text(style)
print(f"Updated {style_path}")

print("\nDone. Next steps:")
print("  1. Open index.html in your browser to preview the FAQ.")
print("  2. git add . && git commit -m 'Add FAQ section' && git push")
print("  3. Vercel redeploys in about a minute.")
