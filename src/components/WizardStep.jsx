export default function WizardStep({ step, value, onChange, onNext, onSkip, onBack, isLast }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step.type !== 'textarea') onNext()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{step.title}</h2>
      {step.subtitle && <p className="text-gray-400 text-sm mb-1">{step.subtitle}</p>}

      <div className="mt-5 mb-6">
        {(step.type === 'text' || step.type === 'url') && (
          <input
            type={step.type === 'url' ? 'url' : 'text'}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={step.placeholder ?? ''}
            autoFocus
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-shadow"
          />
        )}

        {step.type === 'textarea' && (
          <textarea
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={step.placeholder ?? ''}
            rows={4}
            autoFocus
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent resize-none transition-shadow"
          />
        )}

        {step.type === 'choice' && (
          <div className="flex flex-wrap gap-2">
            {step.options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  value === option
                    ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-2.5 text-gray-400 hover:text-gray-700 font-medium text-sm transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={onSkip}
          className="px-4 py-2.5 text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={step.required && !value}
          className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-100 disabled:text-gray-300 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          {isLast ? 'Review →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
