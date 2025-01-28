# Squidward's Customer Management System 

Squidward's Customer Management System (Frontend) is an Angular application designed to manage customer profiles and their associated orders seamlessly. The application provides a user-friendly interface to interact with the backend services, allowing easy visualization and management of customer and order data.

---

## Features

- **Customer Management**:
  - View all customer profiles in a table.
  - Add new customers with validations for email and phone numbers.
  - Edit customer profiles with real-time updates.
  - Delete customers.

- **Order Management**:
  - View all orders for a specific customer in an organized layout.
  

- **Responsive Design**:
  - Ensures a smooth experience across different devices and screen sizes.

- **Notifications**:
  - Success and error messages displayed using Angular Material SnackBars.

- **Sample Data**:
  - The application works seamlessly with the preloaded database provided by the backend.

---

## Technologies Used

- **Angular 19**: Framework for building the frontend application.
- **TypeScript**: Programming language for developing Angular components and services.
- **Angular Material**: Library for UI components, including:
  - SnackBars for notifications.
- **HTML5 & CSS**: For structure and styling.

---

## Setup and Installation

1. **Download and Unzip the Project**:
   - Unzip the project folder into your desired directory.

2. **Install Dependencies**:
   - Navigate to the project folder.
   - Run the following command to install all required dependencies:
     ```bash
     npm install
     ```

3. **Configure the Environment**:
   - Update the `environment.ts` file located in the `src/environments` folder with the correct API base URL (the backend URL):
     ```typescript
     export const environment = {
       apiUrl: 'http://localhost:8080/api',
     };
     ```

4. **Run the Application**:
   - Start the Angular development server:
     ```bash
     ng serve
     ```
   - Open your browser and navigate to `http://localhost:4200`.

---

## Features Overview

### Customers
- **List View**: Displays all customers with details such as name, email, phone, total spend, and favorite burger.
- **Add Customer**: Form with input validation for email and phone numbers.
- **Edit Profile**: Editable fields to update customer information.
- **Delete Customer**: Removes a customer.

### Orders
- **Order Details**: Displays all orders for a specific customer, including the order date, items, and total price.


---


## Contact Information

For questions or support, please reach out to me at **noormisk94@gmail.com**. 🦀
