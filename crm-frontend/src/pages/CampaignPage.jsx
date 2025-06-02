import { useState, useEffect } from "react";
import axios from "axios";

export default function CampaignPage() {
  const [segments, setSegments] = useState([]);
  const [segmentId, setSegmentId] = useState("");
  const [message, setMessage] = useState("Hi {{name}}, enjoy 10% off!");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/segments");
        setSegments(data);
      } catch (err) {
        console.error("Error fetching segments:", err);
      }
    };
    fetchSegments();
  }, []);

  const sendCampaign = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/campaigns", {
        segmentId,
        message,
      });
      setResult(data);
    } catch (err) {
      console.error("Error sending campaign:", err);
      alert("Campaign failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Campaign</h2>

      <div className="mb-4">
        <label className="block font-semibold">Select Segment</label>
        <select
          className="border p-2 w-full"
          value={segmentId}
          onChange={(e) => setSegmentId(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {segments.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Message Template</label>
        <textarea
          className="border p-2 w-full"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Use <code>{"{{name}}"}</code> to personalize
        </p>
      </div>

      <button
        onClick={sendCampaign}
        disabled={!segmentId || !message}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🚀 Send Campaign
      </button>

      {result && (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <p className="font-bold">📬 Campaign Sent!</p>
          <p>✅ Sent: {result.delivery.sent}</p>
          <p>❌ Failed: {result.delivery.failed}</p>
          <p>📦 Total: {result.campaign.stats.total}</p>
        </div>
      )}
    </div>
  );
}
