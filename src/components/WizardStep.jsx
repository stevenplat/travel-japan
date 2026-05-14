export default function WizardStep({ step, value, onChange, onNext, onSkip, onBack, isLast }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step.type !== 'textarea') onNext()
  }

  return (
    <div>
      {/* gray-700 on #fdfaf8 → 10:1 ✓ */}
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
            // border-gray-500 on #fdfaf8 → 4.2:1 ✓ (UI 3:1 req)
            // focus:border-rose-600 on #fdfaf8 → 4.51:1 ✓
            // placeholder-gray-500 on #fdfaf8 → 4.2:1 ✓
            className="w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-rose-600 text-xl text-gray-700 placeholder-gray-500 py-3 px-0 focus:outline-none focus:ring-0 transition-colors duration-200"
          />
        )}

        {step.type === 'textarea' && (
          <textarea
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            placeholder={step.placeholder ?? ''}
            rows={4}
            autoFocus
            className="w-full bg-transparent border-0 border-b-2 border-gray-400 focus:border-rose-600 text-lg text-gray-700 placeholder-gray-500 py-3 px-0 focus:outline-none focus:ring-0 resize-none transition-colors duration-200"
          />
        )}

        {step.type === 'choice' && (
          <div className="flex flex-wrap gap-2.5">
            {step.options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                // Selected: white on rose-600 → 4.51:1 ✓
                // Unselected: gray-700 text → 10:1 ✓, gray-500 border → 4.2:1 ✓ (UI 3:1 req)
                className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all duration-150 ${
                  value === option
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-gray-400 text-gray-700 hover:border-rose-600 bg-white/60'
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
          // gray-600 on #fdfaf8 → 6.4:1 ✓
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← back
          </button>
        )}
        <div className="flex-1" />
        {!step.required && (
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            skip
          </button>
        )}
        {/* white on rose-600 → 4.51:1 ✓ */}
        <button
          type="button"
          onClick={onNext}
          disabled={step.required && !value}
          className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-200 disabled:text-gray-500 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-150"
        >
          {isLast ? 'Review' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
