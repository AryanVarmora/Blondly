# Bondly
Welcome to Social Shpere project created by Me &amp; Akash This repository contains both the backend (Node.js, Express, MongoDB) and frontend (React) components for building a fully functional Social network site. Whether you're new to the project or a returning team member, this README will guide you on how to get set up and contribute effectively.

## Team Members
- **Aryan**
- **Akash**

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Variables](#3-environment-variables)
  - [4. Start the server](#3-start-the-server)
  - [5. Start the cient](#4-start-the-client)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Bondly is a social networking platform designed to bring people together. With a clean and intuitive interface, Bondly allows users to create profiles, make friends, share posts, and interact with others in a meaningful way. Built using the MERN stack, Bondly is scalable, fast, and efficient.

## Features

**User Profiles**: Create, update, and manage user profiles.
**Friendships**: Add and remove friends to build your network.
**Posts and Comments**: Share updates and interact with your community.
**Real-Time Feed**: See the latest posts from your friends.
**Secure Authentication**: User login and registration with JWT-based security.


## Tech Stack

**Frontend**: React.js
**Backend**: Node.js, Express.js
**Database**: MongoDB
**State Management**: Context API 


## Getting Started

### Prerequisites
Node.js installed on your machine.
MongoDB instance running locally or in the cloud (e.g., MongoDB Atlas).
Git for version control.


## Installation
### 1. Clone the repository:
```bash
Copy code
git clone https://github.com/your-username/bondly.git
cd bondly
```
### 2. Install dependencies for both client and server:

```bash
Copy code
cd client
npm install
cd ../server
npm install
```
### 3. Environment variables:

Create a .env file in the server directory.
Add the following:
makefile
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
Run the application:

### 4. Start the server:
```bash
Copy code
cd server
npm start
```
### 5. Start the client:
```bash
Copy code
cd client
npm start
```
Open your browser at http://localhost:3000 to see the application.

## Usage

Sign up and create your profile.
Add friends to build your network.
Share posts, comment, and interact with your community.
Folder Structure
```bash
Copy code
bondly/
├── client/       # React.js frontend
├── server/       # Express.js backend
├── README.md     # Project documentation
```

## Roadmap

 Set up basic CRUD operations for users and posts.
 Implement real-time notifications.
 Add profile picture uploads.
 Enable search functionality for users and posts.
 Implement mobile-responsive design.
 
## Contributing
### 1. Aryan
### 2. Akash

## License
Distributed under the MIT License. See LICENSE for more information.


