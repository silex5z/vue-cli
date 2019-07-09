module.exports = {
  presets : [
    // ['@vue/app'],
    ['@babel/preset-env',
      {
          "useBuiltIns": "usage", // "usage" | "entry" | false, defaults to false.
          "corejs": "3",
          "targets": {
            "ie": "10"
          }
      }
    ]
  ],
  plugins: [
    ['@babel/transform-modules-commonjs'],
    ['@babel/plugin-syntax-dynamic-import']
    
  ]
}
