import path from 'path';
import globby from 'globby';
import componentWrapping from './wrappers/componentWrapping';
import editorAppWrapping from './wrappers/editorAppWrapping';
import settingsWrapping from './wrappers/settingsWrapping';
import viewerScriptWrapping from './wrappers/viewerScriptWrapping';
import wixPrivateMockWrapping from './wrappers/wixPrivateMockWrapping';

const generatedWidgetEntriesPath = path.resolve(__dirname, '../tmp/components');

export const buildEditorPlatformEntries = () => {
  const userComponents = globby.sync(
    './src/components/*/Component.(js|ts|tsx)',
    {
      absolute: true,
    },
  );

  const componentEntries = componentWrapping(
    generatedWidgetEntriesPath,
    userComponents,
  );

  const userControllers = globby.sync(
    './src/components/*/controller.(js|ts|tsx)',
    {
      absolute: true,
    },
  );
  const userInitApp = globby.sync('./src/initApp.(js|ts|tsx)', {
    absolute: true,
  });

  const editorAppEntries = editorAppWrapping(
    generatedWidgetEntriesPath,
    userComponents,
    userControllers,
    userInitApp[0],
  );

  const userSettings = globby.sync('./src/components/*/Settings.(js|ts|tsx)', {
    absolute: true,
  });

  const settingsEntries = settingsWrapping(
    generatedWidgetEntriesPath,
    userSettings,
  );

  const wixPrivateMockEntry = wixPrivateMockWrapping();

  return {
    ...wixPrivateMockEntry,
    ...componentEntries,
    ...editorAppEntries,
    ...settingsEntries,
  };
};

export const buildViewerScriptEntry = () => {
  const userController = globby.sync(
    './src/components/*/controller.(js|ts|tsx)',
    {
      absolute: true,
    },
  );
  const userInitApp = globby.sync('./src/initApp.(js|ts|tsx)', {
    absolute: true,
  });

  return viewerScriptWrapping(
    generatedWidgetEntriesPath,
    userController,
    userInitApp[0],
  );
};

export const webWorkerExternals = {
  lodash: {
    commonjs: 'lodash',
    amd: 'lodash',
    root: '_',
  },
};
