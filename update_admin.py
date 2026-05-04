import re

with open('/home/smilee/epicom-sec/admin.css', 'r') as f:
    content = f.read()

# Replace root variables
new_root = """:root {
  --bg-color: #0A192F;
  --glass-bg: rgba(17, 34, 64, 0.65);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(255, 255, 255, 0.4);
  --red: #FFFFFF;
  --red-glow: rgba(255, 255, 255, 0.2);
  --white: #ffffff;
  --text-main: #f0f0f0;
  --text-muted: #8892b0;
  --font-head: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
}"""
content = re.sub(r':root\s*\{[^}]+\}', new_root, content)

content = content.replace('background: var(--red);\n  color: var(--white);', 'background: var(--red);\n  color: var(--bg-color);')

# .login-error
content = content.replace('.login-error { color: var(--red);', '.login-error { color: #ffcccc;')

# .btn-danger
content = content.replace('.btn-danger { background: var(--red); border: 1px solid var(--red); color: var(--white); }', '.btn-danger { background: var(--red); border: 1px solid var(--red); color: var(--bg-color); }')
content = content.replace('.btn-danger:hover { background: var(--red-glow); }', '.btn-danger:hover { background: var(--glass-border-active); }')

# .btn-login:hover
content = content.replace('.btn-login:hover { background: #ff333a;', '.btn-login:hover { background: #e6f1ff;')

# background gradients
content = content.replace('rgba(20,20,20,1)', 'rgba(10,25,47,1)')
content = content.replace('rgba(0,0,0,0.3)', 'rgba(10,25,47,0.3)')
content = content.replace('rgba(10,10,10,0.9)', 'rgba(17,34,64,0.9)')
content = content.replace('rgba(0,0,0,0.2)', 'rgba(17,34,64,0.2)')
content = content.replace('rgba(0,0,0,0.8)', 'rgba(10,25,47,0.8)')
content = content.replace('rgba(237, 28, 36, 0.1)', 'rgba(255, 255, 255, 0.1)')

# td-id color
content = content.replace('.td-id { font-family: monospace; color: var(--red);', '.td-id { font-family: monospace; color: var(--text-main);')


with open('/home/smilee/epicom-sec/admin.css', 'w') as f:
    f.write(content)

print("Admin CSS updated.")
