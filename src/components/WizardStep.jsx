export default function WizardStep({ step, value, onChange, onNext, onSkip, onBack, isLast }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step.type !== 'textarea') onNext()
  }

  return (
    <div>
      <h2 className="text-3xl font-extralight text-gray-700 leading-snug mb-10">
        {step.title}
      </h2>

      <div className="mb-12">
        {(step.type === 'text' || step.type === 'url') && (
          <input
            type={step.type === 'url' ? 'url' : 'text'}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={step.placeholder ?? ''}
            autoFocus
            className="w-full bg-transparent border-0 border-b-2 border-rose-100 focus:border-rose-300 text-xl text-gray-700 placeholder-gray-200 py-3 px-0 focus:outline-none focus:ring-0 transition-colors duration-200"
          />
        )}

        {step.type === 'textarea' && (
          <textarea
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={step.placeholder ?? ''}
            rows={4}
            autoFocus
            className="w-full bg-transparent border-0 border-b-2 border-rose-100 focus:border-rose-300 text-lg text-gray-700 placeholder-gray-200 py-3 px-0 focus:outline-none focus:ring-0 resize-none transition-colors duration-200"
          />
        )}

        {step.type === 'choice' && (
          <div className="flex flex-wrap gap-2.5">
            {step.options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-150 ${
                  value === option
                    ? 'border-rose-400 bg-rose-400 text-white'
                    : 'border-rose-100 text-gray-500 hover:border-rose-300 hover:text-gray-700 bg-white/60'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-300 hover:text-gray-500 transition-colors"
          >
            ← back
          </button>
        )}
        <div className="flex-1" />
        {!step.required && (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-gray-300 hover:text-gray-500 transition-colors"
          >
            skip
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={step.required && !value}
          className="bg-rose-400 hover:bg-rose-500 disabled:bg-rose-100 disabled:text-rose-300 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-150"
        >
          {isLast ? 'Review' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
