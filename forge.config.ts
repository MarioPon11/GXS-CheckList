import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './assets/icons/GXS-Checklist',
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
      devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' data: https://unpkg.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: https://www.gstatic.com; style-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com; font-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com;" 
    }),
  ],
};

export default config;
