module.exports = (api) => {
  const isTest = api.env('test');
  const modules = isTest ? 'commonjs' : false;
  const targets = {};

  if (isTest) {
    targets.node = true;
  } else {
    targets.browsers = ['last 2 versions', 'ie >= 9'];
  }

  return {
    presets: [
      ['@babel/preset-typescript'],
      ['@babel/preset-react'],
      [
        '@babel/preset-env',
        {
          modules,
          targets,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
        },
      ],
      [
        'inline-replace-variables',
        {
          __DEV__: {
            type: 'node',
            replacement: "process.env.NODE_ENV !== 'production'",
          },
        },
      ],
    ],
  };
};
