import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app">
      <nav style={{ padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', background: 'linear-gradient(to right, #fff, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nexora</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Shop</a>
            <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>New Arrivals</a>
            <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Support</a>
            <button className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </nav>

      <main className="container" style={{ marginTop: '5rem' }}>
        <section className="animate-fade" style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <h2 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Experience the Future <br /> of <span style={{ color: 'var(--primary)' }}>Digital Commerce</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Nexora brings you a curated collection of premium tech and lifestyle products, delivered with unmatched speed and elegance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>Shop Collection</button>
            <button className="btn" style={{ border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Learn More</button>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[1, 2, 3].map(item => (
            <div key={item} className="card">
              <div style={{ height: '200px', background: 'var(--glass-border)', borderRadius: '12px', marginBottom: '1.5rem' }}></div>
              <h3 style={{ marginBottom: '0.5rem' }}>Premium Product {item}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>The pinnacle of design and performance, crafted for those who demand the best.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>$299.00</span>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
