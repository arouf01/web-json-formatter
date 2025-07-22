import React, { useState } from "react";
import ReactJson from "react-json-view";

const Home = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("rjv-default");
  const [selectedFormatterTheme, setSelectedFormatterTheme] = useState("white");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setParsedJson(parsed);
      setError(null);
    } catch {
      setFormattedJson("");
      setParsedJson(null);
      setError("Invalid JSON");
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
      try {
        const parsed = JSON.parse(text);
        const pretty = JSON.stringify(parsed, null, 2);
        setFormattedJson(pretty);
        setParsedJson(parsed);
        setError(null);
      } catch {
        setFormattedJson("");
        setParsedJson(null);
        setError("Invalid JSON");
      }
    } catch (err) {
      alert("Clipboard error: " + err.message);
    }
  };

  const handleChange = (e) => {
    setJsonInput(e.target.value);
    setFormattedJson("");
    setParsedJson(null);
    setError(null);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleFormatterTheme = (e) => {
    setSelectedFormatterTheme(e.target.value);
  };

  return (
    <div className="w-[90%] mx-auto p-4">
      <div className="w-[90%] mx-auto mt-20 p-4 rounded">
        {/* JSON Input Area */}
        <h2 className="text-3xl font-semibold text-center mb-6">
          JSON Formatter
        </h2>

        {/* JSON Input Area */}
        <div className="p-5 rounded border border-gray-300 shadow-sm mb-6">
          <textarea
            value={jsonInput}
            onChange={handleChange}
            className="w-full h-40 resize-none border border-gray-300 p-3 rounded font-mono text-sm focus:outline-none focus:border-blue-500"
            placeholder="Paste JSON here"
          />

          <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={formatJSON}
                className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                FORMAT JSON
              </button>
              <button
                onClick={() => {
                  setJsonInput("");
                  setFormattedJson("");
                  setParsedJson(null);
                  setError(null);
                }}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md shadow-sm hover:bg-gray-300 transition"
              >
                CLEAR
              </button>
              <button
                onClick={pasteFromClipboard}
                className="bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-700 transition"
              >
                PASTE
              </button>
            </div>

            <div className="flex flex-wrap gap-4 ml-auto">
              <div className="w-full sm:w-60">
                <label
                  htmlFor="FormatterTheme"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Choose Formatter Theme
                </label>
                <select
                  id="FormatterTheme"
                  value={selectedFormatterTheme}
                  onChange={handleFormatterTheme}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="" disabled hidden>
                    -- Choose an option --
                  </option>
                  <option value="white">Light</option>
                  <option value="black">Dark</option>
                </select>
              </div>

              <div className="w-full sm:w-60">
                <label
                  htmlFor="themeSelect"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Choose Theme
                </label>
                <select
                  id="themeSelect"
                  value={selectedTheme}
                  onChange={handleThemeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="" disabled hidden>
                    -- Choose an option --
                  </option>
                  {[
                    "rjv-default",
                    "apathy",
                    "apathy:inverted",
                    "ashes",
                    "bespin",
                    "brewer",
                    "bright",
                    "bright:inverted",
                    "chalk",
                    "codeschool",
                    "colors",
                    "eighties",
                    "embers",
                    "flat",
                    "google",
                    "grayscale",
                    "grayscale:inverted",
                    "greenscreen",
                    "harmonic",
                    "hopscotch",
                    "isotope",
                    "marrakesh",
                    "mocha",
                    "monokai",
                    "ocean",
                    "paraiso",
                    "pop",
                    "railscasts",
                    "shapeshifter",
                    "shapeshifter:inverted",
                    "solarized",
                    "summerfruit",
                    "summerfruit:inverted",
                    "threezerotwofour",
                    "tomorrow",
                    "tube",
                    "twilight",
                  ].map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formatted JSON Part */}
      <div className="w-[95%] max-w-7xl mx-auto mt-6 p-4">
        {/* Error Display */}
        {error && <p className="text-red-600 font-semibold mb-4">❌ {error}</p>}

        {/* Formatted JSON Output */}
        {parsedJson && (
          <div className="relative">
            <h2 className="text-gray-800 font-medium mb-10 text-3xl">
              Formatted JSON:
            </h2>
            <div
              className="rounded mb-6"
              style={{
                maxHeight: "30vh",
                padding: "10px",
                backgroundColor: "white",
              }}
            >
              <ReactJson
                src={parsedJson}
                name={false}
                collapsed={false}
                enableClipboard={true}
                displayDataTypes={false}
                displayObjectSize={false}
                theme={selectedTheme}
                style={{
                  backgroundColor:
                    selectedFormatterTheme === "white" ? "#ffffff" : "#000000",
                  fontSize: "16px",
                  textAlign: "left",
                  padding: "20px",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
