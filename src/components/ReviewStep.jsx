export default function ReviewStep({ answers, steps, onEdit, onBack, onSubmit, isSubmitting, error }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Review your entry</h2>
      <p className="text-gray-400 text-sm mb-5">Looks good? Add it to the spreadsheet.</p>

      <div className="space-y-1 mb-6 max-h-72 overflow-y-auto pr-1">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-xs text-gray-400 mb-0.5">{step.field}</p>
              <p className="text-sm text-gray-900 truncate">
                {answers[step.id] || (
                  <span className="text-gray-300 italic text-xs">—</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(step.id)}
              className="text-xs text-rose-400 hover:text-rose-600 flex-shrink-0 transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="px-3 py-2.5 text-gray-400 hover:text-gray-700 font-medium text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm"
        >
          {isSubmitting ? 'Adding…' : '✓ Add to Spreadsheet'}
        </button>
      </div>
    </div>
  )
}
