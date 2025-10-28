import resume from "../assets/resume.pdf";
import profile from "../assets/profile.png";

// About page - contains legal name, image and link to resume as required
export default function About() {
  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">About Me</h2>
      <img src={profile} alt="Headshot of Aditya Shoor" style={{maxWidth: '200px', borderRadius: '8px'}} />
      <p>
        Hi, I’m Aditya Shoor — a passionate web developer specializing in React and modern web technologies. I build responsive, accessible user interfaces and enjoy turning ideas into production-ready applications.
      </p>
      <p>
        <a href={resume} target="_blank" rel="noopener noreferrer">Download Resume (PDF)</a>
      </p>
    </section>
  );
}