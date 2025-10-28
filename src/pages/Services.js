export default function Services() {
  return (
    <section aria-labelledby="services-heading">
      <h2 id="services-heading">Services</h2>
      <ul>
        <li>
          <strong>Web Development</strong> — modern responsive websites (React, REST APIs)
        </li>
        <li>
          <strong>Mobile App Development</strong> — cross-platform mobile UIs
        </li>
        <li>
          <strong>UI/UX Design</strong> — prototyping and visual design
        </li>
      </ul>
      <div className="services-images">
        <img src={require("../assets/service1.png")} alt="Service example" style={{maxWidth: '200px'}} />
      </div>
    </section>
  );
}