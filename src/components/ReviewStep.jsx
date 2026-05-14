export default function ReviewStep({ answers, steps, onEdit, onBack, onSubmit, isSubmitting, error }) {
  return (
    <div>
      <h2 className="text-3xl font-extralight text-gray-700 mb-2">Review</h2>
      <p className="text-sm text-gray-300 mb-10">Looks good? Add it to your spreadsheet.</p>

      <div className="space-y-0 mb-12 max-h-[50vh] overflow-y-auto">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex items-center justify-between py-3 border-b border-rose-50 last:border-0 group"
          >
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-300 mb-0.5">
                {step.field}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {answers[step.id] || <span className="text-gray-200">—</span>}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(step.id)}
              className="text-[11px] tracking-wider uppercase text-rose-200 hover:text-rose-400 flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100"
            >
              edit
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-sm text-rose-400 mb-6 pb-4 border-b border-rose-100">
          {error}
        </div>
      )}

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-300 hover:text-gray-500 transition-colors"
        >
          ← back
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-rose-400 hover:bg-rose-500 disabled:bg-rose-100 disabled:text-rose-300 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-150"
        >
          {isSubmitting ? 'Adding…' : 'Add to sheet'}
        </button>
      </div>
    </div>
  )
}
