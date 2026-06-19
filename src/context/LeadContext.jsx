import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * TypeScript-style shape description of the Lead object.
 * 
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier (UUID).
 * @property {string} name - Full name of the lead contact.
 * @property {string} company - Name of the lead's company.
 * @property {string} email - Email address.
 * @property {string} phone - Phone number.
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Pipeline stage.
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Acquisition channel.
 * @property {string} createdAt - ISO 8601 date string representing creation time.
 */

// Create the context object
export const LeadContext = createContext(undefined);

/**
 * LeadProvider component wraps the React app hierarchy to provide
 * global state and CRUD functions for managing client leads.
 *
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components.
 */
export const LeadProvider = ({ children }) => {
  // Use custom useLocalStorage hook to manage state persistence automatically
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead. Automatically generates a unique UUID and inserts a createdAt timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Lead details to create.
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    setLeads((prevLeads) => [newLead, ...prevLeads]);
  };

  /**
   * Updates an existing lead's fields by ID.
   *
   * @param {string} id - Unique identifier of the target lead.
   * @param {Partial<Omit<Lead, 'id' | 'createdAt'>>} updatedData - Modified fields.
   */
  const updateLead = (id, updatedData) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead))
    );
  };

  /**
   * Deletes a lead matching the given ID.
   *
   * @param {string} id - Unique identifier of the target lead.
   */
  const deleteLead = (id) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  /**
   * Looks up and returns a single lead object by ID.
   *
   * @param {string} id - Unique identifier.
   * @returns {Lead | undefined} The matching lead object or undefined if not found.
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom React hook to consume LeadContext.
 * Throws a descriptive runtime error if context is accessed outside of LeadProvider.
 *
 * @returns {{
 *   leads: Lead[],
 *   addLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void,
 *   updateLead: (id: string, updatedData: Partial<Lead>) => void,
 *   deleteLead: (id: string) => void,
 *   getLeadById: (id: string) => Lead | undefined
 * }} Lead context values.
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider. Ensure your component tree is wrapped.');
  }
  return context;
};
