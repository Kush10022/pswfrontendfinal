async function validatePasswordResetToken(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset?token=${token}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return {
        valid: true,
        code: response.status,
      };
    } else {
      const responseData = await response.json();
      return {
        valid: false,
        code: response.status,
        message: responseData.message,
      };
    }
  } catch (error) {
    console.error("Error validating password reset token", error);
    return false;
  }
}

async function newPasswordResetting(token, password) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset`;
  const payload = {
    token: token,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        success: true,
        code: response.status,
      };
    } else {
      const responseData = await response.json();
      if (response.status === 400) {
        return {
          success: false,
          code: response.status,
          message: responseData.message,
        };
      }
      if (response.status === 500) {
        throw new Error("Server error");
      }
      return {
        success: false,
        code: response.status,
        message: responseData.message,
      };
    }
  } catch (error) {
    console.error("Error during user password change", error);
    return {
      success: false,
      message: "Error during user password change",
    };
  }
}

async function initiatePasswordReset(email) {
  const payload = {
    email: email,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/passwordreset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (response.ok) {
      return true;
    } else {
      if (response.status === 404) {
        return false;
      } else if (response.status === 400) {
        return false;
      } else if (response.status === 500) {
        throw new Error("Server error");
      } else {
        return false;
      }
    }
  } catch (e) {
    console.error("Error during password reset initiation ", e);
    return false;
  }
}

export {
  validatePasswordResetToken,
  newPasswordResetting,
  initiatePasswordReset,
};
