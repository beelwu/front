/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module 'index.ts' {
    export { }
}
declare module 'zf-minio-upload' {
    export { Minio }
}
declare module 'vue-seamless-scroll' {
    export { }
}
declare module 'vue-esign' {
    export { }
}
declare module 'vue-signature-pad'{
    export { }
}
declare interface T {
    [key: string]: any;
}

declare interface A {
    [key: string]: any;
}
