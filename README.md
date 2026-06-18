# PullSheet

Pokémon collection portfolio tracker — tracks singles and sealed product against your Google Sheet.

## Setup in 5 minutes

### 1. Deploy the Apps Script backend

1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code and paste the entire contents of `Code.gs`
4. Click **Deploy → New Deployment**
5. Type: **Web App**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy** and copy the URL

### 2. Host on GitHub Pages

1. Create a new GitHub repo (e.g. `pullsheet`)
2. Upload `index.html` and `manifest.json`
3. Go to repo **Settings → Pages**
4. Source: **Deploy from a branch → main → / (root)**
5. Your site will be live at `https://yourusername.github.io/pullsheet`

### 3. Connect

1. Open your hosted site
2. Go to **Settings tab**
3. Paste your Apps Script URL
4. Tap **Test Connection**

### Add to Home Screen (PWA)

- **iPhone:** Open in Safari → Share → Add to Home Screen
- **Android:** Open in Chrome → Menu → Add to Home Screen

## Sheet Structure Expected

**Market Trends Singles tab:**
`Card | Quantity | Purchase Date | Purchase Price | Current Market | Diff | % Change`

**Market Trends Sealed tab:**
Group headers (Long Hold, Short Hold One, etc.) followed by rows:
`Product | Quantity | Purchase Date | Purchase Price | Current Market | Diff | % Change | Sold Price | Profit`
