import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

/**
 * Leads page component.
 * Manages the state and interactions for the Lead Management CRUD system.
 */
const Leads = () => {
  // Consume global CRM leads state and CRUD functions from LeadContext
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // State for search query and active filter status
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // State for hybrid view toggle on tablet
  const [viewMode, setViewMode] = useState('table');

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for currently selected lead to edit (null means adding a new lead)
  const [selectedLead, setSelectedLead] = useState(null);

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
      deleteLead(id);
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
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!');
    } else {
      addLead(formData);
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

  // Derived state: filtered list of leads based on active filter and search query
  const filteredLeads = leads
    .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
    .filter(
      (lead) =>
        (lead.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Clear all search query and filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Lead Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your potential clients.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Search and Filters Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1 w-full lg:max-w-md">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            leads={leads}
          />
          {/* View Toggle (Visible only on Tablet) */}
          <div className="hidden md:flex lg:hidden bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'card'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div key={`${activeFilter}-${searchQuery}`} className="mb-8 animate-fade-in">
        {filteredLeads.length === 0 ? (
          <EmptyState
            isFiltering={searchQuery !== '' || activeFilter !== 'All'}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Mobile & Tablet Card View */}
            <div className={`grid grid-cols-1 gap-4 lg:hidden ${viewMode === 'table' ? 'hidden max-md:grid' : ''}`}>
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Desktop & Tablet Table View */}
            <div className={`hidden md:block ${viewMode === 'card' ? 'md:hidden lg:block' : ''}`}>
              <LeadTable
                leads={filteredLeads}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            </div>
          </>
        )}
      </div>

      {/* Modal Overlay for Lead Form */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 md:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Prevent clicks inside the modal from closing it */}
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg h-full md:h-auto">
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
