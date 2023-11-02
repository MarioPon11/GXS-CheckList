import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { PublisherGithub } from '@electron-forge/publisher-github';
import dotenv from 'dotenv';
dotenv.config();

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './src/assets/icons/icon.ico',
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({setupIcon: './src/assets/GXS-Checklist.ico'}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
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
      devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' data: https://unpkg.com https://api.update.rocks; script-src 'self' 'unsafe-eval' 'unsafe-inline' data: https://www.gstatic.com; style-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com; font-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com https://fonts.gstatic.com https://unpkg.com;" 
    }),
  ],
  publishers: [new PublisherGithub({
    repository: {
      owner: 'MarioPon11',
      name: 'GXS-CheckList'
    },
    prerelease: false,
    draft: false,
    authToken: process.env.GITHUB_TOKEN
  })]
};

export default config;
