import '../src/styles/globals.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
// import UserProfile from '../src/components/UserProfile';
import UserProfile from '../src/app/user-profile/page';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const WrappedComponent = ({ component }) => (
  <QueryClientProvider client={queryClient}>
    <div className="simplestudy-react-component">{component}</div>
  </QueryClientProvider>
);

// Ensure to export the render function so it can be called externally
export const renderComponents = () => {
  const componentsMap = [
    { component: <UserProfile />, id: 'user-profile-form' },
  ];

  componentsMap.forEach(({ component, id }) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      const root = createRoot(targetDiv);
      root.render(<WrappedComponent component={component} />);
    }
  });
};

// Automatically call the render function if the script is loaded
// renderComponents();
document.addEventListener('DOMContentLoaded', () => {
  renderComponents();
});
