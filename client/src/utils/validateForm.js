export const validateFirstName = (name, setColors, setErrors) => {
  if (!name) {
    setColors((prev) => ({ ...prev, firstName: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, firstName: "Name is required" }));
    return;
  }
  if (/[^a-zA-Z -]/.test(name)) {
    setColors((prev) => ({ ...prev, firstName: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, firstName: "Name must contain only letters" }));
    return;
  }
  setColors((prev) => ({ ...prev, firstName: "#00a63e" }));
  setErrors((prev) => ({ ...prev, firstName: "" }));
};

export const validateLastName = (name, setColors, setErrors) => {
  if (/[^a-zA-Z -]/.test(name)) {
    setColors((prev) => ({ ...prev, lastName: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, lastName: "Name must contain only letters" }));
    return;
  }
  setColors((prev) => ({ ...prev, lastName: "#00a63e" }));
  setErrors((prev) => ({ ...prev, lastName: "" }));
};

export const validateUsername = (username, setColors, setErrors) => {
  if (!username) {
    setColors((prev) => ({ ...prev, username: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, username: "Username is required" }));
    return;
  }
  if (username.length < 3) {
    setColors((prev) => ({ ...prev, username: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, username: "Username must be at least 3 characters" }));
    return;
  }
  if (/[^a-z0-9_]/.test(username)) {
    setColors((prev) => ({ ...prev, username: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, username: "Only use small letters, numbers, or underscore" }));
    return;
  }
  setColors((prev) => ({ ...prev, username: "#00a63e" }));
  setErrors((prev) => ({ ...prev, username: "" }));
}

export const validateEmail = (email, setColors, setErrors) => {
  if (!email) {
    setColors((prev) => ({ ...prev, email: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, email: "Email is required" }));
    return;
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setColors((prev) => ({ ...prev, email: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, email: "Enter a valid Email" }));
    return;
  }
  setColors((prev) => ({ ...prev, email: "#00a63e" }));
  setErrors((prev) => ({ ...prev, email: "" }));
};

export const validatePassword = (password, setColors, setErrors) => {
  if (!password) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password is required" }));
    return;
  }
  if (password.length < 6) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
    return;
  }
  if (!/[a-z]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one lowercase letter" }));
    return;
  }
  if (!/[A-Z]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one uppercase letter" }));
    return;
  }
  if (!/[0-9]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one digit" }));
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one special character" }));
    return;
  }
  setColors((prev) => ({ ...prev, password: "#00a63e" }));
  setErrors((prev) => ({ ...prev, password: "" }));
};

export const confirmPassword = (password, confirmPassword, setColors, setErrors) => {
  if (password !== confirmPassword) {
    setColors((prev) => ({ ...prev, confirmPassword: "#fb2c36" }));
    setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    return;
  }
  setColors((prev) => ({ ...prev, confirmPassword: "#00a63e" }));
  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
};

export const validateProjectName = (name, setColor, setError) => {
  if (!name) {
    setColor("#fb2c36");
    setError("Project Name is required");
    return;
  }
  if (name.length < 3) {
    setColor("#fb2c36");
    setError("Project Name must be at least 3 characters");
    return;
  }
  if (/[^a-zA-Z0-9 '-]/.test(name)) {
    setColor("#fb2c36");
    setError("Project Name must contain only letters, numbers, and apostrophes");
    return;
  }

  setColor("white");
  setError("");
}

export const validateProcessName = (name, setColor, setError) => {
  if (!name) {
    setColor("#fb2c36");
    setError("Project Name is required");
    return;
  }

  setColor("#ffffff25");
  setError("");
}

const validate = {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  validatePassword,
  confirmPassword,
};

export default validate;
