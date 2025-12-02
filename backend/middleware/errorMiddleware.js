const notFound = (req, res, next) => {
  if (req.originalUrl === "/favicon.ico") {
    return res.status(204).end();
  }
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  };

  console.error('Error: ', responseBody);
  res.json(responseBody);
};

export { notFound, errorHandler };
