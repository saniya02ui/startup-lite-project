import React, { createContext, useContext, useState, useCallback } from 'react';
import { leadService } from '../services/leadService';
import toast from 'react-hot-toast';

export const LeadContext = createContext(undefined);

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const fetchLeads = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const { data, pagination: pagInfo } = await leadService.getLeads(params);
      setLeads(data);
      setPagination(pagInfo);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addLead = async (leadData) => {
    setIsLoading(true);
    try {
      const { data } = await leadService.createLead(leadData);
      setLeads((prev) => [data, ...prev]);
      toast.success('Lead created successfully');
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => toast.error(err.message));
      } else {
        toast.error(error.response?.data?.message || 'Failed to create lead');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLead = async (id, updatedData) => {
    setIsLoading(true);
    try {
      const { data } = await leadService.updateLead(id, updatedData);
      setLeads((prev) => prev.map((lead) => (lead._id === id ? data : lead)));
      toast.success('Lead updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLead = async (id) => {
    setIsLoading(true);
    try {
      await leadService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getLeadById = (id) => {
    return leads.find((lead) => lead._id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, isLoading, pagination, fetchLeads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
