// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-teal-900 text-white text-center py-4 mt-6">
      &copy; {new Date().getFullYear()} AgriTech Kenya. All Rights Reserved.
    </footer>
  );
}