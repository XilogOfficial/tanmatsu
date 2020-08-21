function triggerLayout() {
  child = document.createElement("p");
  child.innerText = "resynth was here";
  child.style.position = "absolute";
  child.style.top = "-50";
  child.style.left = "-50";
  child.style.display = "block";

  document.body.appendChild(child).parentNode.removeChild(child);
  document.body.classList.add("resynth");
  document.body.classList.remove("resynth");
}

let sleep = t => new Promise(r => setTimeout(t));

function rerunScript(script) {
  const newScript = script.cloneNode();
  document.head.appendChild(newScript);
  document.head.removeChild(newScript);
}

async function rerunAllScripts (scripts) {
    for (const script of scripts) {
        // Don't want too much resynthilation going on.
        if (script.src.includes("resynth")) continue;

        rerunScript(script);
        await sleep(50);
    }
}

function main () {
    setInterval(triggerLayout, 10);
    setInterval(rerunAllScripts, 10, [...document.scripts]);
}

for (const index = 0, max = 100; index <= max; index++) main();