// Utility functions for handling Mexico City timezone

export const MEXICO_TIMEZONE = 'America/Mexico_City'

/**
 * Get current time in Mexico City timezone
 */
export const getCurrentTimeInMexico = (): Date => {
  const nowUTC = new Date()
  const nowInMexico = new Date(nowUTC.toLocaleString("en-US", {
    timeZone: MEXICO_TIMEZONE
  }))
  return nowInMexico
}

/**
 * Convert any date to Mexico City timezone
 */
export const convertToMexicoTime = (date: string | Date): Date => {
  const targetDate = new Date(date)
  const targetInMexico = new Date(targetDate.toLocaleString("en-US", {
    timeZone: MEXICO_TIMEZONE
  }))
  return targetInMexico
}

/**
 * Create a date specifically in Mexico timezone
 * Example: createMexicoDate('2025-06-30', '18:30:00')
 */
export const createMexicoDate = (dateString: string, timeString: string = '00:00:00'): Date => {
  // Create date string in ISO format
  const isoString = `${dateString}T${timeString}`
  
  // Parse as if it's in Mexico timezone
  const date = new Date(isoString)
  
  // Get the timezone offset difference
  const mexicoOffset = getMexicoTimezoneOffset()
  const localOffset = date.getTimezoneOffset()
  
  // Adjust for timezone difference
  const offsetDifference = localOffset - mexicoOffset
  date.setMinutes(date.getMinutes() + offsetDifference)
  
  return date
}

/**
 * Get Mexico timezone offset in minutes
 */
export const getMexicoTimezoneOffset = (): number => {
  const now = new Date()
  const mexicoTime = new Date(now.toLocaleString("en-US", {
    timeZone: MEXICO_TIMEZONE
  }))
  const utcTime = new Date(now.toUTCString())
  
  return (utcTime.getTime() - mexicoTime.getTime()) / (1000 * 60)
}

/**
 * Format date in Mexico timezone with custom options
 */
export const formatMexicoDate = (
  date: Date, 
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: MEXICO_TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  }
  
  return date.toLocaleString('es-MX', defaultOptions)
}
