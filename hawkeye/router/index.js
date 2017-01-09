import Router from 'koa-router'

const index = new Router();

index
    .get('/',async ctx =>{
        await ctx.render('home/index')
    })
    .get('/home',async ctx =>{
        await ctx.render('home/index')
    })
    .get('/search',async ctx =>{
        await ctx.render('search/index')
    })
    .get('/login',async ctx =>{
        await ctx.render('auth/login')
    })
    .get('/forgot',async ctx =>{
        await ctx.render('auth/forgot')
    })
    .get('/enterprise/details',async ctx =>{
        await ctx.render('report/enterprise')
    })
    .get('/personal/details',async ctx =>{
        await ctx.render('report/personal')
    })
    .get('/network',async ctx =>{
        await ctx.render('network/index')
    })





    .get('/help', async ctx => {
        // 渲染模板
        // var authorization=ctx.cookies.get('authorization');
        // if( authorization==undefined||authorization==null){
        //     await ctx.render('welcome/index')
        // }else{
        //     await ctx.render('home/index')
        // }
        await ctx.render('help/index');
    })
    .get('/report/:id',async ctx => {
        await ctx.render('report/index',{id:ctx.params.id})
    })
    .get('/reports',async ctx => {
        await ctx.render('reports/index')
    })
    .get('/network/:id',async ctx => {
        await ctx.render('network/index',{id:ctx.params.id})
    });
// .get('/report/', async ctx => {
//   // 发送静态文件
//   await ctx.send(ctx, 'index.html', { root: 'static/index' })
// })

export default index