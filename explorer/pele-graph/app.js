/* Pattern Lab / Pele graph browser. Every edge is retained; diagram slices stay bounded. */
'use strict';
(() => {
  const G = window.PATTERN_GRAPH;
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if (!G || !G.nodes || !G.edges) { $('diagram-error').hidden = false; $('diagram-error').textContent = 'The graph data file is missing. Keep assets/graph-data.js beside this page.'; return; }
  const nodes = G.nodes, edges = G.edges, nt = G.types.nodeTypes, et = G.types.edgeTypes;
  const nodeId = new Map(nodes.map((n,i)=>[n[0],i]));
  const neighbors = Array.from({length:nodes.length},()=>[]);
  const groups = ['source','curated','lexical','pending'];
  const groupTotals=Object.fromEntries(groups.map(x=>[x,0]));
  const perType = new Map(nt.map((t,i)=>[t,{nodes:[],edges:0}]));
  const relCounts=Array.from({length:et.length},()=>0), relExample=Array.from({length:et.length},()=>null);
  for(let i=0;i<nodes.length;i++)perType.get(nt[nodes[i][1]]).nodes.push(i);
  for(let i=0;i<edges.length;i++){
    const [s,t,k]=edges[i],rel=et[k],family=G.types.edgeFamily[rel];
    neighbors[s].push([i,t,'out']); neighbors[t].push([i,s,'in']);
    relCounts[k]++; groupTotals[family]++;
    if(relExample[k]===null)relExample[k]=i;
  }
  const groupOrder={source:0,curated:1,lexical:2,pending:3};
  const fmt=n=>Number(n).toLocaleString('en-US');
  const active=Object.fromEntries(groups.map(x=>[x,true]));
  const familyOf = e => G.types.edgeFamily[et[edges[e][2]]];
  const filteredEdges = idx => neighbors[idx].filter(([ei])=>active[familyOf(ei)]);
  const getMeta = n => n[4] || {};
  const fullLabel = i => {
    const n=nodes[i],kind=nt[n[1]],meta=getMeta(n);
    if(kind==='CHUNK'){
      const match=n[0].match(/^(b\d\d:c[^:]+):chunk/);
      const par=match&&nodeId.get(match[1]);
      const chapter=par!==undefined?nodes[par][2]:'';
      return chapter+' / '+n[2];
    }
    if(kind==='CHAPTER') {
      const b=n[3], bk=nodeId.get('book:'+b);
      return (bk!==undefined?nodes[bk][2]+' / ':'')+n[2];
    }
    return n[2];
  };
  const displayName = i => fullLabel(i);
  const shortName = (i,max=28) => {
    const n=nodes[i],typ=nt[n[1]];
    if(typ==='CHUNK')return 'Chunk '+n[0].match(/chunk(\d+)/)[1].replace(/^0+/,'')+' · '+n[0].split(':')[0];
    const l=n[2];return l.length>max?l.slice(0,max-1)+'…':l;
  };
  const labelFor = i => nt[nodes[i][1]]+' · '+fullLabel(i);
  const safeLabel = text => String(text).replace(/"/g,"'").replace(/[\n\r\t\[\]{}|]/g,' ').replace(/\s+/g,' ').slice(0,65);
  const baseClassDef=`classDef focus fill:#233d32,color:#f5f1e5,stroke:#a8533b,stroke-width:2px;\nclassDef faded fill:#f0eee6,color:#2a4133,stroke:#8e9689,stroke-width:1px;`;
  const defaultMermaid = 'flowchart LR\n  n0["Graph loading"]';
  let selected=nodeId.get('curated_pov:Rand al\'Thor') ?? 0;
  let mode='overview',typePicked=null,focusPage=0,listPage=0,focusSubset=18,listSize=36, diagram=null, lastMermaid=defaultMermaid, lastSVG='', pathFrom=selected, pathTo=nodeId.get("location:Emond's Field")??1, currentPath=null;
  let searchResults=[];
  const urlNode = id => '#node='+encodeURIComponent(id);
  const urlType = typ => '#type='+encodeURIComponent(typ);
  function setMode(which,rerender=true){mode=which;document.querySelectorAll('[data-mode]').forEach(b=>{const a=b.dataset.mode===which;b.classList.toggle('active',a);b.setAttribute('aria-current',a?'page':'false');});if(rerender)render();}
  function chooseNode(idx,updateURL=true){if(idx==null || !nodes[idx])return;selected=idx;typePicked=null;focusPage=0;listPage=0;setMode('focus',false);if(updateURL)history.replaceState(null,'',urlNode(nodes[idx][0]));render();if(window.innerWidth<760)document.querySelector('#graph-space').scrollIntoView({block:'start',behavior:'smooth'});}
  function chooseType(typ,updateURL=true){if(!perType.has(typ))return;typePicked=typ;listPage=0;setMode('overview',false);if(updateURL)history.replaceState(null,'',urlType(typ));render();}
  function applyHash(){const h=location.hash;if(h.startsWith('#node=')){const val=decodeURIComponent(h.slice(6));if(nodeId.has(val)){chooseNode(nodeId.get(val),false);return;}}else if(h.startsWith('#type=')){const val=decodeURIComponent(h.slice(6));if(perType.has(val)){chooseType(val,false);return;}}else if(h==='#path'){setMode('path');return;}else if(h==='#overview'){typePicked=null;setMode('overview');return;}}
  window.addEventListener('hashchange',applyHash);

  // A real search over the complete 6,713-node list, not a sample.
  function search(q,limit=25){const norm=q.trim().toLowerCase();if(!norm)return [];
    const parts=norm.split(/\s+/);const ranked=[];
    for(let i=0;i<nodes.length;i++){
      const n=nodes[i],full=fullLabel(i).toLowerCase(),id=n[0].toLowerCase(),typ=nt[n[1]].toLowerCase();
      const hit=(parts.every(x=>full.includes(x))||parts.every(x=>id.includes(x)));
      if(!hit)continue;
      let score=full===norm?100:full.startsWith(norm)?65:full.includes(norm)?35:20;
      if(id===norm)score+=100;if(typ==='pov_owner')score+=8;if(typ==='chapter')score+=4;
      ranked.push([i,score]);
    }
    ranked.sort((a,b)=>b[1]-a[1]||fullLabel(a[0]).localeCompare(fullLabel(b[0])));
    return ranked.slice(0,limit).map(x=>x[0]);
  }
  function refreshSearch(){const q=$('search').value;searchResults=search(q,25);const box=$('search-results');if(!q.trim()){box.innerHTML='';return;}
    box.innerHTML=searchResults.map(i=>`<button class="search-hit" type="button" data-node="${i}">${esc(shortName(i,46))}<small>${esc(nt[nodes[i][1]])} / ${esc(nodes[i][0])}</small></button>`).join('')||'<div class="type-note">No source entity matches that query.</div>';
    box.querySelectorAll('[data-node]').forEach(b=>b.addEventListener('click',()=>{chooseNode(Number(b.dataset.node));$('search').value='';refreshSearch();}));
  }
  $('search').addEventListener('input',refreshSearch);
  $('search').addEventListener('keydown',e=>{if(e.key==='Enter'&&searchResults.length){chooseNode(searchResults[0]);$('search').value='';refreshSearch();e.preventDefault();}});
  const quick=[['Rand al\'Thor','curated_pov:Rand al\'Thor'],['The Last Battle','b14:c37'],['Emond\'s Field',"location:Emond's Field"],['First timeline event','curated_event:0000'],['The One Power','magic_concept:one_power'],['Exact paragraph echo','echo_pair:0']];
  $('quick-links').innerHTML=quick.filter(([_,id])=>nodeId.has(id)).map(([text,id])=>`<button type="button" data-jump="${esc(id)}">${esc(text)}</button>`).join('');
  $('quick-links').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>chooseNode(nodeId.get(b.dataset.jump))));
  for(const name of groups){$('count-'+name).textContent=fmt(groupTotals[name]);}
  for(const c of document.querySelectorAll('[data-family]'))c.addEventListener('change',()=>{active[c.dataset.family]=c.checked;focusPage=0;listPage=0;render();});
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{typePicked=null;setMode(b.dataset.mode);if(b.dataset.mode==='overview')history.replaceState(null,'','#overview');if(b.dataset.mode==='path')history.replaceState(null,'','#path');}));
  $('metric-nodes').textContent=fmt(nodes.length);$('metric-edges').textContent=fmt(edges.length);$('metric-types').textContent=fmt(et.length);$('footer-total').textContent=fmt(edges.length);

  function renderDiagram(source){lastMermaid=source;window.PATTERN_LAST_MERMAID=source;const diag=$('diagram'),err=$('diagram-error');
    try{
      if(!window.pele || typeof window.pele.mount!=='function')throw new Error('Pele runtime missing. Keep vendor/pele.global.js beside this document. The data and evidence ledger are still available.');
      if(diagram){diagram.update(source);if(diagram.error)throw diagram.error;}
      else diagram=window.pele.mount(diag,source,{zoom:'auto',maxEdges:250,limit:40000,links:true,images:false,onError:er=>{err.hidden=false;err.textContent='Pele could not render the current slice: '+String(er?.message??er);},onRender:result=>{lastSVG=result.svg;err.hidden=true;}});
      if(diagram.error)throw diagram.error;
      lastSVG=diagram.result?.svg||lastSVG;
      err.hidden=true;
      $('engine-status').textContent='RENDERED BY PELE 1.10.0 / MERMAID → SVG';
    }catch(e){err.hidden=false;err.textContent='Diagram unavailable: '+String(e?.message||e);$('engine-status').textContent='PELE UNAVAILABLE / DATA LEDGER REMAINS ACTIVE';}
  }
  const mermaidNode=(name,label,cls='faded')=>`${name}["${safeLabel(label)}"]:::${cls}`;
  const clickLine=(name,destination)=>`click ${name} "${destination}" "Inspect"`;
  const edgeLabel=k=>G.types.relationshipLabels[et[k]]||et[k].toLowerCase().replace(/_/g,' ');
  function overview(){
    const out=['flowchart LR'];
    for(let i=0;i<nt.length;i++){const group=perType.get(nt[i]);out.push('  '+mermaidNode('t'+i,`${fmt(group.nodes.length)} ${G.types.nodeLabels[nt[i]]}${group.nodes.length===1?'':'s'}`));}
    const pair=new Map();
    for(let i=0;i<edges.length;i++){
      const e=edges[i],family=familyOf(i);if(!active[family])continue;
      const a=nodes[e[0]][1],b=nodes[e[1]][1],key=a+','+b+','+e[2];pair.set(key,(pair.get(key)||0)+1);
    }
    for(const [key,count] of pair){const [a,b,k]=key.split(',').map(Number);out.push(`  t${a} -->|"${fmt(count)}"| t${b}`);}
    out.push('  '+baseClassDef);
    for(let i=0;i<nt.length;i++)out.push('  '+clickLine('t'+i,urlType(nt[i])));
    $('view-index').textContent='02 / COMPLETE STRUCTURAL MAP';$('view-count').textContent=fmt(nodes.length)+' NODES / '+fmt(edges.length)+' EDGES';
    $('graph-title').textContent='The evidence architecture';$('graph-subtitle').textContent='Ten entity families. Eleven relation types. Every original link is accounted for.';
    $('diagram-footnote').textContent='Pele shows an edge-weighted condensation of the complete dataset; click a family or inspect a specific entity.';
    $('previous-slice').hidden=true;$('next-slice').hidden=true;renderDiagram(out.join('\n'));
    if(typePicked)renderTypeOverview(typePicked);else renderRelationsOverview();
  }
  function renderRelationsOverview(){
    $('list-title').textContent='RELATIONSHIP TYPES / FULL GRAPH';$('list-total').textContent=fmt(edges.length)+' TOTAL';
    $('data-list').innerHTML=et.map((typ,k)=>{
      const fam=G.types.edgeFamily[typ],ei=relExample[k],ex=edges[ei];
      return `<button class="relation-row" type="button" data-ei="${ei}"><span class="relation-number">${String(k+1).padStart(2,'0')}</span><span class="relation-main"><strong>${esc(G.types.relationshipLabels[typ])}</strong><small>${esc(nt[nodes[ex[0]][1]])} → ${esc(nt[nodes[ex[1]][1]])}</small></span><span class="relation-badge ${fam}">${fam}</span><span class="relation-number">${fmt(relCounts[k])}</span></button>`;
    }).join('');
    $('data-list').querySelectorAll('[data-ei]').forEach(b=>b.addEventListener('click',()=>chooseNode(edges[Number(b.dataset.ei)][0])));
    $('list-pager').innerHTML='';
    $('inspector-content').innerHTML=`<div class="inspector-id">GLOBAL / EVIDENCE GRAPH</div><h3>All the material. Not all the meaning.</h3><p>This atlas preserves <b>${fmt(nodes.length)}</b> nodes and <b>${fmt(edges.length)}</b> directed edges, without promoting lexical evidence into established fictional-world relationships.</p><div class="inspector-caution">No “knows,” “causes,” “foreshadows” or independently adjudicated magic-rule relations were present in the source graph.</div><div class="mini-stat">BREAKDOWN BY RESEARCH EVIDENCE</div><dl>${groups.map(g=>`<dt>${g.toUpperCase()}</dt><dd>${fmt(groupTotals[g])} original edges</dd>`).join('')}</dl>`;
  }
  function renderTypeOverview(typ){
    const arr=perType.get(typ).nodes;
    $('list-title').textContent=typ.replace(/_/g,' ')+' / ALL NODES';$('list-total').textContent=fmt(arr.length)+' RECORDS';
    paginate(arr, (i)=>`<button class="relation-row" type="button" data-node="${i}"><span class="relation-main"><strong>${esc(displayName(i))}</strong><small>${esc(nodes[i][0])}</small></span><span class="relation-number">${fmt(neighbors[i].length)} edges</span></button>`, n=>chooseNode(Number(n)),'node');
    $('inspector-content').innerHTML=`<div class="inspector-id">NODE FAMILY / ${esc(typ)}</div><h3>${esc(G.types.nodeLabels[typ])}</h3><p>${fmt(arr.length)} records in the original graph. Select an individual node to follow its actual provenance-coded relationships.</p><button class="inspector-action" id="clear-type" type="button">SHOW ALL RELATIONSHIP TYPES ↗</button>`;
    $('clear-type').addEventListener('click',()=>{typePicked=null;render();});
  }
  function sortedAdj(idx){
    return filteredEdges(idx).sort((a,b)=>groupOrder[familyOf(a[0])]-groupOrder[familyOf(b[0])]|| (Number(edges[b[0]][3].count)||0)-(Number(edges[a[0]][3].count)||0)||displayName(a[1]).localeCompare(displayName(b[1])));
  }
  function focus(){
    const adj=sortedAdj(selected),count=adj.length;
    focusPage=Math.min(focusPage,Math.max(0,Math.ceil(count/focusSubset)-1));
    const slice=adj.slice(focusPage*focusSubset,(focusPage+1)*focusSubset);
    const out=['flowchart LR','  '+mermaidNode('c',shortName(selected,37),'focus')];
    const linked=new Map();let cursor=0;
    for(const [ei,other,dir] of slice){if(!linked.has(other)){linked.set(other,'n'+(++cursor));out.push('  '+mermaidNode(linked.get(other),shortName(other,30)));}}
    for(const [ei,other,dir] of slice){const node=linked.get(other),rel=G.types.relationshipLabels[et[edges[ei][2]]],mid=rel.length>22?rel.slice(0,19)+'…':rel;out.push(dir==='out'?`  c -->|"${safeLabel(mid)}"| ${node}`:`  ${node} -->|"${safeLabel(mid)}"| c`);}
    out.push('  '+baseClassDef, '  '+clickLine('c',urlNode(nodes[selected][0])));
    for(const [other,n] of linked)out.push('  '+clickLine(n,urlNode(nodes[other][0])));
    $('view-index').textContent='02 / NODE NEIGHBORHOOD';$('view-count').textContent=fmt(count)+' VISIBLE EDGES';
    $('graph-title').textContent=shortName(selected,42);
    $('graph-subtitle').textContent=esc(nt[nodes[selected][1]]).replace(/&/g,'&')+' · '+fmt(count)+' filtered relationships. No edges are discarded: inspect them below.';
    $('diagram-footnote').textContent=count?`Pele diagram: ${fmt(slice.length)} edges, slice ${focusPage+1} of ${Math.ceil(count/focusSubset)}. Below: full paginated edge ledger.`:'No relationships in the selected evidence layers.';
    $('previous-slice').hidden=count<=focusSubset;$('next-slice').hidden=count<=focusSubset;
    $('previous-slice').disabled=focusPage===0;$('next-slice').disabled=(focusPage+1)*focusSubset>=count;
    renderDiagram(out.join('\n'));
    $('list-title').textContent='EDGES / '+shortName(selected,45).toUpperCase();$('list-total').textContent=fmt(count)+' FILTERED';
    paginate(adj, ([ei,other,dir])=>{
      const e=edges[ei],fam=familyOf(ei),rel=edgeLabel(e[2]);
      const count=e[3]?.count;
      return `<button type="button" class="relation-row" data-node="${other}"><span class="relation-badge ${fam}">${fam}</span><span class="relation-main"><strong>${esc(displayName(other))}</strong><small>${dir==='out'?'OUT →':'← IN'} ${esc(rel)}${count?' · '+fmt(count)+' matches':''}</small></span><span class="relation-number">↗</span></button>`;
    }, n=>chooseNode(Number(n)),'node');
    renderInspector(selected,adj);
  }
  function renderInspector(idx,adj){
    const n=nodes[idx],typ=nt[n[1]],meta=getMeta(n),b=n[3];
    const list=Object.entries(meta).filter(([k])=>k!=='id');
    const evidence=groups.map(g=>[g,adj.filter(([ei])=>familyOf(ei)===g).length]).filter(x=>x[1]);
    $('inspector-content').innerHTML=`<div class="inspector-id">${esc(typ)} / SOURCE IDENTIFIER</div><h3>${esc(displayName(idx))}</h3><div class="mini-stat">${fmt(neighbors[idx].length)} TOTAL EDGES · ${fmt(adj.length)} VISIBLE</div><div class="inspector-caution">${esc(typ==='POV_OWNER'?'A POV assignment is not evidence that this person interacted with another named entity.':typ==='CURATED_TIMELINE_EVENT'?'A source-indexed event has not been independently synchronized with the private narrative.':typ==='MAGIC_TERM'?'Matches are lexical occurrences, not validated rules of magic.':typ==='ANNOTATION_TASK_V2'?'Unreviewed annotation candidate. This is not an asserted fact.':typ==='CHUNK'?'Text remains private. Use the SHA-256 source locator to verify externally.':'Relationships retain their original source class; no semantic promotion is implied.')}</div><dl><dt>Canonical graph ID</dt><dd><code>${esc(n[0])}</code></dd><dt>Source family</dt><dd>${esc(typ)}</dd>${b!==null?`<dt>Book index</dt><dd>${b} · ${esc(nodes[nodeId.get('book:'+b)]?.[2]||'—')}</dd>`:''}${list.slice(0,15).map(([k,v])=>`<dt>${esc(k.replace(/_/g,' '))}</dt><dd><code>${esc(String(v))}</code></dd>`).join('')}${evidence.length?'<dt>Edge classes</dt><dd>'+evidence.map(([g,c])=>esc(g)+': '+fmt(c)).join(' / ')+'</dd>':''}</dl><button class="inspector-action" id="use-path-start">TRACE FROM THIS NODE ↗</button>`;
    $('use-path-start').addEventListener('click',()=>{pathFrom=idx;setMode('path');history.replaceState(null,'','#path');});
  }
  function paginate(arr,row,choose,prop){
    const pages=Math.max(1,Math.ceil(arr.length/listSize));listPage=Math.max(0,Math.min(listPage,pages-1));
    const items=arr.slice(listPage*listSize,(listPage+1)*listSize);
    $('data-list').innerHTML=items.length?items.map(row).join(''):'<p class="type-note">No records match the selected filters.</p>';
    $('data-list').querySelectorAll('['+('data-'+prop)+']').forEach(b=>b.addEventListener('click',()=>choose(b.dataset[prop])));
    $('list-pager').innerHTML=pages>1?`<button type="button" id="list-prev" ${listPage===0?'disabled':''}>← PREVIOUS</button><span>PAGE ${listPage+1} / ${pages}</span><button id="list-next" type="button" ${listPage===pages-1?'disabled':''}>NEXT →</button>`:'';
    if(pages>1){$('list-prev').onclick=()=>{listPage--;renderListOnly();};$('list-next').onclick=()=>{listPage++;renderListOnly();};}
  }
  function renderListOnly(){if(mode==='focus')focus();else if(mode==='overview')typePicked?renderTypeOverview(typePicked):renderRelationsOverview();else pathMode();}
  $('previous-slice').addEventListener('click',()=>{focusPage--;render();});$('next-slice').addEventListener('click',()=>{focusPage++;render();});
  // Shortest *graph* path, not a causal inference. Edge classes are displayed at every hop.
  function findPath(source,target,maxSteps=7){
    if(source===target)return [];
    const seen=new Set([source]), queue=[[source,[]]],limit=nodes.length;
    let cursor=0;
    while(cursor<queue.length&&cursor<limit){const [at,path]=queue[cursor++];if(path.length>=maxSteps)continue;
      const options=filteredEdges(at).sort((a,b)=>groupOrder[familyOf(a[0])]-groupOrder[familyOf(b[0])]);
      for(const [ei,to,dir] of options){if(seen.has(to))continue;const next=path.concat([{from:at,to,edge:ei,dir}]);if(to===target)return next;seen.add(to);queue.push([to,next]);}
    }
    return null;
  }
  function resolveName(q){const input=q.trim();if(!input)return null;if(nodeId.has(input))return nodeId.get(input);
    const lower=input.toLowerCase();let exact=nodes.findIndex((n,i)=>fullLabel(i).toLowerCase()===lower);
    if(exact>=0)return exact;
    let matches=search(input,1);return matches[0]??null;
  }
  function pathMode(){
    $('view-index').textContent='02 / TOPOLOGICAL TRACE';$('view-count').textContent='SEVEN HOPS MAXIMUM';
    $('graph-title').textContent='The shortest visible connection';
    $('graph-subtitle').textContent='Every traversed edge remains typed. A path in the data is not a causal or social relationship.';
    $('previous-slice').hidden=true;$('next-slice').hidden=true;
    currentPath=findPath(pathFrom,pathTo);
    const start=pathFrom,target=pathTo;
    const chain=currentPath===null?[]:currentPath;
    const out=['flowchart LR'];const visited=new Set([start,target]);chain.forEach(step=>{visited.add(step.from);visited.add(step.to);});
    const ids=new Map([...visited].map((idx,i)=>[idx,'p'+i]));
    for(const idx of visited)out.push('  '+mermaidNode(ids.get(idx),shortName(idx,31),idx===start||idx===target?'focus':'faded'));
    for(const step of chain){const rel=edgeLabel(edges[step.edge][2]),safe=safeLabel(rel.slice(0,20));out.push(step.dir==='out'?`  ${ids.get(step.from)} -->|"${safe}"| ${ids.get(step.to)}`:`  ${ids.get(step.to)} -->|"${safe}"| ${ids.get(step.from)}`);}
    out.push('  '+baseClassDef);
    for(const idx of visited)out.push('  '+clickLine(ids.get(idx),urlNode(nodes[idx][0])));
    renderDiagram(out.join('\n'));
    $('diagram-footnote').textContent=chain.length?`Found a ${chain.length}-hop path through visible evidence classes. It may contain purely lexical matches.`:'No path within the selected depth/layers.';
    $('list-title').textContent='PATH BUILDER / SOURCE ENTITY IDS';$('list-total').textContent=chain.length?chain.length+' HOPS':'NO PATH';
    $('data-list').innerHTML=`<div class="path-inputs"><label>From <input type="search" id="path-from" spellcheck="false" value="${esc(nodes[start][0])}" placeholder="Node name or ID"></label><label>To <input type="search" id="path-to" spellcheck="false" value="${esc(nodes[target][0])}" placeholder="Node name or ID"></label><button type="button" id="path-go">TRACE ↗</button></div><p class="path-result">${currentPath===null?'No connection was found within seven hops and the visible evidence layers.':currentPath.length?'A graph path was found. Each hop is shown below with its relation and evidence status.':'Source and target are the same node.'}</p>${chain.map((step,i)=>{const fam=familyOf(step.edge);return `<button type="button" class="relation-row" data-node="${step.to}"><span class="relation-number">${String(i+1).padStart(2,'0')}</span><span class="relation-main"><strong>${esc(displayName(step.from))} → ${esc(displayName(step.to))}</strong><small>${esc(edgeLabel(edges[step.edge][2]))} · ${esc(step.dir.toUpperCase())}</small></span><span class="relation-badge ${fam}">${fam}</span></button>`;}).join('')}`;
    $('data-list').querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>chooseNode(Number(b.dataset.node)));
    $('path-go').onclick=()=>{const s=resolveName($('path-from').value),t=resolveName($('path-to').value);if(s===null||t===null){$('list-total').textContent='UNKNOWN NODE';return;}pathFrom=s;pathTo=t;render();};
    $('inspector-content').innerHTML=`<div class="inspector-id">PATH TRACE / NON-CAUSAL</div><h3>Connection ≠ explanation.</h3><p>Paths traverse original directed edges in either direction, with traversal direction explicitly shown. The shortest available link is not necessarily a meaningful relationship.</p><div class="inspector-caution">For example, a path through a lexical character-name match does not establish that two characters met or share knowledge.</div><dl><dt>Path length</dt><dd>${currentPath===null?'Not found':chain.length+' hops'}</dd><dt>Search limit</dt><dd>7 hops; ${fmt(nodes.length)} graph nodes</dd><dt>Layer filter</dt><dd>${groups.filter(g=>active[g]).join(', ')||'NONE'}</dd></dl>`;
  }
  function render(){if(mode==='overview')overview();else if(mode==='focus')focus();else pathMode();}
  $('copy-mermaid').addEventListener('click',async()=>{
    try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(lastMermaid);$('copy-mermaid').textContent='COPIED';setTimeout(()=>$('copy-mermaid').textContent='COPY SOURCE',1700);return;}}catch(e){}
    $('source-code').value=lastMermaid;$('source-dialog').showModal();
  });
  $('dialog-close').onclick=()=>$('source-dialog').close();
  $('download-svg').onclick=()=>{
    const svg=$('diagram').querySelector('svg');if(!svg){$('diagram-error').hidden=false;$('diagram-error').textContent='No rendered Pele SVG is available to export.';return;}
    const text=new XMLSerializer().serializeToString(svg);
    const url=URL.createObjectURL(new Blob([text],{type:'image/svg+xml;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='pattern-'+mode+'.svg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  };
  applyHash();if(mode==='overview'&&typePicked===null)render();
  window.PatternAtlas={nodeCount:nodes.length,edgeCount:edges.length,search,findPath,chooseNode,nodeId,edgeTypes:et,nodeTypes:nt,getActive:()=>({...active}),getMermaid:()=>lastMermaid};
})();
