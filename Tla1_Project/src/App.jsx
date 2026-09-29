import { useState, useRef } from 'react';
import './index.css';

function App() {
  // Declarative State replacing standard DOM reading
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', desc: '', amount: '' });
  
  const nameInputRef = useRef(null);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Controller Action translated to React
  const handleAddCategory = (e) => {
    e.preventDefault(); 
    
    // Guard Clause Validation
    if (!formData.name.trim() || !formData.desc.trim() || !formData.amount) {
      alert("Please complete all input fields.");
      return;
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      desc: formData.desc.trim(),
      amount: parseFloat(formData.amount)
    };

    // Update state immutably (replaces insertAdjacentHTML)
    setCategories([...categories, newCategory]);
    
    // Reset inputs & refocus
    setFormData({ name: '', desc: '', amount: '' });
    nameInputRef.current?.focus();
  };

  // Upgraded Feature: Delete Category
  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  // Upgraded Feature: Derived state for total calculation
  const totalIncome = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <main className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          
          {/* Registration Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h1 className="h5 mb-0 fw-bold">Income Category Registration</h1>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleAddCategory}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Category Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-control" 
                      placeholder="e.g., Consulting"
                      value={formData.name}
                      onChange={handleChange}
                      ref={nameInputRef}
                    />
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="desc" className="form-label fw-semibold">Description</label>
                    <input 
                      type="text" 
                      id="desc" 
                      name="desc" 
                      className="form-control" 
                      placeholder="e.g., Support contract"
                      value={formData.desc}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="amount" className="form-label fw-semibold">Expected Monthly ($)</label>
                    <input 
                      type="number" 
                      id="amount" 
                      name="amount" 
                      className="form-control" 
                      placeholder="e.g., 5000"
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary px-4 fw-semibold mt-2">
                  Save Category
                </button>
              </form>
            </div>
          </div>

          {/* Ledger Table Card */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h2 className="h6 mb-0 text-secondary fw-bold text-uppercase">Registered Categories</h2>
              <span className="badge bg-success fs-6">
                Total Projected: ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="w-35">Category Name</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="w-20">Amount</th>
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No income categories registered yet.
                      </td>
                    </tr>
                  ) : (
                    categories.map((cat) => (
                      <tr key={cat.id}>
                        <td className="fw-semibold text-dark">{cat.name}</td>
                        <td className="text-secondary">{cat.desc}</td>
                        <td className="text-success fw-bold">
                          ${cat.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="text-end">
                          <button 
                            onClick={() => handleDelete(cat.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default App;