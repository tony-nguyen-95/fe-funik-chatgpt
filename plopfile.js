module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'typeComponent',
        message: 'Is page or view or component?',
      },
      {
        type: 'input',
        name: 'name',
        message: "What is this component's name?",
      },
      {
        type: 'input',
        name: 'prefixClassName',
        message: "What is this prefixClassName's name?",
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{typeComponent}}s/{{prefixClassName}}/{{prefixClassName}}.{{typeComponent}}.tsx',
        templateFile: 'templates/component.tsx.hbs',
      },
      // new action here
      {
        type: 'add',
        path: 'src/{{typeComponent}}s/{{prefixClassName}}/{{prefixClassName}}.style.scss',
        templateFile: 'templates/style.scss.hbs',
      },
      {
        type: 'add',
        path: 'src/{{typeComponent}}s/{{prefixClassName}}/{{prefixClassName}}.type.ts',
        templateFile: 'templates/type.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/{{typeComponent}}s/{{prefixClassName}}/index.ts',
        templateFile: 'templates/index.ts.hbs',
      },
      {
        path: 'src/{{typeComponent}}s/index.ts',
        pattern: /(\/\/ EXPORTS)/g,
        template: "export * from './{{prefixClassName}}';\n$1",
        type: 'modify',
      },
    ],
  });
};
