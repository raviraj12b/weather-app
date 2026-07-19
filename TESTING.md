# Testing & QA Checklist — Weather Forecast App

## Functional Tests (PRD Acceptance Criteria)

| ID | Requirement | Test Steps | Status |
|----|---|---|---|
| AC-01 | Search a city | Type a valid city name, submit | ✅ |
| AC-02 | Current weather displayed | Confirm temp, icon, description, humidity, wind, pressure, visibility, sunrise, sunset all appear | ✅ |
| AC-03 | 5-day forecast displayed | Confirm 5 cards, each with weekday, icon, min/max temp, description | ✅ |
| AC-04 | Invalid city shows error | Search a nonsense city name, confirm "City not found." | ✅ |
| AC-05 | Loading indicator during API call | Throttle network, confirm spinner appears and disappears correctly | ✅ |
| AC-06 | Responsive on all devices | Test at <600px, 600–1024px, >1024px widths | ✅ |
| AC-07 | Enter key triggers search | Focus input, type, press Enter (no click) | ✅ |
| AC-08 | Recent searches stored | Search 3+ cities, refresh page, confirm they persist | ✅ |
| AC-09 | API errors handled gracefully | Test both a 404 (bad city) and offline mode | ✅ |
| AC-10 | Weather data updates each search | Search two different cities in a row, confirm full replacement, not stacking | ✅ |

## Edge Case Tests

| Case | Expected Result |
|---|---|
| Empty input, submit | Inline error, focus stays/returns to input |
| Whitespace-only input (`"   "`) | Same as empty — caught by JS, not just HTML `required` |
| Multi-word city (`New York`) | Works correctly via `encodeURIComponent` |
| City with special characters (`São Paulo`, `Zürich`) | Works correctly |
| Very long nonsense input | Treated as an invalid city, standard 404 error |
| Rapid repeated Enter/click during a search | Ignored — no duplicate/overlapping requests (Phase 12 guard) |
| City in a very different timezone from your own | Sunrise/sunset reflect **that city's** local time, not the viewer's |
| Offline mid-search | "Network error. Please check your internet connection." |

## Regression Tests (confirm earlier phases still work)

- [ ] Loading spinner still hides correctly after both success and error (Phase 10 fix)
- [ ] Focus returns to the input after an error, not just on success (Phase 12 fix)
- [ ] Recent searches survive a full page reload (Phase 13)
- [ ] Focus ring appears on Tab navigation, not on mouse clicks (Phase 14)
- [ ] Wind speed and visibility values unchanged after the Phase 14 constants refactor

## Known Limitations (documented, not bugs)

- Ambiguous city names (e.g., "Paris") resolve to whichever match OpenWeatherMap ranks first; there's no country-disambiguation UI in this app's scope.
- The "Current Date" line reflects the **viewer's** local date, not the searched city's — near a midnight boundary, these can differ by one day. Sunrise/sunset times, unlike this, were fixed to reflect the searched city (Phase 15) since they're more directly checkable against reality.
- No offline caching — a fully offline first visit shows the error state, not a cached previous result.