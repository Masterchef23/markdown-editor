import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownEditor() {
  const [textInput, setTextInput] = useState('# My New Project\n\nThis is an awesome project template.');
  
  // 1. This new memory slot tracks if Dark Mode is active (true or false)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const downloadReadmeFile = () => {
    const temporaryFile = new Blob([textInput], { type: 'text/plain' });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(temporaryFile);
    downloadLink.download = "README.md";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* TOP HEADER BAR */}
      <div style={{ 
        padding: '15px 20px', 
        backgroundColor: isDarkMode ? '#1a202c' : '#2d3748', // Shifts color based on theme
        color: 'white', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: isDarkMode ? '1px solid #2d3748' : 'none'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>DocuCraft README Generator</h2>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* 2. Our brand new Theme Toggler Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)} // Flips true to false, or false to true
            style={{
              backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
              color: isDarkMode ? 'white' : '#1a202c',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          <button 
            onClick={downloadReadmeFile}
            style={{
              backgroundColor: '#3182ce',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Download README.md
          </button>
        </div>
      </div>

      {/* LOWER SPLIT SCREEN CONTENT */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* LEFT SIDE: Text Input Area */}
        <div style={{ 
          flex: 1, 
          padding: '20px', 
          borderRight: isDarkMode ? '1px solid #2d3748' : '1px solid #ccc', 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: isDarkMode ? '#2d3748' : 'white' // Dynamically shifts background
        }}>
          <h3 style={{ color: isDarkMode ? '#a0aec0' : '#666', marginTop: 0 }}>Markdown Input</h3>
          <textarea
            style={{ 
              width: '100%', 
              flex: 1, 
              padding: '10px', 
              fontSize: '16px',
              fontFamily: 'monospace',
              borderRadius: '4px',
              border: isDarkMode ? '1px solid #4a5568' : '1px solid #ddd',
              backgroundColor: isDarkMode ? '#1a202c' : 'white', // Dynamically shifts text area background
              color: isDarkMode ? '#e2e8f0' : '#000', // Dynamically shifts typed text color
              resize: 'none'
            }}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        {/* RIGHT SIDE: Live Rendered Preview */}
        <div style={{ 
          flex: 1, 
          padding: '20px', 
          backgroundColor: isDarkMode ? '#1a202c' : '#f9f9f9', // Dynamically shifts background
          color: isDarkMode ? '#e2e8f0' : '#000', // Dynamically shifts output text color
          overflowY: 'auto' 
        }}>
          <h3 style={{ color: isDarkMode ? '#a0aec0' : '#666', marginTop: 0 }}>Live Preview</h3>
          <div style={{ lineHeight: '1.6' }}>
            <ReactMarkdown>{textInput}</ReactMarkdown>
          </div>
        </div>

      </div>
    </div>
  );
}
