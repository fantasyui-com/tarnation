export default function recurse({node}){

          // Always an array response, in the form of a code node.
          let response = [];

          if(node.type == 'ObjectExpression'){

            let results = (node.properties||[])
            .map(node=>recurse({node}))
            .filter(i=>i)
            //console.log(results)
            response.push(`{${results.join(', ')}}`)

          }else if(node.type == 'Literal'){


            let out = node.value;
            out = out.toString();
            if((typeof out === 'string') && (out.includes("\\"))){
              out = out.replace(/\\/g,'\\\\');
            }
            response.push(`"${out}"`)



          }else if(node.type == 'Property'){

            if(node.value.type == 'Literal'){
              let out = node.value.value;

              if((out) && (out != 'null') && (node.key.name) ){

                out = out.toString();
                if((typeof out === 'string') && (out.includes("\\"))){
                  out = out.replace(/\\/g,'\\\\');
                }

              response.push(`"${node.key.name}": "${out}"`)
              }

            }else if(node.value.type == 'ObjectExpression'){
              //response.push(`"${node.key.name}": ${recurse({node:node.value.join('')})}`)
              let out = recurse({node:node.value});
              if((out) && (out != '{}')){
              response.push(`"${node.key.name}": ${out}`)
              }

            }else if(node.value.type == 'ArrayExpression'){



              let results = (node.value.elements||[])
              .map((node)=> recurse({node}) )
              .filter(i=>i);
              let out = results.filter(i=>i).join(', ');
              if(out){
              response.push(`"${node.key.name}": [${out}]`)
              }

            }

          }else{
            //console.log('node.body', typeof node.body, node.body)
            //console.log('node.properties', typeof node.properties, node.properties)

            let results = [];
            if(node.body && Array.isArray(node.body)){
              results = node.body.map(node=>recurse({node})) .filter(i=>i)
            }else if ((node.body) && (node.body.body) && Array.isArray(node.body.body)){
              results = node.body.body.map(node=>recurse({node})) .filter(i=>i)
            }else if(Array.isArray(node.properties)){
              results = node.properties.map(node=>recurse({node})) .filter(i=>i)
            }


            response.concat(results);
          }

          return response.join();

       
}; // default function
