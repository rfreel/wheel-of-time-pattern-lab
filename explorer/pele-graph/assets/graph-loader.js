(async()=>{
const e=document.getElementById('diagram-error');
try{
 if(typeof DecompressionStream!=='function') throw new Error('Browser does not support DecompressionStream; open the full standalone HTML instead.');
 const parts=window.PATTERN_GRAPH_PARTS;
 if(!parts||parts.length!==7||parts.some(x=>typeof x!=='string'))throw new Error('Graph asset part missing');
 const ascii=atob(parts.join(''));
 const bytes=new Uint8Array(ascii.length);
 for(let i=0;i<ascii.length;i++)bytes[i]=ascii.charCodeAt(i);
 const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
 window.PATTERN_GRAPH=JSON.parse(await new Response(stream).text());
 if(window.PATTERN_GRAPH.nodes.length!==6713||window.PATTERN_GRAPH.edges.length!==30817)throw new Error('Graph is incomplete');
 const script=document.createElement('script');script.src='app.js';script.onerror=()=>{e.hidden=false;e.textContent='Application script missing.'};document.body.append(script);
}catch(err){e.hidden=false;e.textContent='Graph could not initialize: '+String(err?.message||err);}
})();
