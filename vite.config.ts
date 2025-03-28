import { defineConfig ,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
import path from "path";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
//element
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver';
// import WindiCSS from 'vite-plugin-windicss'
import { resolve } from "path";
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import tailwindcss from '@tailwindcss/vite'
const pathSrc = path.resolve(__dirname, 'src')
export default ({ mode })=> {
    const env = loadEnv(mode, process.cwd())
    return defineConfig({
        server: {
            host: '0.0.0.0',
            port: 3000,
            proxy: {
                "/api": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
                },
                // "/t": {
                //     target: 'http://34.92.188.171:9080',
                //     changeOrigin: true,
                //     rewrite: (path) => path.replace("/t", "http://34.92.188.171:9080"),
                // },
            }
        },
        base: '/',
        plugins: [
            vue(),
            tailwindcss(),
            AutoImport({
                imports: ['vue', 'vue-router'],

                resolvers: [ElementPlusResolver(), VantResolver()],
                dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
            }),
            Components({
                resolvers: [ElementPlusResolver(), VantResolver(),
                    IconsResolver({
                        prefix: "i", // 默认为i,设置为false则不显示前缀
                        enabledCollections: ["ep"],
                    }),
                ],
                dts: path.resolve(pathSrc, 'components.d.ts')
            }),
            Icons({
                autoInstall: true
            })
        ],
        resolve: {
            alias: {
                "@": resolve(__dirname, 'src'),
            }
        },
    })
}
