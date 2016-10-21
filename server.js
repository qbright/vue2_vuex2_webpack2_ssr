process.env.VUE_ENV = 'server';
const isProd = process.env.NODE_ENV === 'production';

const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const express = require('express');
const serialize = require('serialize-javascript');

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const app = express();

//将html文件切割为头尾两部分,生成文件的时进行拼接
const html = (() => {
    const template = fs.readFileSync(resolve('./src/index.html'), 'utf-8')
    const i = template.indexOf('{{ APP }}')
    //如果是开发调试状态,css会直接插入页面中,而不是应用文件
    const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
    return {
        head: template.slice(0, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }
})();

let renderer;
if (isProd) {
    //如果是生产环境,bundle是构建完成的正式文件
    const bundlePath = resolve('./dist/server-bundle.js')
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {

    //如果是开发环境,bundle会在改变之后重新回调生成
    require('./build/setup-dev-server')(app, bundle => {
        renderer = createRenderer(bundle)
    })
}

function createRenderer(bundle) {
    return createBundleRenderer(bundle);
}

app.use('/dist', express.static(resolve('./dist')))

app.get("/file", (req, res)=> {
    //这个接口用于在真是环境中生成静态页面
    if (!isProd) {
        res.end("please run this api on the product environment");
        return;
    }

    if (!renderer) {
        return res.end("waiting for compilation... refresh in a moment.");
    }

    const context = {};
    //调用renderToString 一次性生成文件
    renderer.renderToString(context, (error, htmltext)=> {

        var s = html.head + htmltext + html.tail;

        fs.writeFile(resolve("./files/gener.html"), s, ()=> {
            res.end("OK");
        })

    });


});

app.get('/', (req, res) => {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
    }

    const context = {}


    //调用 renderToSStream 流式渲染

    const renderStream = renderer.renderToStream(context)

    let firstChunk = true

    res.write(html.head)

    renderStream.on('data', chunk => {
        if (firstChunk) {
            // embed initial store state
            if (context.initialState) {
                res.write(
                    `<script>window.__INITIAL_STATE__=${
                        serialize(context.initialState, {isJSON: true})
                        }</script>`
                )
            }
            firstChunk = false
        }
        res.write(chunk)
    })

    renderStream.on('end', () => {
        res.end(html.tail)
    })

})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
