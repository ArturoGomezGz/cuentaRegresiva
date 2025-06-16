import { useState, useEffect } from 'react'
import { getCurrentTimeInMexico, formatMexicoDate } from '../utils/timezone'

interface CountdownProps {
  targetDate: string | Date
  title?: string
  onComplete?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const Countdown: React.FC<CountdownProps> = ({ 
  targetDate, 
  title = "Countdown", 
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0  })
  const [isCompleted, setIsCompleted] = useState(false)

  const calculateTimeLeft = (): TimeLeft => {
    // Get current time in Mexico City timezone
    const now = getCurrentTimeInMexico().getTime()
    
    // Target date is already in the correct timezone
    const target = new Date(targetDate).getTime()
    
    const difference = target - now

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Check if countdown is completed
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsCompleted(true)
        if (onComplete) {
          onComplete()
        }
        clearInterval(timer)
      }
    }, 1000)

    // Calculate initial time
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  if (isCompleted) {
    return (
      <div className="text-center">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">🎉 ¡Tiempo completado!</h4>
          <p className="mb-0">¡La cuenta regresiva ha terminado!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="mb-4">{title}</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="row g-3">
            {/* Days */}
            <div className="col-6 col-sm-3">
              <div className="card bg-primary text-white h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h1 className="display-4 fw-bold mb-0">{formatNumber(timeLeft.days)}</h1>
                  <small className="text-uppercase fw-semibold">Días</small>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="col-6 col-sm-3">
              <div className="card bg-info text-white h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h1 className="display-4 fw-bold mb-0">{formatNumber(timeLeft.hours)}</h1>
                  <small className="text-uppercase fw-semibold">Horas</small>
                </div>
              </div>
            </div>

            {/* Minutes */}
            <div className="col-6 col-sm-3">
              <div className="card bg-warning text-white h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h1 className="display-4 fw-bold mb-0">{formatNumber(timeLeft.minutes)}</h1>
                  <small className="text-uppercase fw-semibold">Minutos</small>
                </div>
              </div>
            </div>

            {/* Seconds */}
            <div className="col-6 col-sm-3">
              <div className="card bg-danger text-white h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h1 className="display-4 fw-bold mb-0">{formatNumber(timeLeft.seconds)}</h1>
                  <small className="text-uppercase fw-semibold">Segundos</small>
                </div>
              </div>
            </div>
          </div>          {/* Target date display */}
          <div className="mt-4">
            <p className="text-muted mb-0">
              <i className="bi bi-calendar-event me-2"></i>
              Objetivo: {formatMexicoDate(new Date(targetDate), {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} (Hora de México)
            </p>
            <small className="text-muted">
              <i className="bi bi-clock me-1"></i>
              Tiempo actual en México: {formatMexicoDate(getCurrentTimeInMexico(), {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Countdown