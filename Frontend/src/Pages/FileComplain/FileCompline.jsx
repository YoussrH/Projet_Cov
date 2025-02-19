import React, { useState } from "react";
import axios from "axios";
import problemSolvingImage from "../../assets/undraw_problem-solving_8lg7.svg"; // Adjust the path if needed

const FileCompline = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const complaintData = {
      description,
      subject,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/complaint/add", complaintData);

      if (response.status === 201) {
        alert("Complaint submitted successfully!");
      }
    } catch (error) {
      setError("There was an error submitting your complaint.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-6 w-full max-w-4xl space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={problemSolvingImage}
            alt="Problem Solving Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1">
          <h2
            className="text-2xl font-bold mb-4 text-center"
            style={{ color: "#205962" }}
          >
            Submit a Complaint
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="subject"
              >
                Subject
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                required
              >
                <option value="">Select a subject</option>
                <option value="Driver Behavior">Driver Behavior</option>
                <option value="Safety Issue">Safety Issue</option>
                <option value="Schedule Problem">Schedule Problem</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
                rows="5"
                placeholder="Describe your complaint in detail"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                style={{ background: "#205962" }}
                className="w-full text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileCompline;
