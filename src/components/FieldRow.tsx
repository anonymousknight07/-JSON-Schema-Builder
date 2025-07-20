import React from "react";
import { Trash2, Plus } from "lucide-react";
import { Field, FieldType } from "../types/schema";

interface FieldRowProps {
  field: Field;
  onUpdateField: (id: string, updates: Partial<Field>) => void;
  onDeleteField: (id: string) => void;
  onAddNestedField: (parentId: string) => void;
  level?: number;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  onUpdateField,
  onDeleteField,
  onAddNestedField,
  level = 0,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateField(field.id, { name: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as FieldType;
    const updates: Partial<Field> = { type: newType };

    if (newType === "String") {
      updates.value = "Default String";
      updates.children = undefined;
    } else if (newType === "Number") {
      updates.value = 0;
      updates.children = undefined;
    } else if (newType === "Nested") {
      updates.value = undefined;
      updates.children = [];
    }

    onUpdateField(field.id, updates);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      field.type === "Number" ? Number(e.target.value) : e.target.value;
    onUpdateField(field.id, { value });
  };

  const paddingLeft = level * 24;

  return (
    <div className="space-y-2">
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        style={{ marginLeft: `${paddingLeft}px` }}
      >
        <input
          type="text"
          value={field.name}
          onChange={handleNameChange}
          placeholder="Field name"
          className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 font-medium text-sm sm:text-base"
        />

        <select
          value={field.type}
          onChange={handleTypeChange}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 font-medium text-sm sm:text-base"
        >
          <option value="String">String</option>
          <option value="Number">Number</option>
          <option value="Nested">Nested</option>
        </select>

        {(field.type === "String" || field.type === "Number") && (
          <input
            type={field.type === "Number" ? "number" : "text"}
            value={field.value || ""}
            onChange={handleValueChange}
            placeholder={field.type === "Number" ? "0" : "Default value"}
            className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 font-medium text-sm sm:text-base"
          />
        )}

        {field.type === "Nested" && (
          <button
            onClick={() => onAddNestedField(field.id)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <Plus size={16} />
            <Plus size={18} />
            <span className="hidden sm:inline">Add Child Field</span>
            <span className="sm:hidden">Add Child</span>
          </button>
        )}

        <button
          onClick={() => onDeleteField(field.id)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 text-white rounded-lg hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {field.type === "Nested" &&
        field.children &&
        field.children.length > 0 && (
          <div className="space-y-2">
            {field.children.map((child) => (
              <FieldRow
                key={child.id}
                field={child}
                onUpdateField={onUpdateField}
                onDeleteField={onDeleteField}
                onAddNestedField={onAddNestedField}
                level={level + 1}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default FieldRow;
