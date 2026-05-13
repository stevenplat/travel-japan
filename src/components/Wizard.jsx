import { useState } from 'react'
import { WIZARD_STEPS } from '../config.js'
import WizardStep from './WizardStep.jsx'
import ReviewStep from './ReviewStep.jsx'
import { appendRow } from '../utils/sheetsApi.js'

export default function Wizard({ token, onSignOut }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isReviewing, setIsReviewing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const step = WIZARD_STEPS[currentStep]
  const totalSteps = WIZARD_STEPS.length
  const progress = (currentStep / totalSteps) * 100

  const advance = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(n => n + 1)
    } else {
      setIsReviewing(true)
    }
  }

  const handleNext = () => {
    if (step.required && !answers[step.id]) return
    advance()
  }

  const handleSkip = () => {
    setAnswers(prev => ({ ...prev, [step.id]: '' }))
    advance()
  }

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false)
    } else if (currentStep > 0) {
      setCurrentStep(n => n - 1)
    }
  }

  const handleEdit = (stepId) => {
    const idx = WIZARD_STEPS.findIndex(s => s.id === stepId)
    if (idx !== -1) {
      setCurrentStep(idx)
      setIsReviewing(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const row = WIZARD_STEPS.map(s => answers[s.id] ?? '')
      await appendRow(token, row)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers({})
    setIsReviewing(false)
    setSubmitted(false)
    setError(null)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="text-6xl mb-5">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Added!</h2>
          <p className="text-gray-500 text-sm mb-8">
            The activity has been saved to your Japan trip spreadsheet.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleReset}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Add another
            </button>
            <button
              onClick={onSignOut}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 px-6 rounded-xl transition-colors text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="bg-rose-500 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗾</span>
            <div>
              <h1 className="text-white font-semibold text-sm">Japan Trip Planner</h1>
              <p className="text-rose-200 text-xs">
                {isReviewing ? 'Review entry' : `Step ${currentStep + 1} of ${totalSteps}`}
              </p>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="text-rose-200 hover:text-white text-xs transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Progress bar */}
        {!isReviewing && (
          <div className="h-1 bg-rose-100">
            <div
              className="h-full bg-rose-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Step content */}
        <div className="p-6">
          {isReviewing ? (
            <ReviewStep
              answers={answers}
              steps={WIZARD_STEPS}
              onEdit={handleEdit}
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
            />
          ) : (
            <WizardStep
              step={step}
              value={answers[step.id]}
              onChange={value => setAnswers(prev => ({ ...prev, [step.id]: value }))}
              onNext={handleNext}
              onSkip={handleSkip}
              onBack={currentStep > 0 ? handleBack : null}
              isLast={currentStep === totalSteps - 1}
            />
          )}
        </div>
      </div>
    </div>
  )
}
