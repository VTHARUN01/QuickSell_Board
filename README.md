# Quicksell Kanban Board React Application

A Kanban board application built in ReactJS that interacts with the provided API to display and manage tickets.

## Overview

This React application allows you to visualize and manage tasks in a Kanban board format. It provides various grouping and sorting options to help you organize and prioritize tasks effectively. The application leverages the power of Redux for state management, React Dropdown for selecting grouping options, React Modal for user interactions, and React-Beautiful-DND for smooth drag-and-drop functionality.

## Features

- **Grouping Options**: You can group tickets by Status, User, or Priority.
- **Sorting Options**: Tickets can be sorted by Priority or Title.
- **Responsive Design**: The application is designed to work on both desktop and mobile devices.
- **Local Storage**: User's view state (selected grouping and sorting options) is saved in local storage and persists even after a page reload.
- **Drag and Drop**: Tickets can be easily repositioned on the board using the React-Beautiful-DND library, providing a smooth and intuitive experience.

## Setup

1. Clone the repository to your local machine.

2. Install project dependencies using npm:

   ```bash
   yarn
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open your web browser and navigate to `http://localhost:3000` to access the Kanban board application.

## Usage

- Click the "Display" button to select a grouping option (By Status, User, or Priority).
- Choose the desired sorting option (Priority or Title).
- Interact with the Kanban board to manage tickets.

## Data Structure

The application uses the following data structure to display tickets and group them on the Kanban board:

- **Board**: The board configuration specifies the columns on the Kanban board. You can customize this configuration to match your workflow.

- **Data**: Contains ticket data grouped by columns on the Kanban board. Tickets are organized under 'Todo', 'In Progress', 'Backlog', or other custom columns based on the board configuration.

- **Tickets**: This object contains individual ticket details, including their title, status, priority, and user information.

- **Users**: A list of users involved in the project, including their names and availability status.

- **\_persist**: Manages the persistence of the user's view state.

## Technologies Used

- ReactJS: The application is built using React for the user interface.
- fetch: Used for making API requests to fetch data.
- CSS: Custom CSS styles have been applied to create an appealing user interface.
- Redux: State management in the application is handled with Redux.
- React Dropdown: Provides a user-friendly dropdown for selecting grouping options.
- React Modal: Ensures a user-friendly interface for creating and editing tickets.
- React-beautiful-dnd: Implements smooth drag-and-drop functionality for rearranging tasks.

## Author

Myself Tharun V from IIT Madras (AE20B060).

Feel free to explore the application, manage your tasks, and keep your project organized with this Kanban board application.
