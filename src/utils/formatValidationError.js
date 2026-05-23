/** Turn Mongoose / duplicate-key errors into a readable API message */
export const formatValidationError = (err) => {
  if (err.name === "ValidationError" && err.errors) {
    return Object.values(err.errors)
      .map((e) => {
        const field = e.path || "field";
        if (e.kind === "minlength") {
          return `${field} must be at least ${e.properties?.minlength} characters`;
        }
        return `${field}: ${e.message}`;
      })
      .join(". ");
  }

  if (err.code === 11000) {
    return "A record with this value already exists";
  }

  return err.message || "Validation failed";
};
