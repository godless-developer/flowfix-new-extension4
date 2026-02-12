
🎯 Main Goals

🤝 Simplify communication and information exchange between HR and employees

📚 Make the onboarding process structured and easy to follow

👤 Provide real-time visibility into employee status and data

🌐 Offer a bird’s-eye view of organizational activities and workflows

🛠 Tech Stack

Chrome Extension (Frontend UI)
Web Platform (Next.js / React)
Backend API (Node.js / Express.js)
Database (MongoDB / Pinecone)
GitLab/GitHub CI/CD (Deployment & Version Control)

### Chrome Extension: Getting Started in Developer Mode

To run and test the 3M Found Chrome Extension locally:

1. Build the extension:
   ```bash
   npm run bc     <==`build:content`
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked** and select the build output directory (e.g., `dist`).
5. The extension will appear in your extensions list and can be pinned for quick access.
6. Make changes and rebuild as needed; refresh the extension in Chrome to see updates.

This allows you to develop and debug your extension before publishing.

## Learn More

Here are some useful resources to help you learn more about building Chrome Extensions and Next.js applications:

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Getting Started with Chrome Extensions](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/learn)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Pinecone Documentation](https://docs.pinecone.io/)

Explore these links to deepen your understanding and accelerate your development!

## Publish on Google

To publish your Chrome Extension on the Google Chrome Web Store:

1. Build your extension by running:
   ```bash
   npm run bc     <==`build:content`
   ```
2. Zip the contents of the `dist` or build output directory.
3. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
4. Click **Add New Item** and upload your zipped extension package.
5. Fill in the required details (description, screenshots, icons, etc.).
6. Submit your extension for review.

For more details, refer to the [Chrome Extension Publishing Guide](https://developer.chrome.com/docs/webstore/publish/).

# flowfix-new-extension

