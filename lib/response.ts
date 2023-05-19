export const response = (
  data: any,
  status: number = 200,
  error: boolean = false,
  message: string = null
) => {
  return {
    data,
    status,
    error,
    message,
  };
};

export const methodNotAllowed = () => {
  return {
    data: null,
    status: 405,
    error: false,
    message: "Method not allowed",
  };
};
