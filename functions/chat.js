exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        const API_KEY = process.env.GEMINI_API_KEY;

        const systemInstruction = "You are the 'OUSL Assistant' for the OUSL Student Hub website. You help students with OUSL course details, GPA calculation, and general campus info. Always be friendly and supportive. You can speak both Sinhala and English fluently.";

        // Updated exactly to gemini-2.5-flash as requested
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: {
                    parts: { text: systemInstruction }
                },
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return {
                statusCode: 200,
                body: JSON.stringify({ reply: "API Error: " + data.error.message })
            };
        }

        let botReply = "Sorry, I couldn't understand that.";
        if (data.candidates && data.candidates.length > 0) {
            botReply = data.candidates[0].content.parts[0].text;
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ reply: botReply })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "Internal Error: " + error.message })
        };
    }
};