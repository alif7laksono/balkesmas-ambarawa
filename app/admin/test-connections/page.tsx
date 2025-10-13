"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TestResult } from "@/app/utils/types";

export default function TestConnectionsPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, TestResult>>({});

  const runTest = async (testName: string, endpoint: string) => {
    setLoading(testName);

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setResults((prev) => ({
        ...prev,
        [testName]: data,
      }));

      if (data.success) {
        toast.success(`${testName} test passed!`);
      } else {
        toast.error(`${testName} test failed: ${data.error}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setResults((prev) => ({
        ...prev,
        [testName]: { success: false, error: errorMessage },
      }));
      toast.error(`${testName} test failed: ${errorMessage}`);
    } finally {
      setLoading(null);
    }
  };

  const runAllTests = async () => {
    setLoading("all");

    const tests = [
      { name: "MongoDB", endpoint: "/api/test/mongodb" },
      { name: "S3", endpoint: "/api/test/s3" },
      { name: "Integration", endpoint: "/api/test/integration" },
    ];

    for (const test of tests) {
      await runTest(test.name, test.endpoint);
    }

    setLoading(null);
  };

  const TestButton = ({
    name,
    endpoint,
  }: {
    name: string;
    endpoint: string;
  }) => (
    <button
      onClick={() => runTest(name, endpoint)}
      disabled={loading !== null}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading === name ? "Testing..." : `Test ${name}`}
    </button>
  );

  const ResultDisplay = ({
    name,
    result,
  }: {
    name: string;
    result?: TestResult;
  }) => (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">{name}</h3>
      {result ? (
        <div
          className={`p-3 rounded ${
            result.success
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{result.success ? "✅ PASS" : "❌ FAIL"}</span>
            <span className="text-sm text-gray-600">{result.timestamp}</span>
          </div>
          {result.error && (
            <div className="mt-2 p-2 bg-red-50 rounded">
              <strong>Error:</strong> {result.error}
            </div>
          )}
          {result.details && (
            <div className="mt-2 text-sm">
              <pre>{JSON.stringify(result.details, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500">Not tested yet</div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Connection Tests</h1>

      {/* Test Buttons */}
      <div className="flex gap-4 flex-wrap">
        <TestButton name="MongoDB" endpoint="/api/test/mongodb" />
        <TestButton name="S3" endpoint="/api/test/s3" />
        <TestButton name="Integration" endpoint="/api/test/integration" />
        <button
          onClick={runAllTests}
          disabled={loading !== null}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading === "all" ? "Running All Tests..." : "Run All Tests"}
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-4 md:grid-cols-2">
        <ResultDisplay name="MongoDB" result={results["MongoDB"]} />
        <ResultDisplay name="S3" result={results["S3"]} />
        <ResultDisplay name="Integration" result={results["Integration"]} />
      </div>

      {/* Environment Info */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Environment Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            MongoDB URI: {process.env.MONGODB_URI ? "✅ Set" : "❌ Missing"}
          </div>
          <div>S3 Bucket: {process.env.S3_BUCKET_NAME || "❌ Missing"}</div>
          <div>S3 Endpoint: {process.env.S3_ENDPOINT || "❌ Missing"}</div>
          <div>AWS Region: {process.env.AWS_REGION || "❌ Missing"}</div>
        </div>
      </div>
    </div>
  );
}
