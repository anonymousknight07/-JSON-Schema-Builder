import React from "react";
import { Field } from "../types/schema";

interface JsonPreviewProps {
  fields: Field[];
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ fields }) => {
  const buildJsonObject = (fields: Field[]): any => {
    const result: any = {};

    fields.forEach((field) => {
      if (field.name && field.name.trim()) {
        if (field.type === "Nested") {
          result[field.name] = field.children
            ? buildJsonObject(field.children)
            : {};
        } else {
          result[field.name] =
            field.value !== undefined
              ? field.value
              : field.type === "Number"
              ? 0
              : "";
        }
      }
    });

    return result;
  };

  const jsonObject = buildJsonObject(fields);
  const jsonString = JSON.stringify(jsonObject, null, 2);

  return (
    <div className="h-full">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
        JSON Preview
      </h2>
      <div className="bg-black/80 backdrop-blur-md text-white p-4 sm:p-6 rounded-xl font-mono text-xs sm:text-sm overflow-auto h-[400px] sm:h-[500px] lg:h-[600px] sticky top-6 shadow-2xl border border-white/20">
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};

export default JsonPreview;
