import React, { useState } from "react";
import ReactJson from "react-json-view";

const Home = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("rjv-default");
  const [selectedFormatterTheme, setSelectedFormatterTheme] = useState("white");
  const [selectedFormatterDataTypes, setSelectedFormatterDataTypes] =
    useState("true");
  const [selecteddisplayObjectSize, setSelecteddisplayObjectSize] =
    useState("true");
  const [selectedIconStyle, setSelectediconStyle] = useState("triangle");

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
  const handleFormatterDataTypes = (e) => {
    setSelectedFormatterDataTypes(e.target.value);
  };

  const handledisplayObjectSize = (e) => {
    setSelecteddisplayObjectSize(e.target.value);
  };
  const handleIconStyle = (e) => {
    setSelectediconStyle(e.target.value);
  };

  return (
    <div className="w-[90%] mx-auto p-4">
      <div className="w-[90%] mx-auto mt-20 p-4 rounded-lg bg-white shadow-xl">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          JSON Formatter
        </h2>

        {/* Input Area */}
        <div className="p-6 rounded-lg border border-gray-200 shadow-lg bg-gray-50 mb-8">
          <textarea
            value={jsonInput}
            onChange={handleChange}
            className="w-full h-40 resize-none border border-gray-300 p-4 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
            placeholder="Paste JSON here"
          />

          {/* Buttons in one row */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">
            <button
              onClick={formatJSON}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
              className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:from-gray-300 hover:to-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              CLEAR
            </button>
            <button
              onClick={pasteFromClipboard}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              PASTE
            </button>
          </div>

          {/* Select Fields in one scrollable row */}
          <div className="flex flex-nowrap gap-3 mt-6 pb-3 justify-center ">
            {/* Formatter Theme */}
            <div className="min-w-[18%] flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Formatter Theme
              </label>
              <select
                value={selectedFormatterTheme}
                onChange={handleFormatterTheme}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="white">Light</option>
                <option value="black">Dark</option>
              </select>
            </div>

            {/* Display Data Types */}
            <div className="min-w-[18%] flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Display Data Types
              </label>
              <select
                value={selectedFormatterDataTypes}
                onChange={handleFormatterDataTypes}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="true">Enable</option>
                <option value="false">Disable</option>
              </select>
            </div>

            {/* Display Object Size */}
            <div className="min-w-[18%] flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Display Object Size
              </label>
              <select
                value={selecteddisplayObjectSize}
                onChange={handledisplayObjectSize}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="true">Enable</option>
                <option value="false">Disable</option>
              </select>
            </div>

            {/* Icon Style */}
            <div className="min-w-[18%] flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Icon Style
              </label>
              <select
                value={selectedIconStyle}
                onChange={handleIconStyle}
                className=" z-10 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              >
                <option value="triangle">Triangle</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
              </select>
            </div>

            {/* Formatter Style */}
            <div className="min-w-[18%] flex-shrink-0">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Formatter Style
              </label>
              <select
                value={selectedTheme}
                onChange={handleThemeChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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

      {/* Formatted JSON Part */}
      <div className="w-[95%] max-w-7xl mx-auto mt-5 p-4">
        {/* Error Display */}
        {error && <p className="text-red-600 font-semibold mb-4">❌ {error}</p>}

        {/* Formatted JSON Output */}
        {parsedJson && (
          <div className="relative">
            <h2 className="text-gray-800 font-medium mb-5 text-3xl">
              Formatted JSON:
            </h2>
            <div
              className="rounded mb-6"
              style={{
                maxHeight: "15vh",
                padding: "10px",
                backgroundColor: "white",
              }}
            >
              <ReactJson
                src={parsedJson}
                collapsed={false}
                enableClipboard={true}
                displayDataTypes={selectedFormatterDataTypes === "true"}
                displayObjectSize={selecteddisplayObjectSize === "true"}
                iconStyle={selectedIconStyle}
                theme={selectedTheme}
                style={{
                  backgroundColor: `${selectedFormatterTheme}`,
                  fontSize: "16px",
                  textAlign: "left",
                  padding: "20px",
                  overflowX: "auto",
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
