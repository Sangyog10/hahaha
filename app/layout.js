import "./globals.css";

export const metadata = {
  title: "Hackathon",
  description: "Team ERC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
