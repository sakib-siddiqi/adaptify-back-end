export async function GET(){
    return Response.json({
        name : "Sakib Siddiqi Supto",
        github : 'https://github.com/sakib-siddiqi',
        contacts : {
            mail : 'sakib@gmail.com',
            phone : '01715-073522'
        }
    })
}