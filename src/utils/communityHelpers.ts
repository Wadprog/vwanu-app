/**
 * Community API Helpers
 * Utility functions for community-related operations
 */

export interface CommunityValidationError {
  field: string
  message: string
}

/**
 * Validates community form data before submission
 */
export const validateCommunityData = (data: {
  name: string
  description: string
  interests: Array<{ id: number; name: string }>
}): CommunityValidationError[] => {
  const errors: CommunityValidationError[] = []

  // Validate name
  if (!data.name || !data.name.trim()) {
    errors.push({ field: 'name', message: 'Community name is required' })
  } else if (data.name.trim().length < 3) {
    errors.push({
      field: 'name',
      message: 'Community name must be at least 3 characters long',
    })
  } else if (data.name.trim().length > 100) {
    errors.push({
      field: 'name',
      message: 'Community name must be less than 100 characters',
    })
  }

  // Validate description
  if (!data.description || !data.description.trim()) {
    errors.push({
      field: 'description',
      message: 'Community description is required',
    })
  } else if (data.description.trim().length < 10) {
    errors.push({
      field: 'description',
      message: 'Description must be at least 10 characters long',
    })
  } else if (data.description.trim().length > 500) {
    errors.push({
      field: 'description',
      message: 'Description must be less than 500 characters',
    })
  }

  // Validate interests
  if (!data.interests || data.interests.length === 0) {
    errors.push({
      field: 'interests',
      message: 'Please select at least one interest',
    })
  } else if (data.interests.length > 5) {
    errors.push({
      field: 'interests',
      message: 'You can select up to 5 interests',
    })
  }

  return errors
}

/**
 * Formats API error messages for user display
 */
export const formatApiError = (error: any): string => {
  if (error?.data?.message) {
    return error.data.message
  }

  if (error?.message) {
    return error.message
  }

  switch (error?.status) {
    case 400:
      return 'Invalid community data. Please check your inputs and try again.'
    case 401:
      return 'You need to be logged in to create a community.'
    case 403:
      return 'You do not have permission to create communities.'
    case 409:
      return 'A community with this name already exists. Please choose a different name.'
    case 413:
      return 'Image file is too large. Please choose a smaller image.'
    case 422:
      return 'Please check your input data and try again.'
    case 429:
      return 'Too many requests. Please wait a moment and try again.'
    case 500:
      return 'Server error. Please try again later.'
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again later.'
    default:
      return 'Failed to create community. Please try again.'
  }
}
