import { injectGlobal } from '@emotion/css'

injectGlobal`
  :root {
    --primary: #261ee4;
    --primary300: #4038ff;
    --primary200: #6c6cff;
    --primary100: #e0e1fe;

    --secondary: #181c20;
    --secondary400: #343d44;
    --secondary300: #424e57;
    --secondary200: #52616b;
    --secondary100: #b5c1c9;

    --success: #11af52;
    --success200: #11cc5f;
    --success100: #80ffb3;

    --warning: #d4b412;
    --warning200: #eecf34;
    --warning100: #fcec9c;

    --danger: #cc392f;
    --danger200: #ff6157;
    --danger100: #eb9a93;

    --light: #ffffff;
    --dark: #000000;
  }
`;