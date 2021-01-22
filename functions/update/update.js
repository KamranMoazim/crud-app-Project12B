const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
  try {

    let reqObj = JSON.parse(event.body);
    // console.log(reqObj);

    var client = new faunadb.Client({ secret: "fnAD_7fdDxACADm8t6xyTjNTXTHFaCTppRj6smkK" });  // process.env.FAUNADB_ADMIN_SECRET

    var result = await client.query(
    //   q.Create(
    //     q.Collection('message'),
    //     { data: { message: reqObj.message } },
    //   )
        q.Update(
            q.Ref(q.Collection('message'), reqObj.updateID),
            // q.Ref(q.Collection('message'), "288252303160377858"),
            { data: { message: reqObj.values.message } },
        )
    );
    
    // console.log("Entry Created and Inserted in Container: " + result.ref.id);
   
    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}