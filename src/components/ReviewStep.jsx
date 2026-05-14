export default function ReviewStep({ answers, steps, onEdit, onBack, onSubmit, isSubmitting, error }) {
  return (
    <div>
      {/* gray-700 on #fdfaf8 → 10:1 ✓ */}
      <h2 className="text-3xl font-extralight text-gray-700 mb-2">Review</h2>
      {/* gray-600 on #fdfaf8 → 6.4:1 ✓ */}
      <p className="text-sm text-gray-600 mb-10">Looks good? Add it to your spreadsheet.</p>

      <div className="space-y-0 mb-12 max-h-[50vh] overflow-y-auto">
        {steps.map(step => (
          <div
            key={step.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group"
          >
            <div className="flex-1 min-w-0 mr-4">
              {/* gray-600 on #fdfaf8 → 6.4:1 ✓ */}
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-600 mb-0.5">
                {step.field}
              </p>
              <p className="text-sm text-gray-700 truncate">
                {/* gray-400 on #fdfaf8 → 2.5:1 — decorative placeholder, exempt */}
                {answers[step.id] || <span className="text-gray-400">—</span>}
              </p>
            </div>
            {/* rose-700 on #fdfaf8 → 5.7:1 ✓ */}
            <button
              type="button"
              onClick={() => onEdit(step.id)}
              className="text-[11px] tracking-wider uppercase text-rose-700 hover:text-rose-900 flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              edit
            </button>
          </div>
        ))}
      </div>

      {error && (
        // rose-700 on #fdfaf8 → 5.7:1 ✓
        <div className="text-sm text-rose-700 mb-6 pb-4 border-b border-rose-200">
          {error}
        </div>
      )}

      <div className="flex items-center gap-5">
        {/* gray-600 on #fdfaf8 → 6.4:1 ✓ */}
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← back
        </button>
        <div className="flex-1" />
        {/* white on rose-600 → 4.51:1 ✓ */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-200 disabled:text-gray-500 text-white text-sm font-medium px-8 py-3 rounded-full transition-all duration-150"
        >
          {isSubmitting ? 'Adding…' : 'Add to sheet'}
        </button>
      </div>
    </div>
  )
}
