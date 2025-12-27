//Dom manipulation stuff herre lol

const form = document.getElementById("form");
const UrlInput = document.getElementById("url-input");
const shortendUrl = document.getElementById("shortened-url");
const copyBtn = document.getElementById("copy-btn");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-message");
const result = document.getElementById("short-url");
const loader = document.getElementById("loader");
const copyStuff = document.getElementById("copy-Stuff");
//so basically the idea here is to make a request to tiny url using their api 
//so what happens is we sen over our long url and tinyurl sends back a shortend url

async function shortenUrl(longUrl)
{
  const apiUrl  ="https://api.tinyurl.com/create";
  //I know its not a good idea to hard code the token here 
  //but fuck it  its just a demo
  const token = "OhTG3rQRyLZ7Q721gkPON5cE7rP2FIVK9dnOPV6EdppIbrFa5G90fDfOWNMM";

  try {
    const response = await fetch(apiUrl,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        url:longUrl
      })
    });

    if (response.ok === false)
    {
      errorMsg.style.display="block";
      errorMsg.innerText="Something went wrong with the api please try again ";
      return null;
    }

    const data = await response.json();
    return data.data.tiny_url;

  } catch (error) {
    errorMsg.style.display="block";
    errorMsg.innerText="Something went wrong ,Please try again later";
    //Thi finna return null 
    return null;
  }
}

form.addEventListener("submit",async (e)=>{
  e.preventDefault();
  const longUrl = UrlInput.value.trim();

  //Thi two things are kind funny think of it this way once the person clicks
  //then the submit button will turn off KInda like unpresssable 
  //And it will jsut say shortning during the process 
  //Hopefully I will add a properl loader here once this is done 

  submitBtn.innerText="Shortening...";
  submitBtn.disabled=true;
  loader.style.display="block";
  errorMsg.style.display="none";
  result.style.display="none";
  copyBtn.style.display="none";

  const shrtUrl = await shortenUrl(longUrl);

  if (shrtUrl!==null)
  {
    shortendUrl.href=shrtUrl;
    shortendUrl.innerText=shrtUrl;
    result.style.display="block";
    copyBtn.style.display="block";
    copyStuff.style.display="block";
    loader.style.display="none";

  }

  submitBtn.disabled=false;
  submitBtn.innerText="Shorten URL";
});



//Clip thingy 

const copyButton = document.getElementById("copy-button");
//Dont ask i stole it online somewhere 
if (copyButton) {
  copyButton.addEventListener("click",()=>{
    copyTextToClipboard(shortendUrl.textContent);
  });
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.writeText(text);
}
