const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

/**
 * We use the NX_TSCONFIG_PATH environment variable when using the @nrwl/angular:webpack-browser
 * builder as it will generate a temporary tsconfig file which contains any required remappings of
 * shared libraries.
 * A remapping will occur when a library is buildable, as webpack needs to know the location of the
 * built files for the buildable library.
 * This NX_TSCONFIG_PATH environment variable is set by the @nrwl/angular:webpack-browser and it contains
 * the location of the generated temporary tsconfig file.
 */
const tsConfigPath = process.env.NX_TSCONFIG_PATH ? process.env.NX_TSCONFIG_PATH : path.join(__dirname, '../../tsconfig.base.json');

const workspaceRootPath = path.join(__dirname, '../../');
const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  tsConfigPath,
  [
    '@school-v2/auth/services',
    '@school-v2/web-config',
  ],
  workspaceRootPath
);

module.exports = {
  output: {
    uniqueName: 'app-phong',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {

      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: '12.2.13' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: '12.2.13' },
        '@angular/common/http': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        'ng-zorro-antd': { singleton: true, strictVersion: true },
        '@ngx-translate/core':{ singleton: true, strictVersion: true },
        '@angular/platform-browser/animations': {
          singleton: true,
          strictVersion: true,
        },

        '@ngx-translate/http-loader': { singleton: true, strictVersion: true },

        '@progress/kendo-angular-buttons': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-common': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-dateinputs': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-dropdowns': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-excel-export': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-grid': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-inputs': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-intl': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-l10n': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-label': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-pdf-export': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-popup': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-tooltip': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-angular-treeview': {
          singleton: true,
          strictVersion: true,
        },
        '@progress/kendo-data-query': { singleton: true, strictVersion: true },
        '@progress/kendo-drawing': { singleton: true, strictVersion: true },
        '@progress/kendo-licensing': { singleton: true, strictVersion: true },
        '@progress/kendo-theme-default': {
          singleton: true,
          strictVersion: true,
        },
        'ngx-spinner': { singleton: true, strictVersion: true },
        'ngx-toastr': { singleton: true, strictVersion: true },

        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
