const PETALS = [
  { left: '4%',  fall: '15s', sway: '4.2s', delay: '0s',    w: 8,  h: 12 },
  { left: '11%', fall: '12s', sway: '5.0s', delay: '3.5s',  w: 7,  h: 10 },
  { left: '19%', fall: '17s', sway: '5.8s', delay: '8s',    w: 9,  h: 13 },
  { left: '32%', fall: '13s', sway: '4.5s', delay: '1.2s',  w: 7,  h: 11 },
  { left: '47%', fall: '14s', sway: '5.2s', delay: '6s',    w: 8,  h: 12 },
  { left: '61%', fall: '16s', sway: '4.0s', delay: '4.5s',  w: 7,  h: 10 },
  { left: '72%', fall: '12s', sway: '5.5s', delay: '2s',    w: 9,  h: 13 },
  { left: '83%', fall: '15s', sway: '4.8s', delay: '9.5s',  w: 7,  h: 11 },
  { left: '91%', fall: '13s', sway: '5.0s', delay: '7s',    w: 8,  h: 12 },
  { left: '97%', fall: '16s', sway: '4.5s', delay: '11s',   w: 7,  h: 10 },
]

function Cluster({ cx, cy, r }) {
  const blossoms = [
    { dx:  0.00, dy:  0.00, s: 1.00, fill: '#e8a0b5' },
    { dx: -0.65, dy: -0.65, s: 0.88, fill: '#f0b8c5' },
    { dx:  0.55, dy: -0.55, s: 0.82, fill: '#ebb0c2' },
    { dx: -0.22, dy: -1.15, s: 0.75, fill: '#f5c8d0' },
    { dx:  0.80, dy:  0.28, s: 0.70, fill: '#e8a0b5' },
  ]
  return (
    <>
      {blossoms.map(({ dx, dy, s, fill }, i) => (
        <circle key={i} cx={cx + dx * r} cy={cy + dy * r} r={r * s} fill={fill} />
      ))}
    </>
  )
}

function CherryTree() {
  return (
    <svg viewBox="0 0 300 520" xmlns="http://www.w3.org/2000/svg" fill="none">
      {/* Trunk */}
      <path d="M150,520 C147,460 140,395 136,330 C132,288 138,262 136,228"
            stroke="#9b6575" strokeWidth="18" strokeLinecap="round"/>

      {/* Branch: lower left */}
      <path d="M137,340 C108,318 70,298 28,280"
            stroke="#9b6575" strokeWidth="11" strokeLinecap="round"/>
      <path d="M28,280 C8,260 -14,238 -28,212"
            stroke="#9b6575" strokeWidth="7" strokeLinecap="round"/>
      <path d="M28,280 C12,266 -2,248 -12,228"
            stroke="#9b6575" strokeWidth="6" strokeLinecap="round"/>

      {/* Branch: mid left */}
      <path d="M136,295 C105,268 66,238 24,210"
            stroke="#9b6575" strokeWidth="10" strokeLinecap="round"/>
      <path d="M24,210 C4,188 -16,162 -30,134"
            stroke="#9b6575" strokeWidth="6" strokeLinecap="round"/>
      <path d="M24,210 C10,192 -2,168 -8,142"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>

      {/* Branch: lower right */}
      <path d="M138,325 C170,300 215,278 262,258"
            stroke="#9b6575" strokeWidth="11" strokeLinecap="round"/>
      <path d="M262,258 C282,236 300,212 314,184"
            stroke="#9b6575" strokeWidth="7" strokeLinecap="round"/>
      <path d="M262,258 C270,238 276,215 278,188"
            stroke="#9b6575" strokeWidth="6" strokeLinecap="round"/>

      {/* Branch: mid right */}
      <path d="M137,272 C172,240 212,208 248,178"
            stroke="#9b6575" strokeWidth="9" strokeLinecap="round"/>
      <path d="M248,178 C268,154 284,128 292,98"
            stroke="#9b6575" strokeWidth="6" strokeLinecap="round"/>
      <path d="M248,178 C238,152 228,124 222,96"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>

      {/* Branch: upper left */}
      <path d="M136,248 C122,208 106,165 88,118"
            stroke="#9b6575" strokeWidth="8" strokeLinecap="round"/>
      <path d="M88,118 C76,84 62,52 48,18"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>
      <path d="M88,118 C100,84 110,52 116,18"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>

      {/* Branch: upper right */}
      <path d="M137,238 C158,198 180,158 200,115"
            stroke="#9b6575" strokeWidth="8" strokeLinecap="round"/>
      <path d="M200,115 C190,80 180,48 174,14"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>
      <path d="M200,115 C212,80 220,48 226,14"
            stroke="#9b6575" strokeWidth="5" strokeLinecap="round"/>

      {/* Blossom clusters at branch tips */}
      <Cluster cx={-30} cy={206} r={22} />
      <Cluster cx={-14} cy={222} r={18} />
      <Cluster cx={-32} cy={128} r={24} />
      <Cluster cx={-10} cy={136} r={18} />
      <Cluster cx={314} cy={180} r={22} />
      <Cluster cx={278} cy={182} r={18} />
      <Cluster cx={292} cy={92}  r={24} />
      <Cluster cx={220} cy={90}  r={20} />
      <Cluster cx={46}  cy={12}  r={24} />
      <Cluster cx={118} cy={12}  r={22} />
      <Cluster cx={172} cy={8}   r={22} />
      <Cluster cx={228} cy={8}   r={22} />

      {/* Scattered small blossoms along branches */}
      <circle cx={60}  cy={240} r={13} fill="#f0b8c5" />
      <circle cx={165} cy={218} r={12} fill="#e8a0b5" />
      <circle cx={48}  cy={170} r={12} fill="#ebb0c2" />
      <circle cx={226} cy={155} r={13} fill="#f0b8c5" />
      <circle cx={108} cy={165} r={11} fill="#e8a0b5" />
      <circle cx={185} cy={148} r={11} fill="#ebb0c2" />
    </svg>
  )
}

export default function CherryBlossomBackground() {
  return (
    <>
      {/* Left tree */}
      <div
        className="fixed bottom-0 left-0 pointer-events-none z-0"
        style={{ width: 340, opacity: 0.085, transform: 'translateX(-60px)' }}
      >
        <CherryTree />
      </div>

      {/* Right tree — mirrored, slightly smaller */}
      <div
        className="fixed bottom-0 right-0 pointer-events-none z-0"
        style={{ width: 290, opacity: 0.075, transform: 'translateX(55px) scaleX(-1)' }}
      >
        <CherryTree />
      </div>

      {/* Falling petals */}
      {PETALS.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.left,
            width: p.w,
            height: p.h,
            animationName: 'petalFall, petalSway',
            animationDuration: `${p.fall}, ${p.sway}`,
            animationDelay: `${p.delay}, ${p.delay}`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite, infinite',
          }}
        />
      ))}
    </>
  )
}
