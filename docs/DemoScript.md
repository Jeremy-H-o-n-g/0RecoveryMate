# RecoverMate — Live Demo Script (S28)

**Target: 4:30 hard ceiling (5:00 max).** Timings below sum to ~4:20; rehearse
at least twice with a timer (student manual work; record notes in
`rehearsals-S28.md`). Setup: production URL open in tab 1, LOCAL demo
(`npm run build && npx next start -p 3100`) open in tab 2, terminal ready.

**Never depend on one network path** (do-not-do): the local tab IS the demo;
the production tab is a bonus if Wi-Fi behaves.

| Time | Beat | Say / Do | Fallback if it fails |
|---|---|---|---|
| 0:00–0:20 | Hook | "训练完浑身酸，却不知道该做什么放松？RecoverMate 从**你感到疲劳的部位**出发。" Show home + body map. | Local tab; if BOTH dead: narrate from `docs/a11y-report-S23.html` + body-map screenshot. |
| 0:20–0:50 | Navigation | Click 左膝 hotspot → knee region page. "两跳之内，从身体到指引。" Toggle 前/后视图 to show back map. | Keyboard-only demo (Tab + Enter) — turns a failure into an a11y strength beat. |
| 0:50–1:40 | Guidance + SAFETY | Open a knee exercise. Point at Stop signals FIRST: "任何指引前，先看到的是停止信号——这不是一个医疗产品。" Show steps + timer: start, PAUSE (freeze!), reset. "视频、步骤、计时完全由用户控制；永远不会自动跳到下一个。" | Steps are plain text — near-unkillable; if JS dies the SSG HTML still renders steps. |
| 1:40–2:20 | Completion + reduced motion | Tap Mark complete → green ring + (if motion allowed) one confetti burst. "完成反馈只触发一次；系统开启减少动画时没有任何粒子——我们测过。" | Confetti is decorative-only by design; name that out loud either way. |
| 2:20–3:00 | Sport flow | Open 篮球 flow: queue, estimated time, skip/restore an item, advance by tap only, exit via "本次先到这里". "队列可改、可退、绝不催促——退出文案是中性的。" | `/flow/basketball` is SSG — extremely robust; if offline, still works from local tab. |
| 3:00–3:40 | Quality evidence | Switch to `docs/test-summary-S23.html` + `a11y-report-S23.html`. "114 项自动化测试、4 项真实浏览器回归、axe 零违规；真实浏览器还抓到过一个手机端横向溢出缺陷——当天修复。" | These are static files in the repo; open from disk. |
| 3:40–4:10 | Honest limits | "三点坦白：内容是清晰标注的草稿，等待专业审核；可用性研究已排期未执行——我们不会编造结果；性能预算有一个已记录的例外。" Point at FinalReport §6. | — (this beat never fails; it's speech) |
| 4:10–4:20 | Close | "RecoverMate 的原则：不诊断、不催促、不隐藏。谢谢！" | — |

## 断网彩排 (offline rehearsal — required once)

At any point mid-demo: kill network → switch to local tab → continue from the
same beat. **Switch must take <30 s** (acceptance). Practice the exact move:
browser tab switch + one sentence ("备用副本早已在本机运行").

## Pre-demo checklist (T-30 min)

- [ ] Local server running on the presentation machine (`docs/OfflineDemo.md`)
- [ ] Production smoke passed that morning (or tab pre-loaded)
- [ ] Evidence HTML files open in tabs
- [ ] OS reduced-motion state known (choose ON to show the static cue, or OFF
      for confetti — decide BEFORE, both are wins)
- [ ] Timer/phone stopwatch ready
- [ ] `docs/rehearsals-S28.md` filled with ≥2 timed run-throughs

## Evidence exports (student)

`final-demo-S28.mp4` (record a full timed run), `final-evidence-index.pdf`
(print of `docs/EvidenceIndex.md`), `docs/rehearsals-S28.md` (kept filled).
