import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';

/**
 * Leads page component.
 * Manages the state and interactions for the Lead Management CRUD system.
 */
const Leads = () => {
  // State for the list of leads
  const [leads, setLeads] = useState([
    { id: 1, name: 'Alice Freeman', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', status: 'New', source: 'Website', dateAdded: 'Oct 24, 2026' },
    { id: 2, name: 'Bob Smith', company: 'Innovate Inc', email: 'bob@innovate.com', phone: '555-0102', status: 'Contacted', source: 'LinkedIn', dateAdded: 'Oct 23, 2026' },
    { id: 3, name: 'Charlie Davis', company: 'CloudNet', email: 'charlie@cloudnet.com', phone: '555-0103', status: 'Proposal Sent', source: 'Referral', dateAdded: 'Oct 22, 2026' },
  ]);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for currently selected lead to edit (null means adding a new lead)
  const [selectedLead, setSelectedLead] = useState(null);

  // Helper to get current date formatted
  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Open modal for creating a new lead
  const handleAddClick = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing lead
  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Handle lead deletion
  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
      toast.error('Lead deleted', {
        icon: '🗑️',
        style: {
          border: '1px solid #fee2e2',
          padding: '16px',
          color: '#b91c1c',
        },
      });
    }
  };

  // Handle form submission (both Create and Update)
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // Update existing lead
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id ? { ...lead, ...formData } : lead
        )
      );
      toast.success('Lead updated successfully!');
    } else {
      // Create new lead
      const newLead = {
        ...formData,
        id: Date.now(), // Use timestamp as simple unique ID
        dateAdded: getFormattedDate(),
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success('New lead created!');
    }
    // Close modal
    setIsModalOpen(false);
  };

  // Handle modal cancellation
  const handleFormCancel = () => {
    setIsModalOpen(false);
  };

  // Accessibility: Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="p-4 md:p-6 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Lead Management</h1>
          <p className="text-gray-500 mt-1">Manage and track your potential clients.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Main Content Area */}
      <div className="mb-8">
        {/* Mobile View: Cards (Hidden on md and up) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
          {leads.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
              No leads found. Add a new lead to get started.
            </div>
          )}
        </div>

        {/* Desktop View: Table (Hidden on smaller than md) */}
        <div className="hidden md:block">
          <LeadTable leads={leads} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </div>
      </div>

      {/* Modal Overlay for Lead Form */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Prevent clicks inside the modal from closing it */}
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
            <LeadForm
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
