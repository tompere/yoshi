import path from 'path';

export interface ComponentModel {
  componentId: string;
  componentPath: string;
}
export interface PageModel extends ComponentModel {
  route: string;
}
export interface MethodModel {
  methodId: string;
  methodPath: string;
}

export interface FlowBMModel {
  moduleId: string;
  pages: Array<PageModel>;
  components: Array<ComponentModel>;
  methods: Array<MethodModel>;
  moduleInitPath?: string;
  localePath: string;
  moduleConfig: any;
}

export default function createFlowBMModel(cwd = process.cwd()): FlowBMModel {
  const moduleId = require(path.join(cwd, 'package.json'))
    .name.split('/')
    .pop();

  const localePath = path.join(cwd, 'translations');
  const moduleInitPath = path.join(cwd, 'moduleInit');

  const pages = ['index'].map(filename => ({
    componentId: `${moduleId}.pages.${filename}`,
    componentPath: path.join(cwd, `pages/${filename}`),
    route: '',
  })); // ./src/pages/**/*.{ts,tsx}

  const components = ['LegacyTodoList'].map(filename => ({
    componentId: `${moduleId}.components.${filename}`,
    componentPath: path.join(cwd, `components/${filename}`),
  })); // ./src/components/**/*.{ts,tsx}

  const methods = ['getTodos'].map(filename => ({
    methodId: `${moduleId}.methods.${filename}`,
    methodPath: path.join(cwd, `methods/${filename}`),
  })); // ./src/methods/**/*.{ts,tsx}

  return {
    moduleId,
    pages,
    components,
    methods,
    localePath,
    moduleConfig: {},
    moduleInitPath,
  };
}
