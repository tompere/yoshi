import { resolve } from 'path';
import { TemplateDefinition } from './TemplateModel';

const toTemplatePath = (templateName: string) =>
  resolve(__dirname, '../templates', templateName);

const templates: Array<TemplateDefinition> = [
  { name: 'fullstack', path: toTemplatePath('fullstack') },
  { name: 'client', path: toTemplatePath('client') },
  {
    name: 'business-manager-module',
    path: toTemplatePath('business-manager-module'),
  },
  { name: 'server', path: toTemplatePath('server') },
  { name: 'library', path: toTemplatePath('library') },
  {
    name: 'out-of-iframe',
    path: toTemplatePath('out-of-iframe'),
  },
];

if (process.env.EXPERIMENTAL_FLOW_BM === 'true') {
  templates.push({
    name: 'flow-bm',
    path: toTemplatePath('flow-bm'),
  });
}
if (process.env.EXPERIMENTAL_FLOW_EDITOR === 'true') {
  templates.push({
    name: 'flow-editor',
    path: toTemplatePath('flow-editor'),
  });
}

export default templates;
