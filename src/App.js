import React, { useState, } from 'react';
import FieldPalette from './components/FieldPalette';
import FieldContainer from './components/FieldContainer';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [activeTab] = useState('tab1');
  const [tabs, setTabs] = useLocalStorage('formBuilderTabs', {
    tab1: [],
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldData = e.dataTransfer.getData('application/json');
    if (fieldData) {
      const field = JSON.parse(fieldData);
      addField(field);
    }
  };

  const addField = (field) => {
    const newField = {
      ...field,
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tab: activeTab
    };

    setTabs(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newField]
    }));
  };

  const updateField = (fieldId, updates) => {
    setTabs(prev => {
      const newTabs = { ...prev };
      newTabs[activeTab] = newTabs[activeTab].map(f =>
        f.id === fieldId ? { ...f, ...updates } : f
      );
      return newTabs;
    });
  };

  const removeField = (fieldId) => {
    setTabs(prev => {
      const newTabs = { ...prev };
      newTabs[activeTab] = newTabs[activeTab].filter(f => f.id !== fieldId);
      return newTabs;
    });
  };

  const reorderFields = (result) => {
    if (!result.destination) return;

    setTabs(prev => {
      const newTabs = { ...prev };
      const items = Array.from(newTabs[activeTab]);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      newTabs[activeTab] = items;
      return newTabs;
    });
  };

  return (
    <div className="app">

      <div className="workspace">
        <FieldPalette />

        <FieldContainer
          fields={tabs[activeTab] || []}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          updateField={updateField}
          removeField={removeField}
          reorderFields={reorderFields}          
        />
      </div>
    </div>
  );
}

export default App;