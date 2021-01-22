const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {

    let reqObj = JSON.parse(event.body);
    // console.log(reqObj);

    var client = new faunadb.Client({ secret: process.env.FAUNADB_ADMIN_SECRET });

    // var result = await client.query(
    //   q.Create(
    //     q.Collection('message'),
    //     { data: { message: reqObj.message } },
    //   )
    // );
    const result = await client.query(
        q.Delete(q.Ref(q.Collection('message'), reqObj)),
        // console.log('todos', reqObj)
      )
    
    // console.log("Entry Created and Inserted in Container: " + result.ref.id);
   
    return {
      statusCode: 200,
    //   body: JSON.stringify({ id: `${result.ref.id}` }),
    body: JSON.stringify({ message: `Delete ${result}` }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}