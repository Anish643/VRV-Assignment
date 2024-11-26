# VRV-Assignment
Admin Dashboard with User Management

Admin Dashboard with User Management

Overview
This is an admin dashboard built using React that allows for managing users, roles, and permissions. It uses Material UI for the user interface and React Query for data fetching and mutation. The app is connected to the JSONPlaceholder API to simulate user data and allows administrators to view, search, sort, and add new users.

Features
- User Management: Display, search, and sort users fetched from the JSONPlaceholder API.
- Add New User: Allows adding a new user via a modal form.
- State Persistence: User settings like search, sorting, and pagination are persisted using local storage.
- Roles & Permissions: Placeholder pages for managing roles and permissions (currently not implemented).
- Responsive Design: The app is responsive and works well on both desktop and mobile devices.

Technologies Used
- React: The JavaScript library used to build the UI.
- Material UI: A popular React UI framework used for the design and layout.
- React Router: For routing and navigation between pages.
- React Query: For fetching, caching, and syncing data from the server.
- Axios: For making HTTP requests to the JSONPlaceholder API.
- JSONPlaceholder API: A free fake online REST API used for testing and prototyping.

Installation

1. Clone the repository from master branch
git clone https://github.com/Anish643/VRV-Assignment.git

2. Install dependencies
Navigate to the project directory and install the required dependencies:
cd vrv-assignment
npm install

3. Run the development server
Start the application in development mode:
npm start
The app should now be running at http://localhost:3000.

Usage

- Dashboard: The landing page that provides a summary of the app's data.
- Users: Displays a list of users with options to search, sort, and add new users.
- Roles: Placeholder page for managing user roles (not yet functional).
- Permissions: Placeholder page for managing user permissions (not yet functional).

Contributing
Feel free to fork this repository and contribute by submitting pull requests. If you encounter any issues or have suggestions for improvements, open an issue.

License
This project is open source and available under the MIT License.
