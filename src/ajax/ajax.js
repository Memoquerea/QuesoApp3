const $=
{
  ajax(method,url,onComplete,body)
  {
	if(body) body=JSON.stringify(body); 

	let xhr = new XMLHttpRequest();
        xhr.onload = function(){

            if (xhr.status === 200 || xhr.status === 201) {
	
	                let APIResponse = JSON.parse(xhr.responseText);
			onComplete(APIResponse);
            }

        }

        xhr.open(method,url);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.send(body);
	
  }
}


export default $;
