// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 text-center py-4">
    &copy; {new Date().getFullYear()} Qtec. All rights reserved.
  </footer>
);

export default Footer;
