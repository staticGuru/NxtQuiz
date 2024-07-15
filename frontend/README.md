# SimpleStudy Frontend

This is a [Next.js](https://nextjs.org/) project.

## Project Structure and Naming Conventions

### Folder Naming Conventions

- Kebab-case for Folder Names: Use kebab-case (also known as dash-case) for all folder names. This format ensures consistency and avoids issues with case-insensitive file systems.
- Singular for Folder Names: Use singular nouns for folder names. This keeps the project structure consistent and makes it easier to reason about the codebase.

### File Naming Conventions

- PascalCase for Component Files: Use PascalCase for all React component filenames to indicate they are components.
- camelCase for Non-component Files: Use camelCase for utility functions, hooks, and other non-component files.
- index.tsx for Entry Points: When a folder contains a single component or module, use index.tsx as the entry point.

### File Extensions

TypeScript with JSX: Use the .tsx extension for TypeScript files that contain JSX.

Example:

```bash
src/
├── app/                    # Nextjs pages and components
│   ├── cancellation/       # Cancellation page route
│   │   ├── page.tsx        # Cancellation page component
├── components/              # Common, reusable components
│   ├── common/              # Shared components like buttons and modals
│   │   ├── Button.tsx       # Button component
│   │   ├── Modal.tsx        # Modal component
│   │   └── index.ts         # Barrel file for common components
│   └── ui/                  # Common UI components
│       ├── OptionSelector.tsx  # Option selector component
│       ├── Dropdown.tsx     # Dropdown component
│       └── index.ts         # Barrel file for UI components
├── domain/                # Feature-based organization
│   ├── cancellation-flow/   # Components, hooks, interfaces, styles, and utilities related to this feature
│   │   ├── components/      # Cancellation flow components
│   │   │   ├── CancellationForm.tsx  # Form component for cancellation
│   │   │   ├── CancellationFlowOptionsWrapper.tsx  # Wrapper component for cancellation flow options
│   │   │   ├── CancellationFlowPromptWrapper.tsx  # Wrapper component for cancellation flow prompts
│   │   │   └── index.ts     # Barrel file for cancellation flow components
│   │   └── index.ts         # Barrel file for cancellation flow
│   └── user-profile/        # Components, hooks, interfaces, styles, and utilities related to this feature
│       ├── components/      # User profile components
│       │   ├── UserProfileForm.tsx  # Form component for user profile
│       │   ├── UserProfileDetails.tsx  # User profile details component
│       │   └── index.ts     # Barrel file for user profile components
│       └── index.ts         # Barrel file for user profile
├── hooks/                   # Custom hooks
│   ├── useAuth.ts           # Custom hook for authentication
│   └── index.ts             # Barrel file for hooks
├── pages/                   # Top-level page components for routing
│   ├── HomePage.tsx         # Home page component
│   └── index.ts             # Barrel file for pages
└── utils/                   # Utility functions
    ├── formatDate.ts        # Function to format dates
    └── index.ts             # Barrel file for utilities
```
