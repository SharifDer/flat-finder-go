
# Sakan Sanaa Project Documentation

## Project Overview
Sakan Sanaa is a web application for connecting apartment owners and renters in Sanaa, Yemen. The platform allows users to browse available apartments, save favorites, and contact property owners directly without intermediaries.

## Project Structure

### Core Components
- **Navbar**: Navigation component with user authentication options
- **Footer**: Site footer with links and contact information
- **SearchBar**: Apartment search functionality with filters
- **ApartmentCard**: Reusable component for displaying apartment information
- **UserOnboardingModal**: First-time user experience to determine user type (renter or landlord)
- **AuthModal**: Authentication modal for user login and registration

### Pages
- **Index**: Homepage with featured listings and search functionality
- **ListingsPage**: Browse all available apartments with filters
- **ApartmentDetail**: Detailed view of a specific apartment
- **Favorites**: User's saved apartments
- **Dashboard**: Admin/owner analytics and statistics
- **About**: Information about the platform
- **HowItWorks**: Explanation of how the platform works
- **AddApartment**: Form for landlords to list new apartments
- **UserProfile**: User account management
- **NotFound**: 404 page

### Contexts
- **UserPreferenceContext**: Manages user preferences including user type (renter or landlord) and authentication state

### Data Flow
1. User visits the site and selects their role (renter or landlord)
2. Based on the role, the homepage adapts its content
3. Users can browse apartments or post their own (requires login)
4. Backend integration is required for data persistence (noted with comments)

### Authentication Flow
1. Users can login or register via the AuthModal
2. Authentication state is managed through the UserPreferenceContext
3. Certain actions (like posting apartments) require authentication

## Technical Stack
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components
- Lucide React for icons
- React Query for data fetching

## Backend Integration Points
Throughout the codebase, comments indicate where backend integration is required. These are marked with:
```
// This data comes from the backend
// Expected data: [description of expected data]
```

## Mobile Responsiveness
The application is designed to be fully responsive across devices, with special attention to:
- Collapsible mobile navigation menu
- Responsive grid layouts for apartment listings
- Adapted forms and modals for smaller screens

## Deployment
The project can be deployed using the integrated deployment feature in Lovable.
