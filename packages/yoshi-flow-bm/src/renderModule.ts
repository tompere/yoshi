import path from 'path';
import fs from 'fs';
import { FlowBMModel } from './createFlowBMModel';

const generateModuleCode = ({
  moduleId,
  components,
  methods,
  pages,
  moduleInitPath,
  localePath,
  moduleConfig,
}: FlowBMModel) => `
import { createModule } from 'yoshi-flow-bm-runtime';

createModule({
  moduleId: '${moduleId}',
  pages: [
    ${pages.map(
      ({ componentId, componentPath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import('${componentPath}')).default,
      },
    `,
    )}
  ],
  components: [
    ${components.map(
      ({ componentId, componentPath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import('${componentPath}')).default,
      },
    `,
    )}
  ],
  methods: [
    ${methods.map(
      ({ methodId, methodPath }) => `
      {
        methodId: '${methodId}',
        loadMethod: () => require('${methodPath}').default,
      }`,
    )}
  ], // ${JSON.stringify(methods)},
  ${moduleInitPath ? `moduleInit: require('${moduleInitPath}').default,` : ''}
  loadLocale: locale => import(\`${localePath}/\${locale}\`),
  config: ${JSON.stringify(moduleConfig)},
});`;

const renderModule = (model: FlowBMModel) => {
  const tempPath = path.resolve(__dirname, '../tmp');
  const filePath = path.join(tempPath, 'module.ts');

  fs.mkdirSync(tempPath, { recursive: true });
  fs.writeFileSync(filePath, generateModuleCode(model));

  return filePath;
};

export default renderModule;
