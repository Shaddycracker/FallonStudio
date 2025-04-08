

## Getting Started Fallon assignment Feed Back system

## Admin Info
```bash

username : root
password : 1234
```

First, run the development server:

```bash

npm install

```
+Add .env.local  using .env.sample
Then, run the development server:

```bash

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

🧾 Project Explanation
This project is built using Next.js and follows a modular structure for scalability and maintainability. Below is a brief overview of the main folders and how they work together:

🗂️ /src — Main Codebase
📁 components/
Contains reusable frontend UI components used across different pages.

📁 contexts/
Manages global admin state and shared context for controlling app-wide behavior.

📁 lib/
Contains utility functions related to:

auth — For handling authentication logic.

feedback — For managing feedback submissions and data retrieval.

📁 pages/
Next.js routes, each file corresponds to a route.

Key pages include:

/api/auth — Handles authentication APIs.

/api/feedback — Includes:

getAll.ts — API to fetch all feedback.

submit.ts — API to submit feedback.

Note: You can ignore the following (🧾 Project Explanation
This project is built using Next.js and follows a modular structure for scalability and maintainability. Below is a brief overview of the main folders and how they work together:

🗂️ /src — Main Codebase
📁 components/
Contains reusable frontend UI components used across different pages.

📁 contexts/
Manages global admin state and shared context for controlling app-wide behavior.

📁 lib/
Contains utility functions related to:

auth — For handling authentication logic.

feedback — For managing feedback submissions and data retrieval.

📁 pages/
Next.js routes, each file corresponds to a route.

Key pages include:

/api/auth — Handles authentication APIs.

/api/feedback — Includes:

getAll.ts — API to fetch all feedback.

submit.ts — API to submit feedback.

Note: You can ignore the following routes:

hello.ts

admin.tsx

login.tsx

index.tsx (used for the feedback form)

📁 styles/
Project-specific CSS or styling helpers.

📁 utils/
Utility functions and helpers used across the project (hello.ts ) 

/📁Routes in pages folder  
admin.tsx

login.tsx

index.tsx (used for the feedback form "/" )

📁 styles/
Project-specific CSS or styling helpers.

📁 utils/
Utility functions and helpers used across the project( supabase connection client )
 
## Deploy on Netlify 

https://fallon.netlify.app

