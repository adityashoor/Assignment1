import { Link } from "react-router-dom";

// Home page with welcome message and mission statement
export default function Home() {
  return (
    <main>
      <section aria-labelledby="home-heading">
        <h1 id="home-heading">Welcome to Aditya Shoor's Portfolio</h1>
        <p>
          Mission: To build impactful web applications with clean design, solid performance, and good accessibility.
        </p>
        <Link to="/about" className="btn">Learn More About Me</Link>
      </section>
    </main>
  );
}