export const SPREADSHEET_ID = '1vwa0maoolVeku5AV7rOQrV-M6_e0Gzz_tj9PIpMk2nM'
// The sheet tab ID from the URL (?gid=...) — used to auto-resolve the tab name
export const SHEET_GID = 2104532965

export const WIZARD_STEPS = [
  {
    id: 'activity',
    title: "What's the activity or place?",
    field: 'Activity / Place',
    type: 'text',
    placeholder: 'e.g. Senso-ji Temple',
    required: true,
  },
  {
    id: 'city',
    title: 'Which city?',
    field: 'City',
    type: 'choice',
    options: ['Tokyo', 'Kyoto', 'Osaka', 'Nara', 'Hakone', 'Hiroshima', 'Nikko', 'Kanazawa', 'Hokkaido', 'Okinawa'],
  },
  {
    id: 'category',
    title: 'What type of activity?',
    field: 'Category',
    type: 'choice',
    options: ['Culture / Temple', 'Museum / Art', 'Experience', 'Food', 'Nature', 'Shopping', 'Entertainment', 'Other'],
  },
  {
    id: 'priority',
    title: 'How important is this?',
    field: 'Priority',
    type: 'choice',
    options: ['Must-do', 'Want-to-do', 'If time'],
  },
  {
    id: 'duration',
    title: 'How long will it take?',
    field: 'Est. Duration',
    type: 'choice',
    options: ['< 1 hr', '1 hr', '1-2 hrs', '2-3 hrs', 'Half day', 'Full day'],
  },
  {
    id: 'cost',
    title: 'Estimated cost per person?',
    field: 'Est. Cost (per person)',
    type: 'text',
    placeholder: '¥3,800',
  },
  {
    id: 'timeOfDay',
    title: 'Best time of day?',
    field: 'Best Time of Day',
    type: 'choice',
    options: ['Morning', 'Afternoon', 'Evening', 'Flexible'],
  },
  {
    id: 'booking',
    title: 'Does it require booking?',
    field: 'Booking Required?',
    type: 'choice',
    options: ['Yes', 'No'],
  },
  {
    id: 'status',
    title: "What's the current status?",
    field: 'Status',
    type: 'choice',
    options: ['Idea', 'Researching', 'Booked', 'Done'],
  },
  {
    id: 'day',
    title: 'Which day?',
    field: 'Day Assigned',
    type: 'text',
    placeholder: 'e.g. Day 3 or May 15',
  },
  {
    id: 'link',
    title: 'Any useful link?',
    field: 'Link / Source',
    type: 'url',
    placeholder: 'https://...',
  },
  {
    id: 'notes',
    title: 'Any notes?',
    field: 'Notes',
    type: 'textarea',
    placeholder: 'Tips, reminders, details...',
  },
]
