import re

with open('/home/smilee/epicom-sec/style.css', 'r') as f:
    content = f.read()

# Replace root variables
new_root = """:root {
  --bg: #0A192F;
  --bg2: #112240;
  --bg3: #233554;
  --red: #FFFFFF;
  --red-light: #F0F4F8;
  --red-dark: #CCD6F6;
  --white: #FFFFFF;
  --grey: #8892b0;
  --grey-light: #a8b2d1;
  --border: rgba(255,255,255,0.1);
  --font-head: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
}"""
content = re.sub(r':root\s*\{[^}]+\}', new_root, content)

# 2. loader background
content = content.replace('#loader {\n  position: fixed; inset: 0;\n  background: #000;', '#loader {\n  position: fixed; inset: 0;\n  background: var(--bg);')

# 3. nav-cta hover
content = content.replace('.nav-cta:hover { background: var(--red); color: var(--white); }', '.nav-cta:hover { background: var(--red); color: var(--bg); }')

# 4. cart-badge color
content = content.replace('.cart-badge {\n  position: absolute;\n  top: 0px;\n  right: -2px;\n  background: var(--red);\n  color: var(--white);', '.cart-badge {\n  position: absolute;\n  top: 0px;\n  right: -2px;\n  background: var(--red);\n  color: var(--bg);')

# 5. mobile-menu bg
content = content.replace('.mobile-menu {\n  display: none;\n  position: fixed; top: 0; left: 0; right: 0; bottom: 0;\n  background: #000;', '.mobile-menu {\n  display: none;\n  position: fixed; top: 0; left: 0; right: 0; bottom: 0;\n  background: var(--bg);')

# 6. enquiry-submit-btn
content = content.replace('.enquiry-submit-btn {\n  background: var(--red);\n  color: var(--white);', '.enquiry-submit-btn {\n  background: var(--red);\n  color: var(--bg);')

# 7. btn-primary
content = content.replace('.btn-primary {\n  display: inline-flex; align-items: center; gap: 0.5rem;\n  background: var(--red);\n  color: var(--white);', '.btn-primary {\n  display: inline-flex; align-items: center; gap: 0.5rem;\n  background: var(--red);\n  color: var(--bg);')

# 8. ceo-badge text
content = content.replace('.badge-title { display: block; font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--white); }', '.badge-title { display: block; font-family: var(--font-head); font-size: 1.1rem; font-weight: 700; color: var(--bg); }')
content = content.replace('.badge-role { display: block; font-size: 0.75rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.8); margin-top: 0.2rem; }', '.badge-role { display: block; font-size: 0.75rem; letter-spacing: 0.1em; color: rgba(10,25,47,0.8); margin-top: 0.2rem; }')

# 9. shop-bridge background
content = content.replace('#shop-bridge {\n  background: #000;', '#shop-bridge {\n  background: var(--bg2);')

# 10. shop-bridge before rgb
content = content.replace('rgba(237,28,36,0.08)', 'rgba(255,255,255,0.08)')

# 11. btn-explore hover
content = content.replace('.btn-explore:hover::before { transform: scaleX(1); }', '.btn-explore:hover::before { transform: scaleX(1); }\n.btn-explore:hover { color: var(--bg); }')

# 12. type-tag product
content = content.replace('.type-tag.product { background: var(--red); color: var(--white); }', '.type-tag.product { background: var(--red); color: var(--bg); }')

# 13, 14. process step rgb
content = content.replace('rgba(237,28,36,0.04)', 'rgba(255,255,255,0.04)')
content = content.replace('rgba(237,28,36,0.15)', 'rgba(255,255,255,0.15)')

# 15. clients background
content = content.replace('#clients { background: #000;', '#clients { background: var(--bg);')

# 16. contact background
content = content.replace('#contact { background: #000;', '#contact { background: var(--bg2);')

with open('/home/smilee/epicom-sec/style.css', 'w') as f:
    f.write(content)

print("Updates completed successfully.")
