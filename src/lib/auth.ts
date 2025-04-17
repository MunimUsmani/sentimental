interface TokenPayload {
    id: string
    iat: number
    exp: number
  }
  
  // In a real app, you would use a proper JWT library
  export function verifyToken(token: string): TokenPayload | null {
    try {
      // This is a simplified mock implementation
      // In a real app, you would verify the JWT signature and expiration
  
      // For this example, we'll just check if it's the expected token
      if (
        token ===
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDA5YWI2ZGQzYjUzNzYwN2UxNzYwMyIsImlhdCI6MTc0NDg3MDEzOSwiZXhwIjoxNzQ3NDYyMTM5fQ.py-bhnkYCbuHhGZD9KHGoq1zTSWE6kgIf486A9rf_Iw"
      ) {
        return {
          id: "68009ab6dd3b537607e17603",
          iat: 1744870139,
          exp: 1747462139,
        }
      }
  
      return null
    } catch (error) {
      console.error("Token verification error:", error)
      return null
    }
  }
  