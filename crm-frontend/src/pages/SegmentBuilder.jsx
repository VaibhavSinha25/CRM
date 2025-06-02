import React, { useState } from "react";
import axios from "axios";

const FIELDS = ["totalSpend", "visitCount", "lastActive"];
const OPERATORS = [">", ">=", "<", "<=", "=", "!=", "in", "not_in"];

export default function SegmentBuilder() {
  const [rules, setRules] = useState([
    { field: "totalSpend", operator: ">", value: 10000 },
  ]);
  const [combineWith, setCombineWith] = useState("AND");
  const [segmentName, setSegmentName] = useState("");
  const [previewResult, setPreviewResult] = useState(null);

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const addRule = () => {
    setRules([...rules, { field: "visitCount", operator: "<", value: 3 }]);
  };

  const removeRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handlePreview = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/segments/preview",
        {
          rules,
          combineWith,
        }
      );
      setPreviewResult(data);
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/segments", {
        name: segmentName,
        ruleGroup: {
          rules,
          combineWith,
        },
      });
      alert("Segment saved: " + data.name);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Segment Builder</h2>

      {rules.map((rule, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <select
            value={rule.field}
            onChange={(e) => handleRuleChange(index, "field", e.target.value)}
            className="border p-1"
          >
            {FIELDS.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          <select
            value={rule.operator}
            onChange={(e) =>
              handleRuleChange(index, "operator", e.target.value)
            }
            className="border p-1"
          >
            {OPERATORS.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={rule.value}
            onChange={(e) => handleRuleChange(index, "value", e.target.value)}
            className="border p-1 w-24"
          />

          <button onClick={() => removeRule(index)} className="text-red-500">
            ❌
          </button>
        </div>
      ))}

      <button onClick={addRule} className="bg-gray-200 px-2 py-1 rounded mb-2">
        ➕ Add Rule
      </button>

      <div className="mb-2">
        Combine with:
        <select
          value={combineWith}
          onChange={(e) => setCombineWith(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <div className="mb-2">
        Segment Name:{" "}
        <input
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="border p-1"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePreview}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          🔍 Preview
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          💾 Save Segment
        </button>
      </div>

      {previewResult && (
        <div className="mt-4">
          <p>👥 Audience Size: {previewResult.count}</p>
          <pre className="bg-gray-100 p-2 mt-2 text-sm overflow-x-auto">
            {JSON.stringify(previewResult.sample, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
