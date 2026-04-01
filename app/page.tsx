"use client";

import React, { useState } from "react";

export default function Dashboard() {
  // GPA Calculator State
  const [courses, setCourses] = useState([{ id: 1, credits: "", grade: "" }]);
  const [gpaResult, setGpaResult] = useState<string | null>(null);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hi! I am the OUSL Assistant powered by Gemini 2.5 Flash. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // --- GPA Logic ---
  const addCourseRow = () => {
    setCourses([...courses, { id: Date.now(), credits: "", grade: "" }]);
  };

  const removeCourseRow = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const handleCourseChange = (id: number, field: string, value: string) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)));
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let validRows = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const gradeVal = parseFloat(course.grade);
      if (!isNaN(credits) && !isNaN(gradeVal)) {
        totalCredits += credits;
        totalPoints += credits * gradeVal;
        validRows++;
      }
    });

    if (validRows > 0 && totalCredits > 0) {
      setGpaResult((totalPoints / totalCredits).toFixed(2));
    } else {
      alert("Please select at least one valid course and enter the grade to calculate your GPA.");
    }
  };

  // --- Chatbot Logic ---
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      setChatMessages((prev) => [...prev, { sender: "bot", text: data.reply || "Sorry, something went wrong." }]);
    } catch (error) {
      setChatMessages((prev) => [...prev, { sender: "bot", text: "Error: Could not connect to AI. Please try again." }]);
    }
    setIsTyping(false);
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo">
            <img src="/path_to_your_logo.png" alt="OUSL Logo" />
            <span>OUSL STUDENT HUB</span>
          </div>
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#course-section">Courses</a></li>
              <li><a href="#gpa-section">GPA Calculator</a></li>
              <li><a href="#notices-section">Notices</a></li>
              <li><a href="#" className="btn-logout">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dashboard-header fade-in-left">
        <div className="container">
          <h1>Student Dashboard</h1>
          <p>Access your course materials, calculate your GPA, and stay updated with campus news.</p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="feature-cards">
            <div className="card slide-up">
              <img src="/icon_course_materials.png" alt="Course Materials" />
              <h3>Course Materials</h3>
              <p>Access past papers and resources</p>
            </div>
            <div className="card slide-up" style={{ animationDelay: "0.1s" }}>
              <img id="gpa-calculator-icon" src="/icon_gpa_calculator.png" alt="GPA Calculator" />
              <h3>GPA Calculator</h3>
              <p>Calculate your GPA easily</p>
            </div>
            <div className="card slide-up" style={{ animationDelay: "0.2s" }}>
              <img src="/icon_campus_notices.png" alt="Campus Notices" />
              <h3>Campus Notices</h3>
              <p>Stay updated with the latest news</p>
            </div>
            <div className="card slide-up" style={{ animationDelay: "0.3s" }}>
              <img src="/icon_chatbot_support.png" alt="Chatbot Support" />
              <h3>Chatbot Support</h3>
              <p>Get help with our AI assistant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section id="course-section" className="courses-list-area">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Computer Science Course Modules</h2>
          
          <div className="level-box">
            <h3>Level 3</h3>
            <table>
              <thead>
                <tr><th>Code</th><th>Course Name</th><th>Credits</th></tr>
              </thead>
              <tbody>
                <tr><td>CSU3200</td><td>Introduction to Computer Programming</td><td>2</td></tr>
                <tr><td>CSU3301</td><td>Database Design and Implementation</td><td>3</td></tr>
                <tr><td>CSU3302</td><td>Data Structures and Algorithms</td><td>3</td></tr>
              </tbody>
            </table>
          </div>

          <div className="level-box">
            <h3>Level 4</h3>
            <table>
              <thead>
                <tr><th>Code</th><th>Course Name</th><th>Credits</th></tr>
              </thead>
              <tbody>
                <tr><td>CSU4300</td><td>Operating Systems</td><td>3</td></tr>
                <tr><td>CSU4301</td><td>Object Oriented Programming</td><td>3</td></tr>
                <tr><td>CSU4302</td><td>System Analysis & Software Engineering</td><td>3</td></tr>
                <tr><td>CSU4303</td><td>Computer Networks</td><td>3</td></tr>
              </tbody>
            </table>
          </div>

          {/* Level 5 - Newly Added */}
          <div className="level-box">
            <h3>Level 5</h3>
            <table>
              <thead>
                <tr><th>Code</th><th>Course Name</th><th>Credits</th></tr>
              </thead>
              <tbody>
                <tr><td>CSU5300</td><td>Software Engineering Concepts & Practice</td><td>3</td></tr>
                <tr><td>CSU5301</td><td>Computer Architecture</td><td>3</td></tr>
                <tr><td>CSU5302</td><td>Design & Analysis of Algorithms</td><td>3</td></tr>
                <tr><td>CSU5303</td><td>Automata Theory</td><td>3</td></tr>
                <tr><td>CSU5304</td><td>Data Communications</td><td>3</td></tr>
                <tr><td>CSU5305</td><td>Web Technologies</td><td>3</td></tr>
                <tr><td>CSU5306</td><td>Mobile Computing</td><td>3</td></tr>
                <tr><td>CSU5307</td><td>Database Management Systems</td><td>3</td></tr>
                <tr><td>CSU5308</td><td>Software Quality Assurance</td><td>3</td></tr>
                <tr><td>CSU5309</td><td>IT Project Management</td><td>3</td></tr>
                <tr><td>CSU5310</td><td>Human Computer Interaction</td><td>3</td></tr>
                <tr><td>CSU5311</td><td>Artificial Intelligence</td><td>3</td></tr>
                <tr><td>CSU5312</td><td>Information Security</td><td>3</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GPA Calculator Section */}
      <section id="gpa-section" className="gpa-calculator-area">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Calculate Your GPA</h2>
          <div className="calculator-box">
            {courses.map((course) => (
              <div key={course.id} className="course-row" style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "center" }}>
                <select
                  style={{ flex: 2, padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                  onChange={(e) => {
                    const credits = e.target.options[e.target.selectedIndex].getAttribute("data-credits") || "";
                    handleCourseChange(course.id, "credits", credits);
                  }}
                >
                  <option value="">Select Course</option>
                  <optgroup label="Level 3">
                    <option value="CSU3200" data-credits="2">CSU3200 - Intro to Computer Programming</option>
                    <option value="CSU3301" data-credits="3">CSU3301 - Database Design & Implementation</option>
                    <option value="CSU3302" data-credits="3">CSU3302 - Data Structures & Algorithms</option>
                  </optgroup>
                  <optgroup label="Level 4">
                    <option value="CSU4300" data-credits="3">CSU4300 - Operating Systems</option>
                    <option value="CSU4301" data-credits="3">CSU4301 - Object Oriented Programming</option>
                    <option value="CSU4302" data-credits="3">CSU4302 - System Analysis & Software Engineering</option>
                    <option value="CSU4303" data-credits="3">CSU4303 - Computer Networks</option>
                  </optgroup>
                  <optgroup label="Level 5">
                    <option value="CSU5300" data-credits="3">CSU5300 - Software Eng. Concepts</option>
                    <option value="CSU5301" data-credits="3">CSU5301 - Computer Architecture</option>
                    <option value="CSU5302" data-credits="3">CSU5302 - Design & Analysis of Algorithms</option>
                    <option value="CSU5303" data-credits="3">CSU5303 - Automata Theory</option>
                    <option value="CSU5304" data-credits="3">CSU5304 - Data Communications</option>
                    <option value="CSU5305" data-credits="3">CSU5305 - Web Technologies</option>
                    <option value="CSU5306" data-credits="3">CSU5306 - Mobile Computing</option>
                    <option value="CSU5307" data-credits="3">CSU5307 - Database Management</option>
                    <option value="CSU5308" data-credits="3">CSU5308 - Software Quality Assurance</option>
                    <option value="CSU5309" data-credits="3">CSU5309 - IT Project Management</option>
                    <option value="CSU5310" data-credits="3">CSU5310 - Human Computer Interaction</option>
                    <option value="CSU5311" data-credits="3">CSU5311 - Artificial Intelligence</option>
                    <option value="CSU5312" data-credits="3">CSU5312 - Information Security</option>
                  </optgroup>
                </select>
                <input
                  type="number"
                  placeholder="Credits"
                  value={course.credits}
                  readOnly
                  style={{ flex: 0.5, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", backgroundColor: "#e9ecef" }}
                />
                <select
                  value={course.grade}
                  onChange={(e) => handleCourseChange(course.id, "grade", e.target.value)}
                  style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd" }}
                >
                  <option value="">Grade</option>
                  <option value="4.0">A+ / A</option>
                  <option value="3.7">A-</option>
                  <option value="3.3">B+</option>
                  <option value="3.0">B</option>
                  <option value="2.7">B-</option>
                  <option value="2.3">C+</option>
                  <option value="2.0">C</option>
                  <option value="1.7">C-</option>
                  <option value="1.3">D+</option>
                  <option value="1.0">D</option>
                  <option value="0.0">E / F</option>
                </select>
                <button
                  onClick={() => removeCourseRow(course.id)}
                  style={{ background: "#dc3545", color: "white", border: "none", borderRadius: "8px", padding: "12px 18px", cursor: "pointer", fontWeight: "bold" }}
                >
                  X
                </button>
              </div>
            ))}

            <div style={{ marginTop: "20px" }}>
              <button onClick={addCourseRow} style={{ background: "#6c757d", color: "white", border: "none", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
                + Add Course
              </button>
              <button onClick={calculateGPA} style={{ background: "#1A8754", color: "white", border: "none", padding: "12px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: 600, marginLeft: "10px" }}>
                Calculate GPA
              </button>
            </div>

            {gpaResult && (
              <div style={{ marginTop: "25px", textAlign: "center", padding: "20px", background: "#eaf5f0", borderRadius: "8px" }}>
                <h3 style={{ margin: 0, color: "#333" }}>
                  Your Semester GPA: <br />
                  <span style={{ color: "#1A8754", fontSize: "42px", fontWeight: "bold" }}>{gpaResult}</span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="notices-section" className="announcements">
        <div className="container">
          <h2>Latest Announcements</h2>
          <div className="announcement-cards">
            <div className="announcement-card slide-up">
              <h4>Exam Schedule Released</h4>
              <p>Final exams timetable is now available.</p>
              <span className="date">April 20, 2024</span>
            </div>
            <div className="announcement-card slide-up" style={{ animationDelay: "0.2s" }}>
              <h4>New Assignment Deadline</h4>
              <p>Assignment due date extended to May 5th.</p>
              <span className="date">April 18, 2024</span>
            </div>
            <div className="announcement-card slide-up" style={{ animationDelay: "0.4s" }}>
              <h4>Workshop on Study Skills</h4>
              <p>Join our workshop on effective study techniques.</p>
              <span className="date">April 15, 2024</span>
            </div>
          </div>
          <div className="view-all">
            <a href="#" className="btn" style={{ background: "#1A8754", color: "white" }}>View All Notices</a>
          </div>
        </div>
      </section>

      {/* Chatbot Widget */}
      <div className="floating-chatbot scale-in">
        <div style={{ cursor: "pointer" }} onClick={() => setIsChatOpen(!isChatOpen)}>
          <img src="/chatbot_widget_icon.png" alt="Chatbot" />
          <div className="chat-bubble">Chat with us!</div>
        </div>

        {isChatOpen && (
          <div className="chat-window" style={{ display: "flex", position: "absolute", bottom: "80px", right: "0" }}>
            <div className="chat-header">
              <h4 style={{ margin: 0, fontSize: "16px" }}>OUSL Assistant</h4>
              <button onClick={() => setIsChatOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>&times;</button>
            </div>
            <div className="chat-body">
              {chatMessages.map((msg, index) => (
                <div key={index} className={msg.sender === "bot" ? "bot-msg" : "user-msg"}>
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*(.*?)\*/g, "<i>$1</i>") }} />
                </div>
              ))}
              {isTyping && <div className="bot-msg">Typing...</div>}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}