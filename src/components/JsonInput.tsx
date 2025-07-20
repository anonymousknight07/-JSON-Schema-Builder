import React, { useState } from "react";
import { Wand2, AlertCircle } from "lucide-react";

const JsonInput: React.FC = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [beautifiedJson, setBeautifiedJson] = useState("");
  const [error, setError] = useState("");

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    setError("");
    setBeautifiedJson("");
  };

  const beautifyJson = () => {
    try {
      if (!jsonInput.trim()) {
        setError("Please enter some JSON to beautify");
        setBeautifiedJson("");
        return;
      }

      const parsed = JSON.parse(jsonInput);
      const beautified = JSON.stringify(parsed, null, 2);
      setBeautifiedJson(beautified);
      setError("");
    } catch (err) {
      setError(
        `Invalid JSON format: ${
          err instanceof Error ? err.message : "Please check your syntax"
        }`
      );
      setBeautifiedJson("");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setBeautifiedJson("");
    setError("");
  };

  return (
    <div className="h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bitcount font-bold text-white">
          JSON Input & Beautifier
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={beautifyJson}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <Wand2 size={16} />
            Beautify JSON
          </button>
          <button
            onClick={clearAll}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-[500px] sm:h-[600px]">
      
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bitcount  text-white mb-2">
              Paste your JSON here:
            </label>
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              placeholder='{"name": "John", "age": 30, "city": "New York"}'
              className="w-full h-[400px] sm:h-[500px] p-4 sm:p-6 border border-white/20 bg-white/90 backdrop-blur-md rounded-xl font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 shadow-inner"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 shadow-md">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Beautified JSON:
            </label>
            <div className="h-[400px] sm:h-[500px] bg-black/80 backdrop-blur-md text-white p-4 sm:p-6 rounded-xl font-mono text-xs sm:text-sm overflow-auto shadow-2xl border border-white/20">
              {beautifiedJson ? (
                <pre className="whitespace-pre-wrap">{beautifiedJson}</pre>
              ) : (
                <div className="text-gray-400 italic">
                  Beautified JSON will appear here after clicking "Beautify
                  JSON"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonInput;
