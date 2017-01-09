/**
 * Created by guoyu on 2016/10/7.
 */
export default async(ctx, next) => {
    let pack_token = ctx.session['pack_token'];
    if (pack_token != undefined && pack_token != null && pack_token != '') {
        await next();
    } else {
        ctx.status = 301;
        ctx.set('Cache-Control','no-cache');
        await ctx.render('auth/sign_in');
    }
}