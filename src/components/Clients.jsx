import './Clients.css'; // Will add minimal styles for layout

const Clients = () => {
    const clients = [
        { name: "Ternium", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ternium_Logo.svg/1280px-Ternium_Logo.svg.png" },
        { name: "Bodesa", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUMA_78uLNqm_1XdJJuNzkOfpqAXKts9Vljg&s" },
        { name: "Peña Colorada", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NTjZiUlrzcddjNACUbmu4c2GTl0Oa1zS3Q&s" },
        { name: "Plaza San Fernando", logo: "https://coparmexcolima.org.mx/wp-content/uploads/2024/09/sanfernando-01.png" },
        { name: "Gobierno de Colima", logo: "https://cfdissacolima.eco-mx.com/img/logo2.jpg" }
    ];

  return (
    <section className="section clients">
      <div className="container">
        <h3 className="text-center" style={{marginBottom: '40px', color: 'var(--text-muted)', fontSize: '1rem', letterSpacing: '2px'}}>NUESTROS CLIENTES</h3>
        <div className="clients-flex">
            {clients.map((client, index) => (
                <div key={index} className="client-logo">
                    <img src={client.logo} alt={client.name} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
