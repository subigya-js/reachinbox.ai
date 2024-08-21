# **Inbox Web Application**

## **Overview**

This project is a functional inbox web application built using React. It includes features such as light and dark mode support, dynamic email fetching, and user-friendly interactions. The project was developed as part of a placement assignment to demonstrate proficiency in frontend development, API integration, and responsive design.

## **Features**

- **User Authentication**: Secure login functionality using Google OAuth.
- **Dynamic Inbox**: Fetch and display emails dynamically using API integration.
- **Light and Dark Mode**: Toggle between light and dark themes.

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
   git clone https://github.com/yourusername/onebox.git
   ```
   ```
   cd onebox
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

- **React**: JavaScript library for building user interfaces.
- **ContextAPI**: View your inbox and manage emails.
- **DOM Purify**: Sanitizing HTML content
- **React Router**: For client-side routing.
- **React Icons**: Icons
- **Axios**: Promise-based HTTP client for making API requests.
- **@react-oauth/google**: For handling Google OAuth authentication.
- **Tailwind CSS**: Utility-first CSS framework for styling.
