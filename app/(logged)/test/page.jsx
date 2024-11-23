'use client';

import QuestionsOpt from "@/components/QuestionsOpt";
import { useEffect, useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await fetch("https://0be5-27-34-70-65.ngrok-free.app//api/v1/mocktest");

        // Check if the response is valid and if it returns JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType.includes("application/json")) {
          const errorText = await res.text(); // Read the full response (likely HTML error)
          throw new Error(`Error: ${res.status} - ${errorText}`);
        }

        // Parse JSON if valid
        const data = await res.json();
        setQuestions(data); // Assuming API returns an array of questions
      } catch (error) {
        setError(error.message); // Display error to the user
      } finally {
        setLoading(false); // Always stop the loading spinner
      }
    };

    fetchTestData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading questions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : questions.length > 0 ? (
        <QuestionsOpt questions={questions} />
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
};

export default Page;
