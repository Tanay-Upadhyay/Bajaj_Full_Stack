const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// -- User Information --
const USER_INFO = {
    user_id: "tanay_upadhyay_16022003", // Format: fullname_ddmmyyyy    
    email: "tanay.upadhyay2022@vitstudent.ac.in",
    roll_number: "22BEC0804"
};


function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
}

function isAlphabet(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function isSpecialCharacter(str) {
    return /^[^a-zA-Z0-9]+$/.test(str);
}

function createAlternatingCaps(alphabets) {
    let allChars = [];
    
    alphabets.forEach(item => {
        for (let char of item) {
            if (/[a-zA-Z]/.test(char)) {
                allChars.push(char.toLowerCase());
            }
        }
    });
    
    allChars.reverse();
    
    // Start with uppercase, then alternate
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

// Main data processing logic
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
    let originalAlphabets = []; // Preserve original strings for concatenation logic

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
                originalAlphabets.push(strItem);
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

// API endpoint for processing the array
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }

        const result = processArray(data);
        res.status(200).json(result);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// Health check endpoint
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
