import proj1 from "../assets/project1.jpg";
import proj2 from "../assets/project2.png";
import proj3 from "../assets/project3.png";

// Projects page - includes at least 3 highlighted projects with images and descriptions
export default function Projects() {
  const projects = [
    {
      title: "E-commerce App",
      img: proj1,
      desc: "Built with React and Firebase. Role: Frontend developer — implemented product listing, cart workflow and checkout UI. Outcome: Completed MVP with authentication and payments integration."
    },
    {
      title: "Portfolio Website",
      img: proj2,
      desc: "Responsive portfolio built with React Router and CSS Grid. Role: Full-stack developer — designed UI and deployed to Netlify. Outcome: Improved personal brand and job interviews."
    },
    {
      title: "Chat App",
      img: proj3,
      desc: "Real-time messaging using Socket.io. Role: Backend and frontend integration — implemented socket events and chat UI. Outcome: Demonstrated real-time features and scaling considerations."
    }
  ];

  return (
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <article key={i} className="project-card">
            <img src={p.img} alt={p.title} style={{maxWidth: '320px'}} />
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}