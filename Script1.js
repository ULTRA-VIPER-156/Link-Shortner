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
const ResultaView = document.getElementById("ResultView");

// Mobile optimizations
if ('ontouchstart' in window) {
  // Add touch feedback for mobile
  submitBtn.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.98)';
  });
  
  submitBtn.addEventListener('touchend', function() {
    this.style.transform = 'scale(1)';
  });
}
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
    ResultaView.style.display="block";

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
  // Modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyFeedback(true);
    }).catch(() => {
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    showCopyFeedback(successful);
  } catch (err) {
    showCopyFeedback(false);
  }
  
  document.body.removeChild(textArea);
}

function showCopyFeedback(success) {
  const tooltip = copyButton.querySelector('.tooltip');
  if (tooltip) {
    if (success) {
      tooltip.setAttribute('data-text-end', 'Copied!');
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      }, 2000);
    } else {
      tooltip.setAttribute('data-text-end', 'Copy failed');
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
      }, 2000);
    }
  }
}
