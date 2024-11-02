export const login = async (username, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        return { success: true, token: data.token };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error logging in", error);
      return { success: false, message: "Login failed" };
    }
  };
  