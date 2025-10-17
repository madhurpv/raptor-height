import React from "react";
import Select from "react-select";

export default function SpeciesSelector({ speciesList = [], selectedId, onSelect }) {
  // Ensure speciesList is always an array
  const options = speciesList.map((s) => ({
    value: s.id || s.name, // fallback in case id is missing
    label: s.name || s.id
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f1f5f9",
      borderColor: "#cbd5e1",
      boxShadow: "none",
      "&:hover": { borderColor: "#94a3b8" },
      minHeight: "40px",
      borderRadius: "8px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
        ? "#e2e8f0"
        : "white",
      color: state.isSelected ? "white" : "#1e293b",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#0f172a",
      fontWeight: 500,
    }),
  };

  return (
    <div className="species-selector">
      <Select
        options={options}
        value={options.find(o => o.value === selectedId) || options[0]}
        onChange={(selected) => onSelect(selected.value)}
        placeholder="Search or select species..."
        isSearchable
        styles={customStyles}
      />
    </div>
  );
}
