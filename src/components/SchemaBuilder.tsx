import React, { useState } from "react";
import { Plus, FileCog, FileJson, BadgePlus } from "lucide-react";
import { Field, FieldType, ArrayElement } from "../types/schema";

interface FieldRowProps {
  field: Field;
  onUpdateField: (id: string, updates: Partial<Field>) => void;
  onDeleteField: (id: string) => void;
  onAddNestedField: (parentId: string) => void;
  onAddArrayElement: (fieldId: string, newElement: ArrayElement) => void;
  onDeleteArrayElement: (fieldId: string, elementIndex: number) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  onUpdateField,
  onDeleteField,
  onAddNestedField,
  onAddArrayElement,
  onDeleteArrayElement,
}) => {
  const handleTypeChange = (newType: FieldType) => {
    let newValue: string | number | boolean | ArrayElement[];
    if (newType === "String") newValue = "Default String";
    else if (newType === "Number") newValue = 0;
    else if (newType === "Boolean") newValue = false;
    else if (newType === "Array") newValue = [];
    else newValue = {};

    onUpdateField(field.id, { type: newType, value: newValue });
  };

  const handleAddArrayElement = () => {
    const newElement: ArrayElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: "String",
      value: "Array Item",
    };
    onAddArrayElement(field.id, newElement);
  };

  return (
    <div className="border border-white/20 rounded-xl p-4 bg-white/5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input
          type="text"
          value={field.name}
          onChange={(e) => onUpdateField(field.id, { name: e.target.value })}
          placeholder="Field name"
          className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <select
          value={field.type}
          onChange={(e) => handleTypeChange(e.target.value as FieldType)}
          className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.5rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.5em 1.5em",
          }}
        >
          <option value="String" className="bg-gray-900 text-white">
            String
          </option>
          <option value="Number" className="bg-gray-900 text-white">
            Number
          </option>
          <option value="Boolean" className="bg-gray-900 text-white">
            Boolean
          </option>
          <option value="Array" className="bg-gray-900 text-white">
            Array
          </option>
          <option value="Nested" className="bg-gray-900 text-white">
            Nested
          </option>
        </select>
        <div className="flex gap-2">
          {field.type === "Nested" && (
            <button
              onClick={() => onAddNestedField(field.id)}
              className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex-1"
            >
              <Plus size={16} />
            </button>
          )}
          {field.type === "Array" && (
            <button
              onClick={handleAddArrayElement}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex-1"
            >
              <Plus size={16} />
            </button>
          )}
          <button
            onClick={() => onDeleteField(field.id)}
            className="px-3 py-2 bg-red-500 font-bitcount font-semibold text-white rounded-lg hover:bg-red-600 transition-colors flex-1"
          >
            Delete
          </button>
        </div>
      </div>

      {field.type !== "Nested" && (
        <div className="mt-3">
          {field.type === "String" && (
            <input
              type="text"
              value={(field.value as string) || ""}
              onChange={(e) =>
                onUpdateField(field.id, { value: e.target.value })
              }
              placeholder="Default value"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          )}
          {field.type === "Number" && (
            <input
              type="number"
              value={(field.value as number) || 0}
              onChange={(e) =>
                onUpdateField(field.id, { value: Number(e.target.value) })
              }
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          )}
          {field.type === "Boolean" && (
            <select
              value={(field.value as boolean).toString()}
              onChange={(e) =>
                onUpdateField(field.id, { value: e.target.value === "true" })
              }
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.5rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="true" className="bg-gray-900 text-white">
                true
              </option>
              <option value="false" className="bg-gray-900 text-white">
                false
              </option>
            </select>
          )}
        </div>
      )}

      {field.type === "Array" && field.value && Array.isArray(field.value) && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-white">Array Elements:</h4>
            <span className="text-xs text-gray-400">
              {(field.value as ArrayElement[]).length} item
              {(field.value as ArrayElement[]).length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2 pl-4 border-l-2 border-blue-500/30">
            {(field.value as ArrayElement[]).map((element, index) => (
              <div
                key={element.id || index}
                className="flex gap-2 items-center"
              >
                <select
                  value={element.type}
                  onChange={(e) => {
                    const newType = e.target.value as
                      | "String"
                      | "Number"
                      | "Boolean";
                    let newValue: string | number | boolean;
                    if (newType === "String") newValue = "Array Item";
                    else if (newType === "Number") newValue = 0;
                    else newValue = false;

                    const newArray = [...(field.value as ArrayElement[])];
                    newArray[index] = {
                      ...element,
                      type: newType,
                      value: newValue,
                    };
                    onUpdateField(field.id, { value: newArray });
                  }}
                  className="px-2 py-1 text-sm rounded bg-white/10 border border-white/20 text-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right 0.3rem center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1em 1em",
                  }}
                >
                  <option value="String" className="bg-gray-900 text-white">
                    String
                  </option>
                  <option value="Number" className="bg-gray-900 text-white">
                    Number
                  </option>
                  <option value="Boolean" className="bg-gray-900 text-white">
                    Boolean
                  </option>
                </select>

                {element.type === "String" && (
                  <input
                    type="text"
                    value={element.value as string}
                    onChange={(e) => {
                      const newArray = [...(field.value as ArrayElement[])];
                      newArray[index] = { ...element, value: e.target.value };
                      onUpdateField(field.id, { value: newArray });
                    }}
                    className="flex-1 px-2 py-1 text-sm rounded bg-white/10 border border-white/20 text-white"
                    placeholder="Array item value"
                  />
                )}

                {element.type === "Number" && (
                  <input
                    type="number"
                    value={element.value as number}
                    onChange={(e) => {
                      const newArray = [...(field.value as ArrayElement[])];
                      newArray[index] = {
                        ...element,
                        value: Number(e.target.value),
                      };
                      onUpdateField(field.id, { value: newArray });
                    }}
                    className="flex-1 px-2 py-1 text-sm rounded bg-white/10 border border-white/20 text-white"
                  />
                )}

                {element.type === "Boolean" && (
                  <select
                    value={(element.value as boolean).toString()}
                    onChange={(e) => {
                      const newArray = [...(field.value as ArrayElement[])];
                      newArray[index] = {
                        ...element,
                        value: e.target.value === "true",
                      };
                      onUpdateField(field.id, { value: newArray });
                    }}
                    className="flex-1 px-2 py-1 text-sm rounded bg-white/10 border border-white/20 text-white appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: "right 0.3rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1em 1em",
                    }}
                  >
                    <option value="true" className="bg-gray-900 text-white">
                      true
                    </option>
                    <option value="false" className="bg-gray-900 text-white">
                      false
                    </option>
                  </select>
                )}

                <button
                  onClick={() => onDeleteArrayElement(field.id, index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {field.children && field.children.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-white/20">
          {field.children.map((child) => (
            <div key={child.id} className="mt-3">
              <FieldRow
                field={child}
                onUpdateField={onUpdateField}
                onDeleteField={onDeleteField}
                onAddNestedField={onAddNestedField}
                onAddArrayElement={onAddArrayElement}
                onDeleteArrayElement={onDeleteArrayElement}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface JsonPreviewProps {
  fields: Field[];
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ fields }) => {
  const generateJson = (fields: Field[]): Record<string, any> => {
    const result: Record<string, any> = {};
    fields.forEach((field) => {
      if (field.type === "Nested" && field.children) {
        result[field.name] = generateJson(field.children);
      } else if (field.type === "Array" && Array.isArray(field.value)) {
        result[field.name] = (field.value as ArrayElement[]).map(
          (item) => item.value
        );
      } else {
        result[field.name] = field.value;
      }
    });
    return result;
  };

  const jsonOutput = generateJson(fields);

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bitcount font-semibold text-white mb-6">
        JSON Preview
      </h2>
      <div className="bg-black/30 rounded-xl p-4 border border-white/10">
        <pre className="text-green-400 text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          {JSON.stringify(jsonOutput, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const JsonInput: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleJsonParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedData(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
      setParsedData(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bitcount font-bold text-white mb-6">
        JSON Input
      </h2>
      <div className="space-y-4">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="w-full h-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono text-sm"
        />
        <button
          onClick={handleJsonParse}
          className="px-6 py-3 bg-white font-bitcount font-semibold text-black rounded-xl hover:bg-gray-200 transition-colors font-medium"
        >
          Parse JSON
        </button>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
            {error}
          </div>
        )}

        {parsedData && (
          <div className="bg-black/30 rounded-xl p-4 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">
              Parsed Result:
            </h3>
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

const SchemaBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"builder" | "input">("builder");
  const [fields, setFields] = useState<Field[]>([
    {
      id: "1",
      name: "example_string",
      type: "String",
      value: "Default String",
    },
    {
      id: "2",
      name: "example_number",
      type: "Number",
      value: 0,
    },
  ]);

  const generateId = (): string => Math.random().toString(36).substr(2, 9);

  const updateFieldsRecursively = (
    fields: Field[],
    id: string,
    updates: Partial<Field>
  ): Field[] => {
    return fields.map((field) => {
      if (field.id === id) {
        return { ...field, ...updates };
      }
      if (field.children) {
        return {
          ...field,
          children: updateFieldsRecursively(field.children, id, updates),
        };
      }
      return field;
    });
  };

  const removeFieldRecursively = (fields: Field[], id: string): Field[] => {
    return fields.filter((field) => {
      if (field.id === id) return false;
      if (field.children) {
        field.children = removeFieldRecursively(field.children, id);
      }
      return true;
    });
  };

  const addNestedFieldRecursively = (
    fields: Field[],
    parentId: string,
    newField: Field
  ): Field[] => {
    return fields.map((field) => {
      if (field.id === parentId && field.type === "Nested") {
        return {
          ...field,
          children: [...(field.children || []), newField],
        };
      }
      if (field.children) {
        return {
          ...field,
          children: addNestedFieldRecursively(
            field.children,
            parentId,
            newField
          ),
        };
      }
      return field;
    });
  };

  const handleAddField = () => {
    const newField: Field = {
      id: generateId(),
      name: "new_field",
      type: "String",
      value: "Default String",
    };
    setFields([...fields, newField]);
  };

  const handleUpdateField = (id: string, updates: Partial<Field>) => {
    setFields((prevFields) => updateFieldsRecursively(prevFields, id, updates));
  };

  const handleDeleteField = (id: string) => {
    setFields((prevFields) => removeFieldRecursively(prevFields, id));
  };

  const handleAddNestedField = (parentId: string) => {
    const newField: Field = {
      id: generateId(),
      name: "nested_field",
      type: "String",
      value: "Default String",
    };
    setFields((prevFields) =>
      addNestedFieldRecursively(prevFields, parentId, newField)
    );
  };

  const handleAddArrayElement = (fieldId: string, newElement: ArrayElement) => {
    setFields((prevFields) => {
      const updateArrayField = (fields: Field[]): Field[] => {
        return fields.map((field) => {
          if (field.id === fieldId) {
            const currentArray = Array.isArray(field.value)
              ? (field.value as ArrayElement[])
              : [];
            return {
              ...field,
              value: [...currentArray, newElement],
            };
          }
          if (field.children) {
            return {
              ...field,
              children: updateArrayField(field.children),
            };
          }
          return field;
        });
      };
      return updateArrayField(prevFields);
    });
  };

  const handleDeleteArrayElement = (fieldId: string, elementIndex: number) => {
    setFields((prevFields) => {
      const updateArrayField = (fields: Field[]): Field[] => {
        return fields.map((field) => {
          if (field.id === fieldId && Array.isArray(field.value)) {
            const newArray = (field.value as ArrayElement[]).filter(
              (_, index) => index !== elementIndex
            );
            return {
              ...field,
              value: newArray,
            };
          }
          if (field.children) {
            return {
              ...field,
              children: updateArrayField(field.children),
            };
          }
          return field;
        });
      };
      return updateArrayField(prevFields);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gradient-to-br from-white/20 via-blue-200/20 to-purple-200/20 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/30">
              <img
                src="/{}.png"
                alt="JSON Schema Builder"
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bitcount font-semibold text-white mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            {`{JSON}`} Schema Builder
          </h1>
          <p className="text-lg sm:text-xl font-bitcount font-semibold text-gray-300 max-w-2xl mx-auto">
            Create and visualize JSON schemas with an intuitive interface
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-1">
            <button
              onClick={() => setActiveTab("builder")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center gap-3 transition-all duration-300 font-medium text-base sm:text-lg ${
                activeTab === "builder"
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "text-white hover:text-gray-300 hover:bg-white/20"
              }`}
            >
              <FileCog />
              <span className="font-bitcount font-semibold">
                Schema Builder
              </span>
            </button>
            <button
              onClick={() => setActiveTab("input")}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center gap-3 transition-all duration-300 font-medium text-base sm:text-lg ${
                activeTab === "input"
                  ? "bg-white text-black shadow-lg transform scale-105"
                  : "text-white hover:text-gray-300 hover:bg-white/20"
              }`}
            >
              <FileJson size={20} />
              <span className="font-bitcount font-semibold">JSON Input</span>
            </button>
          </div>
        </div>

        {activeTab === "builder" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bitcount font-semifont sm:text-3xl font-bold text-white">
                  Define Your Schema
                </h2>
                <button
                  onClick={handleAddField}
                  className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <BadgePlus size={20} />
                  <span className="font-bitcount font-bold">Add Field</span>
                </button>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                {fields.length === 0 ? (
                  <div className="text-center py-12 text-gray-300">
                    <p className="text-lg font-bitcount font-medium">
                      No fields defined. Click "Add Field" to get started.
                    </p>
                  </div>
                ) : (
                  fields.map((field) => (
                    <FieldRow
                      key={field.id}
                      field={field}
                      onUpdateField={handleUpdateField}
                      onDeleteField={handleDeleteField}
                      onAddNestedField={handleAddNestedField}
                      onAddArrayElement={handleAddArrayElement}
                      onDeleteArrayElement={handleDeleteArrayElement}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <JsonPreview fields={fields} />
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
            <JsonInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemaBuilder;
