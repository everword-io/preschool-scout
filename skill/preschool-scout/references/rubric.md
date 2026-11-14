# Rubric

The report's Rubric tab lets each parent score every finalist on two scorecards and a set of pass/fail gates. Your job is to prefill **evidence**: what the public record says for each criterion, with a 1 to 5 score only where the record supports one.

## Where the criteria come from

- **State licensing** (each state's rules; see `states/`): the legal floor.
- **Quality Counts California** and similar state rating systems: child observation, screening, teacher qualifications, interactions (CLASS), ratios, environment (ECERS), director qualifications.
- **NAEYC accreditation**: ten standards, including relationships, curriculum, families, leadership.
- **ECERS-3**: the room and the day.
- **CLASS Pre-K**: teacher-child interaction. Research (RAND and PACE evaluations of California's rating system; Mathematica on CLASS) finds interaction quality predicts children's outcomes better than structural measures. That's why "Teacher-child interactions" carries the most weight, and why you can't score it from the web: parents score it on the tour.

## Evidence format

In `rubric.evidence`, for each school id and criterion id: `[score, "one sentence of evidence"]`. Use `null` for the score when you have a relevant fact but the record can't justify a number.

```json
"evidence": {
  "jl": {
    "i4": [5, "Ten-year average teacher tenure."],
    "i8": [5, "A year of cash in reserve."],
    "f6": [null, "0.4 mi, about an 8-minute walk; care to 5:30."]
  }
}
```

## What the record can support

| Criterion | Score from the record? | Anchors |
| --- | --- | --- |
| i1 Interactions, i2 Environment, i3 Curriculum | No. Facts only (`null`) | Tour-only |
| i4 Teachers | Yes | 5: 7+ year average tenure, degreed leads. 3: mixed. 1: high turnover |
| i5 Ratios | Yes | 5: 1:6 or better and groups of 16 or fewer. 3: about 1:8. 1: legal minimum |
| i6 Licensing | Yes | 5: clean five years. 4: one minor. 3: several minor. 2: a pattern on supervision. 1: any serious violation (Type A in California, High risk in Texas, Serious risk in Ohio) |
| i7 Leadership | Yes | 5: tenured director, independent board, open books. 3: stable but opaque. 1: churn or family-controlled |
| i8 Finances | Yes | 5: a year of reserves. 4: six months. 3: thin. 2: deficits. 1: negative net assets or a big loan. Public programs: `null` with "Does not apply: publicly funded" |
| i9 Partnership | Rarely | Only if the school documents conferences and parent programs |
| f1 K path | Yes, if a list exists | 5: published counts to the family's targets. 3: named on a list. 1: nothing |
| f2-f10 | Facts only, usually | Parents' judgment |

## Gates

Gates in `default-rubric.json` are pass/fail and parents mark them. Mention gate-relevant facts in the school's `cons` and evidence (an age cutoff the child misses, a serious licensing violation, a religious framework).

## Adapting to the family

Keep the criterion ids. You may rename labels and rewrite `ask` text to fit the family (their K targets, their home language). If you change weights, keep each group summing to 100.
