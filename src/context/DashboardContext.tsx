import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import type {
  Employee,
  KPICardData,
  FilterState,
  AppSimulationState,
} from '../types';
import {
  MOCK_EMPLOYEES,
  MOCK_KPIS,
} from '../data/mockData';

interface DashboardContextType {
  themeMode: 'light' | 'dark';
  toggleThemeMode: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
  activeNavSection: string;
  setActiveNavSection: (section: string) => void;
  handleNavigate: (sectionId: string) => void;
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  simulationState: AppSimulationState;
  setSimulationState: (state: AppSimulationState) => void;
  filteredEmployees: Employee[];
  kpis: KPICardData[];
  selectedEmployee: Employee | null;
  setSelectedEmployee: (emp: Employee | null) => void;
  refreshData: () => void;
}

const initialFilters: FilterState = {
  datePreset: 'today',
  startDate: '',
  endDate: '',
  department: '',
  location: '',
  status: '',
  workMode: '',
  search: '',
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state with localStorage persistence
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('workforce_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  useEffect(() => {
    localStorage.setItem('workforce_theme', themeMode);
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sidebar states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeNavSection, setActiveNavSection] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // Simulation state for reviewers to test Loading, Error, and Empty states easily
  const [simulationState, setSimulationState] = useState<AppSimulationState>('normal');

  // Filters state
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Handle sidebar navigation action
  const handleNavigate = (sectionId: string) => {
    setActiveNavSection(sectionId);
    setMobileDrawerOpen(false);

    if (sectionId === 'leaves') {
      setFilter('status', 'On Leave');
      const el = document.getElementById('workforce-table-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'workforce') {
      setFilter('status', '');
      const el = document.getElementById('workforce-table-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'attendance') {
      const el = document.getElementById('attendance-chart-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'departments') {
      const el = document.getElementById('department-chart-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'analytics') {
      const el = document.getElementById('visual-charts-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'dashboard') {
      const el = document.getElementById('kpi-cards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'reports') {
      const el = document.getElementById('filters-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.department) count++;
    if (filters.location) count++;
    if (filters.status) count++;
    if (filters.workMode) count++;
    if (filters.search) count++;
    if (filters.datePreset !== 'today') count++;
    return count;
  }, [filters]);

  // Employee detail modal state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Compute filtered employees based on current filter values
  const filteredEmployees = useMemo(() => {
    if (simulationState === 'empty') {
      return [];
    }

    return MOCK_EMPLOYEES.filter((emp) => {
      // Department filter
      if (filters.department && emp.department !== filters.department) {
        return false;
      }
      // Location filter
      if (filters.location && emp.location !== filters.location) {
        return false;
      }
      // Status filter
      if (filters.status && emp.status !== filters.status) {
        return false;
      }
      // Work mode filter
      if (filters.workMode && emp.workMode !== filters.workMode) {
        return false;
      }
      // Search query (search name, role, email, skills)
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesName = emp.name.toLowerCase().includes(q);
        const matchesRole = emp.role.toLowerCase().includes(q);
        const matchesDept = emp.department.toLowerCase().includes(q);
        const matchesEmail = emp.email.toLowerCase().includes(q);
        const matchesId = emp.id.toLowerCase().includes(q);
        const matchesSkills = emp.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesRole && !matchesDept && !matchesEmail && !matchesId && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [filters, simulationState]);

  // Adjust KPI cards dynamically based on department or status filters
  const kpis = useMemo(() => {
    if (filters.department) {
      const deptCount = filteredEmployees.length;
      return MOCK_KPIS.map((kpi) => {
        if (kpi.metricType === 'workforce') {
          return {
            ...kpi,
            value: deptCount > 0 ? String(deptCount * 28) : '0',
            subtitle: `${filters.department} Headcount Filtered`,
          };
        }
        return kpi;
      });
    }
    return MOCK_KPIS;
  }, [filters.department, filteredEmployees]);

  // Refresh handler to reset simulation or re-fetch data
  const refreshData = () => {
    setSimulationState('loading');
    setTimeout(() => {
      setSimulationState('normal');
    }, 700);
  };

  return (
    <DashboardContext.Provider
      value={{
        themeMode,
        toggleThemeMode,
        sidebarCollapsed,
        toggleSidebar,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        activeNavSection,
        setActiveNavSection,
        handleNavigate,
        filters,
        setFilter,
        resetFilters,
        activeFilterCount,
        simulationState,
        setSimulationState,
        filteredEmployees,
        kpis,
        selectedEmployee,
        setSelectedEmployee,
        refreshData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
