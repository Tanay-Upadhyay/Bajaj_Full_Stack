const axios = require('axios').default || require('axios');

// Test data from the examples
const testCases = [
    {
        name: "Example A",
        input: { data: ["a", "1", "334", "4", "R", "$"] },
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334", "4"],
            alphabets: ["A", "R"],
            special_characters: ["$"],
            sum: "339",
            concat_string: "Ra"
        }
    },
    {
        name: "Example B", 
        input: { data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"] },
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2", "4", "92"],
            alphabets: ["A", "Y", "B"],
            special_characters: ["&", "-", "*"],
            sum: "103",
            concat_string: "ByA"
        }
    },
    {
        name: "Example C",
        input: { data: ["A", "ABcD", "DOE"] },
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A", "ABCD", "DOE"],
            special_characters: [],
            sum: "0",
            concat_string: "EoDdCbAa"
        }
    }
];

// Function to test the API
async function runTests() {
    console.log('Starting API tests...\n');
    
    const baseURL = 'http://localhost:3000';
    
    for (const testCase of testCases) {
        console.log(`Testing ${testCase.name}:`);
        console.log('Input:', JSON.stringify(testCase.input));
        
        try {
            const response = await axios.post(`${baseURL}/bfhl`, testCase.input);
            const result = response.data;
            
            console.log('Output:', JSON.stringify(result, null, 2));
            
            // Check specific fields
            const checks = [
                ['odd_numbers', JSON.stringify(result.odd_numbers) === JSON.stringify(testCase.expected.odd_numbers)],
                ['even_numbers', JSON.stringify(result.even_numbers) === JSON.stringify(testCase.expected.even_numbers)],
                ['alphabets', JSON.stringify(result.alphabets) === JSON.stringify(testCase.expected.alphabets)],
                ['special_characters', JSON.stringify(result.special_characters) === JSON.stringify(testCase.expected.special_characters)],
                ['sum', result.sum === testCase.expected.sum],
                ['concat_string', result.concat_string === testCase.expected.concat_string]
            ];
            
            console.log('Validation:');
            checks.forEach(([field, passed]) => {
                console.log(`  ${field}: ${passed ? '✓ PASS' : '✗ FAIL'}`);
                if (!passed) {
                    console.log(`    Expected: ${testCase.expected[field]}`);
                    console.log(`    Got: ${result[field]}`);
                }
            });
            
        } catch (error) {
            console.log('Error:', error.message);
        }
        
        console.log('\n' + '='.repeat(50) + '\n');
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    // Wait a bit for server to start if needed
    setTimeout(runTests, 1000);
}

module.exports = { runTests, testCases };
