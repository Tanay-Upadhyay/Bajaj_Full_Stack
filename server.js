const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// User information (replace with your actual details)
const USER_INFO = {
    user_id: "tanay_upadhyay_16022003", // Format: fullname_ddmmyyyy    
    email: "tanay.upadhyay2022@vitstudent.ac.in",
    roll_number: "22BEC0804"
};

// Helper function to check if a string is a number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
}

// Helper function to check if a string contains only alphabets
function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

// Helper function to check if a string contains special characters
function isSpecialCharacter(str) {
    return /^[^a-zA-Z0-9]+$/.test(str);
}

// Helper function to create alternating caps concatenation
function createAlternatingCaps(alphabets) {
    // Extract all alphabetical characters from the original input order
    let allChars = [];
    
    // Process each alphabet item to get all characters
    alphabets.forEach(item => {
        // Convert back to original form to extract individual characters
        for (let char of item) {
            if (/[a-zA-Z]/.test(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    // Reverse the array
    allChars.reverse();
    
    // Apply alternating caps (start with uppercase for index 0)
    let result = '';
    for (let i = 0; i < allChars.length; i++) {
        if (i % 2 === 0) {
            result += allChars[i].toUpperCase();
        } else {
            result += allChars[i].toLowerCase();
        }
    }
    
    return result;
}

// Main processing function
function processArray(data) {
    const result = {
        is_success: true,
        user_id: USER_INFO.user_id,
        email: USER_INFO.email,
        roll_number: USER_INFO.roll_number,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
    };

    let numberSum = 0;
    let originalAlphabets = []; // Keep track of original alphabets for concatenation

    try {
        data.forEach(item => {
            const strItem = String(item);
            
            if (isNumber(strItem)) {
                const num = parseInt(strItem);
                numberSum += num;
                
                if (num % 2 === 0) {
                    result.even_numbers.push(strItem);
                } else {
                    result.odd_numbers.push(strItem);
                }
            } else if (isAlphabet(strItem)) {
                result.alphabets.push(strItem.toUpperCase());
                originalAlphabets.push(strItem); // Keep original for concatenation
            } else if (isSpecialCharacter(strItem)) {
                result.special_characters.push(strItem);
            }
        });

        result.sum = String(numberSum);
        // console.log("Final payload:", result);
        result.concat_string = createAlternatingCaps(originalAlphabets);

    } catch (error) {
        result.is_success = false;
        console.error('Error processing array:', error);
    }

    return result;
}

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        // Process the array
        const result = processArray(data);

        // Return response with 200 status code
        res.status(200).json(result);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET endpoint for basic health check
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Bajaj Finserv REST API",
        endpoints: {
            POST: "/bfhl - Process array data",
            GET: "/bfhl - Health check"
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
