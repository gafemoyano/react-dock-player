module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactDockPlayer',
      externals: {
        react: 'React'
      }
    }
  }
}
