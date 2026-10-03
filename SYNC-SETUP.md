# Turning on sync

Sync keeps each person's recipes, meal plan, and shopping list in step across their own devices, like a computer and an iPad. Each person connects **their own** Google Drive, OneDrive, or Dropbox, so everyone's recipes stay their own. Recipe Box only gets access to its own folder, never to anyone's other files.

Each cloud service needs a one-time registration so its sign-in screen knows about Recipe Box. You get an ID from each one and paste it into **config.js**. Do as many as you like: any service left blank simply won't be offered. Google Drive alone is enough to start.

Your app address is `https://mountytechwv.github.io/recipe-box/`. You'll paste it in a few places below, exactly like that, including the slash at the end.

## Google Drive

1. Go to **console.cloud.google.com** and sign in with your Google account.
2. At the top, open the project picker and click **New project**. Name it `Recipe Box` and click **Create**. Make sure the new project is selected.
3. In the search bar, type **Google Drive API**, open it, and click **Enable**.
4. Open the menu (☰), go to **Google Auth Platform** (older screens call it **OAuth consent screen**), and click **Get started**:
   - App name: `Recipe Box`. Support email: your email.
   - Audience: **External**.
   - Contact email: your email. Agree to the policy and click **Create**.
5. Go to **Audience** and click **Publish app**, then **Confirm**, so the publishing status reads **In production**. This lets anyone with a Google account connect their own Drive, with no list of email addresses to keep up. Google doesn't require a review for this, because Recipe Box only asks for its own files.
6. Under **Data access** (or **Scopes**), click **Add or remove scopes**, search for `drive.file`, tick **.../auth/drive.file**, click **Update**, then **Save**.
7. Under **Clients** (or **Credentials**), click **Create client**:
   - Application type: **Web application**. Name: `Recipe Box`.
   - Under **Authorized JavaScript origins**, click **Add URI** and enter `https://mountytechwv.github.io` (just that, no `/recipe-box/`).
   - Click **Create**.
8. Copy the **Client ID**. It ends in `.apps.googleusercontent.com`.

Since Recipe Box hasn't gone through Google's optional brand verification, the sign-in screen may show your app's web address instead of the name "Recipe Box." That's fine for a family app and doesn't affect anything.

## OneDrive (optional)

1. Go to **entra.microsoft.com** and sign in with your Microsoft account. If it asks, sign up for a free Azure account (needed to register apps; there's no charge for this).
2. Go to **Applications**, then **App registrations**, then **New registration**:
   - Name: `Recipe Box`.
   - Supported account types: **Accounts in any organizational directory and personal Microsoft accounts**.
   - Redirect URI: choose **Single-page application (SPA)** and enter `https://mountytechwv.github.io/recipe-box/`.
   - Click **Register**.
3. Copy the **Application (client) ID** from the overview page.
4. Go to **API permissions**, click **Add a permission**, **Microsoft Graph**, **Delegated permissions**, and add **Files.ReadWrite.AppFolder** and **offline_access**. Click **Add permissions**.

OneDrive keeps the recipes in **Apps › Recipe Box** in each person's OneDrive.

## Dropbox (optional)

1. Go to **dropbox.com/developers/apps** and click **Create app**.
2. Choose **Scoped access**, then **App folder**, name it `Recipe Box` (Dropbox may ask for a more unique name, like `Boreman Recipe Box`), and click **Create app**.
3. On the **Settings** tab:
   - Under **OAuth 2 › Redirect URIs**, add `https://mountytechwv.github.io/recipe-box/` and click **Add**.
   - Under **Allow public clients (Implicit Grant & PKCE)**, choose **Allow**.
   - Copy the **App key**.
4. On the **Permissions** tab, tick **files.metadata.read**, **files.content.write**, and **files.content.read**, then click **Submit**.

Dropbox keeps the recipes in **Apps › (your app name)** in each person's Dropbox. A new Dropbox app starts in "development" mode, which allows a limited number of people to connect. That's plenty for a family; you'd only apply to Dropbox for approval if it grew well beyond that.

## Put the IDs into config.js

1. In your GitHub repository, click **config.js**, then the pencil icon (**Edit this file**).
2. Paste each ID between the quotes on its line, for example:

   ```
   googleClientId: '123456789-abc.apps.googleusercontent.com',
   microsoftClientId: '',
   dropboxAppKey: '',
   ```

3. Click **Commit changes**.

Wait a minute or two, then open the app. The settings menu (the sliders icon) now shows **Connect Google Drive** (and any others you set up).

## Using sync

- **Connecting:** settings menu, then **Connect** your service and sign in. The first sync copies your recipes up to a "Recipe Box" folder. On your other devices, connect the **same** account and the recipes come down.
- **The cloud icon** in the header shows how things stand: a check mark when everything's synced, spinning arrows while syncing, a crossed-out cloud when offline, and a red dot when something needs you. Tap it for details and **Sync now**.
- **It syncs on its own** a few seconds after you make a change, when you open the app, and when you get back online. Changes made offline wait and sync later.
- **When the same recipe was changed on two devices**, Recipe Box shows both versions side by side so you can keep this device's, keep the other one, or keep both.
- **Google Drive** sign-ins last about an hour at a time. If the cloud icon shows a red dot, tap it and choose **Continue syncing**. OneDrive and Dropbox stay signed in.
- **Turning sync off** (settings menu) leaves all your recipes on the device and in the cloud folder. It just stops syncing.

Keep downloading a backup file now and then anyway. It's your safety net.
