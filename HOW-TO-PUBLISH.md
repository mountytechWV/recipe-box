# Recipe Box: how to put it online and install it

This folder is the whole app. Once it's online, anyone you send the link to can open it in their browser and install it with its own icon. Recipes are saved on each person's own device, and the app works without internet after the first visit.

## What's in this folder

| File or folder | What it is |
|---|---|
| `index.html` | The app itself (starts with an empty recipe box) |
| `sw.js` | Lets the app work offline |
| `config.js` | Settings for sync. See SYNC-SETUP.md |
| `manifest.webmanifest` | The app's name, colors, and icons, used when installing |
| `icons/` | The app icon in several sizes |
| `fonts/` | The handwriting, typewriter, and body fonts, so they work offline |

Upload the **contents** of this folder, keeping the `icons` and `fonts` folders as they are. It's fine if this guide gets uploaded too.

## About this version

This copy of the app starts **empty**. No family recipes are built in, so it's safe to put on a public site like GitHub. Your recipes travel separately, in a backup file you send to family (see "Sharing your recipes" below).

## Option A: GitHub Pages (free, permanent)

1. Go to **github.com** and create a free account.
2. Click the **+** in the top right corner, then **New repository**.
3. Name it `recipe-box`, choose **Public**, and click **Create repository**. (Free GitHub accounts can only publish public repositories.)
4. On the next page, click the link **uploading an existing file**.
5. Open this folder on your computer, select everything inside it, and drag it onto the page. Wait for all the files to finish uploading, then click **Commit changes**.
6. Click **Settings** (top of the repository), then **Pages** in the left menu.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the branch **main** and the folder **/ (root)**, then click **Save**.
8. Wait a minute or two and refresh. The address appears at the top of that page. It will look like `https://YOUR-USERNAME.github.io/recipe-box/`.

That address is the link you share with family.

## Option B: Netlify Drop (drag and drop, no GitHub needed)

1. Go to **app.netlify.com/drop**.
2. Drag this whole folder onto the page.
3. Netlify gives you an address right away. Sign up for a free account when it asks, so the site is kept permanently.
4. You can change the address to something friendlier under **Site configuration**, then **Change site name**.

## Sharing your recipes

Send family the recipe backup file (for example `recipe-box-family-recipes.json`) by email or text, along with the link to the app.

The easiest way: open the app from your new link, go to the settings menu (the sliders icon), and find **Invite family**. It has a ready-made message with your link and simple install steps for computers, iPads, and Android. Copy it, paste it into an email or text, and attach the backup file.

- **The first time they open the app**, the welcome screen offers **Restore from a backup file**. They choose the file and all the recipes appear.
- **If they've already started**, the same option is in the settings menu (the sliders icon), under **Restore from a backup file**. Restoring replaces what's on that device, so it's best done before they add recipes of their own.
- **On an iPad or iPhone:** first tap the attachment in the email or message and choose **Save to Files**. Then, in Recipe Box, choose Restore and pick the file from the Files list.

When you add new recipes later, download a fresh backup from your own settings menu and send that.

## Installing on each device

Open the link first, then:

- **Windows or Mac, Chrome or Edge:** click the install icon at the right end of the address bar, or open the browser menu and choose **Install Recipe Box**.
- **Mac, Safari:** open the **File** menu and choose **Add to Dock**.
- **iPad or iPhone, Safari:** tap the **Share** button, then **Add to Home Screen**.
- **Android, Chrome:** tap the menu, then **Install app** or **Add to Home screen**.

Family doesn't need to remember any of this. Until the app is installed, a blue "Install Recipe Box" banner at the top of the app shows the right steps for their device, or a one-click Install button in Chrome and Edge. On iPads and iPhones, the welcome screen also reminds them to add it to the Home Screen before restoring recipes, since the Home Screen app keeps its own separate copy.

## The "Save to Recipe Box" button for websites

In the app, open the settings menu and find **Save recipes from websites**.

- **On a computer:** drag the **Save to Recipe Box** button up to your browser's bookmarks bar. On any recipe website, click it and the recipe opens in Recipe Box, ready to check and save.
- **On an iPad:** tap **Copy the button's code**. In Safari, bookmark any page, then edit that bookmark: change its name to "Save to Recipe Box" and paste the code in place of its address. Open the bookmark while on a recipe page.

Most recipe websites include a standard hidden copy of the recipe, and the button reads that. If a site doesn't, select the recipe text first, then click the button.

## Sync

To keep recipes in step across devices with Google Drive, OneDrive, or Dropbox, follow **SYNC-SETUP.md**. Until sync is set up, use the backup file to move recipes between devices.

## Backups

Each device keeps its own recipes. Even with sync on, use **Download a backup file** in the settings menu every so often, and keep the file somewhere safe like Google Drive. The same file moves recipes to another device with **Restore from a backup file**.

## Updating the app later

When you get a new version of `index.html`, upload it the same way, replacing the old file. Devices pick up the new version the next time they open the app while online. If the update also changes icons or fonts, open `sw.js` and change `rb-1.0.0` to a new number, like `rb-1.0.1`, before uploading.
