/* eslint-disable prettier/prettier */

const autoprefixer = require('autoprefixer');
const path = require('path');
const SpritesminthPlugin = require('webpack-spritesmith');
function resolve(dir) {
  return path.join(__dirname, dir)
}
/**
 * @description 设置雪碧图自定义函数（图标为二倍图）
 * @param  {Object} data
 */
const templateFunction = function (data) {
  const shared = '.z-icon { position: relative; display:inline-block; }';
  // 注意：此处默认图标使用的是二倍图
  const perSprite = data.sprites.map(function (sprite) {
    const activeStr = '-active';
    const name = sprite.name;
    if (name.indexOf(activeStr) !== -1) {
      return '.z-icon.z-icon-N.is-active::after { background-position: Xpx Ypx; }'
      .replace(/N/g, name.replace(activeStr, ''))
      .replace(/X/g, sprite.offset_x)
      .replace(/Y/g, sprite.offset_y);
    } else {
      return '.z-icon.z-icon-N{ width: SWpx; height: SHpx; }\n.z-icon.z-icon-N::after { content: ""; display:block; position:absolute; top: -50%; left: -50%; width: Wpx; height: Hpx; background-image: url(I); background-position: Xpx Ypx; transform: scale(.5); }'
      .replace(/N/g, sprite.name)
      .replace(/SW/g, sprite.width / 2)
      .replace(/SH/g, sprite.height / 2)
      .replace(/W/g, sprite.width)
      .replace(/H/g, sprite.height)
      .replace(/X/g, sprite.offset_x)
      .replace(/Y/g, sprite.offset_y)
      .replace(/I/g, data.sprites[0].image);
    }
    // background-size: SWpx SHpx;
  }).join('\n');
  return shared + '\n' + perSprite;
};


module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    './' : '/',
  configureWebpack: {
    resolve: {
      modules: [
        'node_modules',
        'assets/sprite' // 存放sprite图地址
      ]
    },
    externals: {
      "vue": 'Vue',
      "vue-router": 'VueRouter',
      "vuex": 'Vuex',
      "axios": 'axios',
      "vant": 'vant'
    },
    plugins: [
      new SpritesminthPlugin({
        src: {
          cwd: path.resolve(__dirname, './src/assets/sprite/'), // 图标根路径
          glob: '**/*.png' // 匹配任意 png 图标
        },
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprites.png'), // 生成雪碧图目标路径与名称
          // 设置生成CSS背景及其定位的文件或方式
          css: [
            [path.resolve(__dirname, './src/assets/styles/sprite.scss'), {
              format: 'function_based_template'
            }]
          ]
        },
        customTemplates: {
          'function_based_template': templateFunction,
        },
        apiOptions: {
          cssImageRef: "../images/sprites.png", // css文件中引用雪碧图的相对位置路径配置
        },
        spritesmithOptions: {
          padding: 4
        }
      })
    ]
  }, 
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('public', resolve('public'))
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer()
          // pxtorem({
          //   rootValue: 37.5,
          //   propList: ['*']
          // })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/contractManager': {
        target: 'http://192.168.3.15:8077',
        changeOrigin: true,
        pathRewrite: {
          '^/contractManager': '/contractManager'
        }
      }
    }
  }
}
