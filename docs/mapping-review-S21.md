# S21 Sport → Region Mapping Review

**Status: mapping drafted + user-confirmed 2026-08-14; reviewer wording check
PENDING (S11 — `<<REVIEWER_NAME_TBD>>`).** Nothing here is approved content.

## User decisions (2026-08-14, recorded in TASKS.md)
1. Entry set: **the user's 7 sports + 通用** (8 entries). The S21 prompt's
   running/swimming/strength list was NOT used — no authored mapping exists for
   those, and inventing one would violate the no-fabrication rule.
2. Area mapping: **大腿 → 膝区 (knee); 髋臀 / 腰腹 → 腰背区 (lower-back)** —
   the six app regions have no standalone thigh/hip/core region.

## Mapping (source: Manual_Instructions.md sport table)

| Sport | Table areas (原文) | Mapped regionIds |
|---|---|---|
| 篮球 Basketball | 大腿前后侧、小腿、髋臀、肩后侧、腰腹、手臂 | knee, calf, lower-back, shoulder, arm |
| 足球 Soccer | 大腿后侧、大腿内侧、小腿、髋臀、腰腹 | knee, calf, lower-back |
| 羽毛球 Badminton | 大腿前侧、髋臀、小腿、肩前后侧、手臂、腰腹 | knee, lower-back, calf, shoulder, arm |
| 腰旗橄榄球 Flag football | 大腿前后侧、小腿、髋臀、腰腹、肩后侧、手臂、背部 | knee, calf, lower-back, shoulder, arm |
| 射箭 Archery | 背部、肩后侧、腰腹 | lower-back, shoulder |
| 网球 Tennis | 大腿前后侧、小腿、髋臀、肩后侧、手臂、腰腹 | knee, calf, lower-back, shoulder, arm |
| 飞盘 Ultimate | 大腿前后侧、小腿、髋臀、腰腹、肩后侧、手臂 | knee, calf, lower-back, shoulder, arm |
| 通用 General | （不预设运动） | all six regions |

## Wording contract (enforced by tests/sport-entry.test.tsx)
- Reasons use “常见训练负荷相关区域 / 通常承受较高训练负荷” phrasing —
  sport-level facts, never statements about the user's body.
- Banned wording (regex-asserted on every reason): 受伤/损伤/拉伤/诊断/痊[愈复]/
  injur/diagnos/sprain/cure.
- The component shows a persistent disclaimer: 不是诊断结论，不构成个体化医学判断，
  and the direct body-map path is never blocked (S21 do-not-do).
- 通用 assumes no sport and lists all regions with neutral wording.

## Reviewer checklist (when authorized)
- [ ] Each reasonZh is accurate for the sport's typical demands.
- [ ] 大腿→膝区 / 髋臀·腰腹→腰背区 mapping is defensible for navigation use.
- [ ] No wording can be read as an individualized medical judgment.
- [ ] 通用 entry wording is neutral.

Note: `commonSports` in `data/body-parts.json` (S08 demo field, references
running/basketball/soccer) was superseded by `data/sports.json`. Removed in the
2026-09-01 backlog session (schema field + data + test fixture; the S08 sample
file keeps its historical copy, stripped harmlessly by Zod).
