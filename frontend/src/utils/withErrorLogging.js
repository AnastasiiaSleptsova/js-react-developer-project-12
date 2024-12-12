export const withErrorLogging = (rollbar, fn, context = 'Unhandled error') => (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      rollbar.error(context, error);
      throw error; // Чтобы ошибка не терялась
    }
  };