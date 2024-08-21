# **React Email Application**

## **Overview**

This project is a functional inbox web application built using React. It includes features such as light and dark mode support, dynamic email fetching, and user-friendly interactions. The project was developed as part of a placement assignment to demonstrate proficiency in frontend development, API integration, and responsive design.

## **Features**

- **Landing Page**: A welcoming page where users can navigate to the Onebox section.
- **Onebox Section**: A detailed view with an email list, header, and sidebar.
- **Email List**: Fetches and displays emails, supports search and filtering.
- **Theme Toggle**: Switch between light and dark modes.
- **Context API**: Manages user information, theme, and email count.

## **Project Structure**

```plaintext
src/
│
├── components/
│   └── Inbox.js       # Main Inbox component
│
├── ContextAPI.js      # Context API for managing global state
│
├── images/
│   └── default.png    # Default user image
│
├── App.js             # Root component
├── index.js           # Entry point
└── ...
```

## **APIs Used**

- **/onebox/list(GET)**: Fetch the list of emails.
- **/onebox/(GET)**: Fetch details of a specific email thread.

## **Installation Steps**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/reachinbox.ai.git
   ```

   ```
   cd reachinbox.ai
   ```

2. **Install dependencits:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run start
   ```

## **Usage**

- **Login**: Start by logging in using your Google account.
- **Inbox**: View your inbox and manage emails.
- **Theme Toggle**: Switch between light and dark mode as per your preference.

## **Technologies Used**

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for handling routing in React applications.
- **Context API**: React's built-in method for managing global state.
- **JavaScript (ES6+)**: Programming language used for writing application logic.
- **CSS**: Styling language used for the application’s design.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Icons**: A library for including various icons in the React application.

## **Features**

- **Landing Page**: A welcoming page where users can navigate to the Onebox section.
- **Onebox Section**: A detailed view with an email list, header, and sidebar.
- **Email List**: Fetches and displays emails, supports search and filtering.
- **Theme Toggle**: Switch between light and dark modes.
- **Context API**: Manages user information, theme, and email count.
