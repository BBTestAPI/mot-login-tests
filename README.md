# MOT Testing Service - Login Tests

A small Playwright test framework for the MOT testing service sign-in page
(User ID, Password, Sign in button) from the technical assessment.

## What's tested

- The sign-in form loads with the expected fields
- Submitting the form empty shows an error
- Submitting made-up details shows an error
- Valid credentials sign the user in

## Important: why the tests run against a local page

The live sign-in page (https://www.mot-testing.service.gov.uk/login) shows a
captcha to automated browsers, so the form cannot be reached by a test run.
I did not try to get round that check. Instead the tests run against
`stub/login.html`, a local copy of the form built from the page's HTML
(form id="Login", fields id="username" and id="password").

The error messages and the demo login (demo_tester / demo_password) belong
to that local page only. They are not DVSA's real wording or accounts.

To point the same tests at a real environment, if you have access:

    MOT_URL=https://your-environment/login MOT_USERNAME=... MOT_PASSWORD=... npm test

The error-message checks may then need adjusting to that environment's wording.

## Setup (Mac)

1. Install Node.js (LTS) from https://nodejs.org/
2. `npm install`
3. `npx playwright install chromium`
4. `npm test`

## Other scripts

- `npm run test:headed` - run with a visible browser
- `npm run report` - open the HTML report from the last run