const {testFixture} = require('../../../fixture-utils');
const dedent = require('dedent');

describe('plugin', () => {
  beforeAll(() => {
    // Needed until we make Snowpack's JS Build Interface quiet by default
    require('snowpack').logger.level = 'error';
  });

  // TODO: Test runs and outputs as expected but doesn't
  // wait for the built asset before returning result
  it.skip('@snowpack/plugin-run-script', async () => {
    const result = await testFixture(
      {
        plugins: [
          [
            '@snowpack/plugin-run-script',
            {
              cmd: 'sass src/css:build/css --no-source-map',
            },
          ],
        ],
      },
      {
        'src/css/index.scss': dedent`
          $body-font: "fantasy";
          body {
            font-family: $body-font;
          }
        `,
        'package.json': dedent`
          {
            "version": "1.0.1",
            "name": "@snowpack/test-plugin-run-script",
            "devDependencies": {
              "@snowpack/plugin-run-script": "^2.0.0",
              "sass": "^1.26.10"
            }
          }
        `,
      },
    );
    console.log(result);
    expect(result['css/index.css']).toBeDefined();
  });
});
