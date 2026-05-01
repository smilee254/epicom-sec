# EPICOM Security — Setup Guide

## 1. Setting up EmailJS (Free Tier)
To enable the cart system to send enquiries to `epicomsecuritysystem3@gmail.com` without needing a backend server, follow these steps:

1. **Create an Account:** Go to [EmailJS.com](https://www.emailjs.com/) and create a free account.
2. **Add Email Service:**
   - Go to **Email Services** > **Add New Service**.
   - Select **Gmail**.
   - Connect the `epicomsecuritysystem3@gmail.com` account.
   - Note down the **Service ID** (e.g., `service_xxxxx`).
3. **Create an Email Template:**
   - Go to **Email Templates** > **Create New Template**.
   - In the **To Email** field, enter `epicomsecuritysystem3@gmail.com`.
   - In the **Subject** field, enter: `New Enquiry from {{from_name}} - EPICOM Security`
   - In the **Content** area, paste the following:
     ```
     You have received a new enquiry from the EPICOM website.
     
     Name: {{from_name}}
     Phone: {{phone}}
     Email: {{reply_to}}
     
     Total Items: {{total_items}}
     Requested Items:
     {{cart_details}}
     
     Additional Notes:
     {{message}}
     ```
   - Save the template and note down the **Template ID** (e.g., `template_xxxxx`).
4. **Get your Public Key:**
   - Go to **Account** > **API Keys**.
   - Copy the **Public Key**.

## 2. Linking EmailJS to the Website
Once you have the 3 keys from the steps above, open `script.js` in a text editor and scroll down to the `/* ── EMAILJS FORM SUBMISSION ── */` section (around line 352).

Replace the placeholder values with your actual keys:

```javascript
// Replace this:
emailjs.init("PLACEHOLDER_PUBLIC_KEY");

// And replace this:
emailjs.send('PLACEHOLDER_SERVICE_ID', 'PLACEHOLDER_TEMPLATE_ID', templateParams)
```

Save the file. Your website can now send emails!

## 3. Admin Dashboard Access
- **URL:** Navigate to `/admin.html` on your website.
- **Login:** Enter the secret key `0728811032`.
- **Note:** The admin dashboard works completely in the browser (`localStorage`). It requires zero backend hosting. Any requests made on the same browser/device will appear there instantly.

## 4. Recommended Deployment
For the best security (HTTPS encryption), speed, and reliability, I recommend deploying this folder to **Netlify** or **Vercel** for free.
- Simply drag and drop the `epicom-sec` folder into Netlify Drop (https://app.netlify.com/drop).
