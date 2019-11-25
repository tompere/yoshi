import path from 'path';
import globby from 'globby';
import componentWrapping from './componentWrapping';
import editorAppWrapping from './editorAppWrapping';
import settingsWrapping from './settingsWrapping';
import viewerScriptWrapping from './viewerScriptWrapping';
import wixPrivateMockWrapping from './wixPrivateMockWrapping';

const generatedWidgetEntriesPath = path.resolve(__dirname, '../tmp/components');

export const buildEditorPlatformEntries = () => {
  const userComponents = globby.sync('./src/components/todo/**/Component.js', {
    absolute: true,
  });

  const componentEntries = componentWrapping(
    generatedWidgetEntriesPath,
    userComponents,
  );

  const userController = globby.sync('./src/components/todo/**/controller.js', {
    absolute: true,
  });
  const userInitApp = globby.sync('./src/components/initApp.js', {
    absolute: true,
  });

  const editorAppEntries = editorAppWrapping(
    generatedWidgetEntriesPath,
    userComponents,
    userController[0],
    userInitApp[0],
  );

  const userSettings = globby.sync('./src/components/todo/**/Settings.js', {
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
  const userController = globby.sync('./src/components/todo/**/controller.js', {
    absolute: true,
  });
  const userInitApp = globby.sync('./src/components/initApp.js', {
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
