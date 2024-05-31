This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

This LinkedIn clone is a web application built using Next.js, Clerk, Cloudinary, and MongoDB. The app allows users to sign up, log in, and create posts with text and images. Authenticated users can like and comment on posts, fostering engagement. Key features include secure authentication, real-time updates, and a responsive design, providing a seamless user experience across all devices

## Getting Started

To run the project locally, follow these steps:

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Create .env.local file (crucial):

Create a file named .env.local in your project's root directory. This file will store sensitive environment variables required for the application to function. Do not commit this file to version control.

Example .env.local contents:

```bash
GOOGLE_ID=
GOOGLE_SECRET=
MONGODB_URI=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
SECRET=

```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

This command will start the development server, typically running on port http://localhost:3000. Open this URL in your browser to view your application.

Hot reloading: The development server automatically detects changes to your code and updates the browser accordingly, streamlining development.

## Docker Development

1. Pull the Docker image:

```bash
docker pull pawan15/webtemplates
```

2. Create .env.local (essential for Docker):

Follow step 2 from the Local Development instructions above to create the .env.local file with your environment variables.

3. Run the Docker container:

```bash
docker run -p 3000:3000 --env-file .env.local pawan15/webtemplates
```

-p 3000:3000: Maps the container's port 3000 to your host's port 3000, allowing you to access the application at http://localhost:3000.

--env-file .env.local: Instructs the container to read environment variables from the .env.local file.


