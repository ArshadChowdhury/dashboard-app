# E-commerce Dashboard

A responsive e-commerce dashboard built with Next.js 15 - featuring product listing, filtering, cart functionality and pagination.

A brief overview of the app -

<img width="1904" height="1078" alt="image" src="https://github.com/user-attachments/assets/3b8b7cf8-1a8b-4fdf-b58a-148c6696f552" />


## Live URL of the app - https://dashboard-app-swart-two.vercel.app/


## Features

- **Product Listing**: Display products from Fake Store API with images, titles, prices and categories
- **Category Filtering**: Filter products by category with dropdown selection
- **Search**: Debounced search functionality for products
- **Product Details**: Individual product pages with full details and ratings
- **Shopping Cart**: Add/remove items, quantity management, cart total calculation
- **Add Product**: Form to simulate adding new products
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **State Management**: React Query for server state, Zustand for cart state

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TanStack Query (React Query)
- Tailwind CSS + Shadcn
- Fake Store API
- Axios

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a .env.local and copy/paste the required key of env from .env.example and use the fakeapi url as value 
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── stores/            # Zustand store setup for cart
├── providers/         # Tanstack query provider setup
├── products/          # Fetched all product from fake api in here
  ├── [id]/            # Dynamic product detail pages
├── cart/              # Cart page
├── lib/               # Axios instance is initiated here
├── common/               # Common helper functions & types are defined here
├── add-product/       # Add product form
└── page.js            # Not accessible because didn't design a landing page
components/          # Reusable components

```

## API Integration

- Products: `https://fakestoreapi.com/products`
- Categories: `https://fakestoreapi.com/products/categories`
- Product Details: `https://fakestoreapi.com/products/:id`
- Add Product: `https://fakestoreapi.com/products` (POST - simulated)

## Design Choices

- **Next.js App Router**: Modern routing with server components where beneficial
- **TanStack Query**: Efficient data fetching with caching and loading states
- **Zustand**: Simple cart state management with minimal global state management library
- **Tailwind CSS**: Utility-first CSS for rapid development and responsive design
- **Component Architecture**: Modular, reusable components for maintainability

## Potential Improvements
- Implement server-side rendering for better performance ( wanted to do it but couldn't due to time constraint)
- Implement pagination for large product lists (Couldn't do it by API because the API didn't support it)
- Add product sorting options (Should've sorted price, rating, name by API - again didn't support)
- Add user authentication and user-specific carts
