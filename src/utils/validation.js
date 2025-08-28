export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^05\d{8}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateDate = (date) => {
  return !isNaN(Date.parse(date));
};

export const validateTime = (time) => {
  const re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return re.test(time);
};

export const validateEvent = (eventData) => {
  const errors = {};

  if (!validateRequired(eventData.title)) {
    errors.title = 'العنوان مطلوب';
  }

  if (!validateRequired(eventData.date)) {
    errors.date = 'التاريخ مطلوب';
  } else if (!validateDate(eventData.date)) {
    errors.date = 'التاريخ غير صحيح';
  }

  if (!validateRequired(eventData.time)) {
    errors.time = 'الوقت مطلوب';
  } else if (!validateTime(eventData.time)) {
    errors.time = 'الوقت غير صحيح';
  }

  if (!validateRequired(eventData.location)) {
    errors.location = 'المكان مطلوب';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSpeaker = (speakerData) => {
  const errors = {};

  if (!validateRequired(speakerData.name)) {
    errors.name = 'الاسم مطلوب';
  }

  if (!validateRequired(speakerData.email)) {
    errors.email = 'البريد الإلكتروني مطلوب';
  } else if (!validateEmail(speakerData.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};