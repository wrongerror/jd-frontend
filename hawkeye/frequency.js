export default function Frequency(ctx,id,max=100) {
    var num=ctx.session['request-'+id];
    if(num>max){
        return true
    }
    if(num==undefined){
        ctx.session['request-'+id]=1
    }else{
        ctx.session['request-'+id]+=1
    }

    return false
}