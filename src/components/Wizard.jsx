import { useState } from 'react'
import { WIZARD_STEPS, SHEET_COLUMNS } from '../config.js'
import WizardStep from './WizardStep.jsx'
import ReviewStep from './ReviewStep.jsx'
import CherryBlossomBackground from './CherryBlossomBackground.jsx'
import { appendRow } from '../utils/sheetsApi.js'

export default function Wizard() {
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
    if (currentStep < totalSteps - 1) setCurrentStep(n => n + 1)
    else setIsReviewing(true)
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
    if (isReviewing) setIsReviewing(false)
    else if (currentStep > 0) setCurrentStep(n => n - 1)
  }

  const handleEdit = (stepId) => {
    const idx = WIZARD_STEPS.findIndex(s => s.id === stepId)
    if (idx !== -1) { setCurrentStep(idx); setIsReviewing(false) }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      await appendRow(SHEET_COLUMNS.map(col => col.stepId ? (answers[col.stepId] ?? '') : (col.default ?? '')))
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0); setAnswers({}); setIsReviewing(false)
    setSubmitted(false); setError(null)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-[#fdfaf8] flex items-center justify-center">
        <CherryBlossomBackground />
        <div className="relative z-10 text-center px-8 max-w-xs w-full">
          <div className="text-5xl mb-8">🌸</div>
          <h2 className="text-3xl font-extralight text-gray-700 mb-3">Added!</h2>
          <p className="text-sm text-gray-400 mb-12">Saved to your Japan trip spreadsheet.</p>
          <button
            onClick={handleReset}
            className="bg-rose-400 hover:bg-rose-500 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors"
          >
            Add another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#fdfaf8]">
      <CherryBlossomBackground />

      {/* Progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-rose-100 z-20">
        <div
          className="h-full bg-rose-300 transition-all duration-500 ease-out"
          style={{ width: isReviewing ? '100%' : `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center px-8 pt-7">
        <span className="text-[11px] tracking-[0.22em] uppercase text-rose-300 font-medium select-none">
          Japan Trip
        </span>
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8 -mt-10">
        <div className="w-full max-w-md">

          {/* Step counter */}
          {!isReviewing && (
            <p className="text-[11px] tracking-[0.22em] uppercase text-gray-300 mb-8 select-none">
              {String(currentStep + 1).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
            </p>
          )}

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
