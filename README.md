# Bajaj Finserv REST API Challenge

A REST API built with Node.js and Express.js that processes arrays and returns categorized data according to specific requirements.

## Features

- **POST /bfhl**: Process array data and return categorized results
- **GET /bfhl**: Health check endpoint
- Error handling and input validation
- CORS enabled for cross-origin requests
- Ready for deployment on Vercel, Railway, or Render

## API Endpoints

### POST /bfhl

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl

Returns operation code for health check.

## Response Fields

1. **is_success**: Boolean indicating operation status
2. **user_id**: User identifier in format `{full_name_ddmmyyyy}`
3. **email**: User's email address
4. **roll_number**: College roll number
5. **even_numbers**: Array of even numbers from input
6. **odd_numbers**: Array of odd numbers from input
7. **alphabets**: Array of alphabetical strings converted to uppercase
8. **special_characters**: Array of special characters
9. **sum**: Sum of all numbers as a string
10. **concat_string**: Concatenation of all alphabetical characters in reverse order with alternating caps

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bajaj-finserv-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Test the API:**
   ```bash
   npm test
   ```

## Configuration

**IMPORTANT**: Update the `USER_INFO` object in `server.js` with your details:

```javascript
const USER_INFO = {
    user_id: "your_name_ddmmyyyy", // Replace with your name and DOB (format: fullname_ddmmyyyy)
    email: "your.email@example.com",
    roll_number: "YOUR123"
};
```

Example:
```javascript
const USER_INFO = {
    user_id: "john_doe_17091999", // For John Doe born on 17/09/1999
    email: "john.doe@vit.ac.in",
    roll_number: "21BCE1234"
};
```

## Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Railway
1. Connect your GitHub repository
2. Deploy automatically

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`

## Testing

The project includes comprehensive tests for all example cases. Run them with:

```bash
npm test
```

## Example Usage

```bash
# Test with curl
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **Vercel**: Deployment platform (recommended)

## Error Handling

The API includes comprehensive error handling for:
- Invalid input format
- Missing required fields
- Server errors
- Malformed JSON

## License

MIT License - feel free to use this code for your projects.
