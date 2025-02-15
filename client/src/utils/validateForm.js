const validateName = (name, setColors, setErrors) => {
  if (!name) {
    setColors((prev) => ({ ...prev, name: "red-500" }));
    setErrors((prev) => ({ ...prev, name: "Name is required" }));
    return;
  }
  if (name.length < 3) {
    setColors((prev) => ({ ...prev, name: "red-500" }));
    setErrors((prev) => ({ ...prev, name: "Name must be at least 3 characters" }));
    return;
  }
  if (/[^a-zA-Z -]/.test(name)) {
    setColors((prev) => ({ ...prev, name: "red-500" }));
    setErrors((prev) => ({ ...prev, name: "Name must contain only letters" }));
    return;
  }
  setColors((prev) => ({ ...prev, name: "green-600" }));
  setErrors((prev) => ({ ...prev, name: "" }));
};

const validateEmail = (email, setColors, setErrors) => {
  if (!email) {
    setColors((prev) => ({ ...prev, email: "red-500" }));
    setErrors((prev) => ({ ...prev, email: "Email is required" }));
    return;
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setColors((prev) => ({ ...prev, email: "red-500" }));
    setErrors((prev) => ({ ...prev, email: "Enter a valid Email" }));
    return;
  }
  setColors((prev) => ({ ...prev, email: "green-600" }));
  setErrors((prev) => ({ ...prev, email: "" }));
};

const validatePassword = (password, setColors, setErrors) => {
  if (!password) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password is required" }));
    return;
  }
  if (password.length < 6) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
    return;
  }
  if (!/[a-z]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one lowercase letter" }));
    return;
  }
  if (!/[A-Z]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one uppercase letter" }));
    return;
  }
  if (!/[0-9]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one digit" }));
    return;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    setColors((prev) => ({ ...prev, password: "red-500" }));
    setErrors((prev) => ({ ...prev, password: "Password must contain at least one special character" }));
    return;
  }
  setColors((prev) => ({ ...prev, password: "green-600" }));
  setErrors((prev) => ({ ...prev, password: "" }));
};

const confirmPassword = (password, confirmPassword, setColors, setErrors) => {
  if (password !== confirmPassword) {
    setColors((prev) => ({ ...prev, confirmPassword: "red-500" }));
    setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    return;
  }
  setColors((prev) => ({ ...prev, confirmPassword: "green-600" }));
  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
};

const validate = {
  validateName,
  validateEmail,
  validatePassword,
  confirmPassword,
};

export default validate;
